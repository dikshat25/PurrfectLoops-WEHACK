from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3

app = FastAPI()

DB_PATH = "backend/db/job_hiring.db"

# Database connection
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Return dictionary-like rows
    return conn

# Pydantic model for user input validation
class User(BaseModel):
    name: str
    email: str
    password: str

# Root Endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Hiring API"}

# Fetch all users
@app.get("/users/")
def get_users():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email FROM users")
    users = cursor.fetchall()
    conn.close()
    return {"users": [dict(user) for user in users]}

# Fetch single user by ID
@app.get("/users/{user_id}")
def get_user(user_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return dict(user)
    raise HTTPException(status_code=404, detail="User not found")

# Create a new user
@app.post("/users/")
def create_user(user: User):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                       (user.name, user.email, user.password))
        conn.commit()
        return {"message": "User created successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")
    finally:
        conn.close()

# Fetch all jobs
@app.get("/jobs/")
def get_jobs():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs")
    jobs = cursor.fetchall()
    conn.close()
    return {"jobs": [dict(job) for job in jobs]}

# Run FastAPI server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)