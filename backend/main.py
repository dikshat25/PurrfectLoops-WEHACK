from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from pydantic import BaseModel
from firebase_config import db
from firebase_crud import *
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt

# 🔒 Security settings
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# 📌 Pydantic Models
class User(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

app = FastAPI()

# 🔥 Signup Route
@app.post("/signup")
def signup(user: User):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = hash_password(user.password)
    add_user_firestore(user.email, user.name, user.email, hashed_password)
    
    return {"message": "User registered successfully"}

# 🔑 Login Route
@app.post("/login")
def login(login_data: LoginRequest):
    user = get_user_by_email(login_data.email)
    if not user or not verify_password(login_data.password, user['password']):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": login_data.email}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# 📁 Upload Resume
@app.post("/upload_resume/{user_id}")
def upload_resume(user_id: str, file: UploadFile = File(...)):
    file_url = upload_resume_to_storage(file, user_id)
    update_user_resume_url(user_id, file_url)
    return {"message": "Resume uploaded successfully", "file_url": file_url}

# 🏆 Update Leaderboard
@app.post("/update_leaderboard/{user_id}")
def update_leaderboard_api(user_id: str, score: int, rank: int, test_type: str):
    update_leaderboard(user_id, score, rank, test_type)
    return {"message": "Leaderboard updated"}

# 📊 Save Test Results
@app.post("/save_result/{user_id}")
def save_result(user_id: str, test_type: str, score: int):
    save_test_result(user_id, test_type, score)
    return {"message": "Result saved successfully"}

# 📌 Get User Results
@app.get("/get_results/{user_id}")
def get_results(user_id: str):
    results = get_test_results(user_id)
    return results

# 🧪 Firestore Connection Test
@app.get("/test-firestore")
async def test_firestore():
    try:
        db.collection("users").get()  # Ensure Firestore is connected
        return {"message": "Firestore connection successful!"}
    except Exception as e:
        return {"error": str(e)}

# 🔄 Test API
@app.get("/test")
def test_route():
    return {"message": "Server is working!"}

# 🚀 Run FastAPI Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
