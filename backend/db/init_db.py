import sqlite3
import os
import random

# Define database path
DB_PATH = os.path.abspath("backend/db/job_hiring.db")

# Ensure the folder exists
db_dir = os.path.dirname(DB_PATH)
if not os.path.exists(db_dir):
    os.makedirs(db_dir)  # Create the directory
    print(f"✅ Created directory: {db_dir}")

# Define table creation queries
TABLES = {
    "users": """
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
    """,
    "resumes": """
    CREATE TABLE IF NOT EXISTS resumes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        resume_text TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """,
    "skills": """
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        skill_name TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """,
    "test_scores": """
    CREATE TABLE IF NOT EXISTS test_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        score INTEGER NOT NULL,
        test_name TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """,
    "job_preferences": """
    CREATE TABLE IF NOT EXISTS job_preferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        preferred_role TEXT NOT NULL,
        location TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """
}

# Extended sample data with more entries
SAMPLE_DATA = {
    "users": [
        ("Alice Johnson", "alice@example.com", "hashedpassword1"),
        ("Bob Smith", "bob@example.com", "hashedpassword2"),
        ("Charlie Brown", "charlie@example.com", "hashedpassword3"),
        ("Diana Prince", "diana@example.com", "hashedpassword4"),
        ("Edward Clark", "edward@example.com", "hashedpassword5"),
        ("Fiona Miller", "fiona@example.com", "hashedpassword6"),
        ("George Davis", "george@example.com", "hashedpassword7"),
        ("Hannah Wilson", "hannah@example.com", "hashedpassword8")
    ],
    "resumes": [
        (1, "Alice Johnson - Senior Developer with 5 years experience in Python and SQL"),
        (2, "Bob Smith - Frontend Developer with React expertise"),
        (3, "Charlie Brown - Data Scientist specializing in Machine Learning"),
        (4, "Diana Prince - DevOps Engineer with AWS certification"),
        (5, "Edward Clark - UX Designer with 3 years experience"),
        (6, "Fiona Miller - Product Manager with technical background"),
        (7, "George Davis - Backend Developer specializing in Java"),
        (8, "Hannah Wilson - Full Stack Developer with MERN stack expertise")
    ]
}

# Technical skills for users
SKILL_CATEGORIES = {
    "Programming Languages": ["Python", "JavaScript", "Java", "C++", "Go", "Ruby", "PHP", "Swift", "Kotlin", "TypeScript"],
    "Frontend": ["React", "Vue", "Angular", "HTML", "CSS", "Redux", "jQuery", "Tailwind", "Bootstrap", "SASS"],
    "Backend": ["Node.js", "Django", "Flask", "Spring Boot", "Express", "Laravel", "Ruby on Rails", "FastAPI"],
    "Databases": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Cassandra", "DynamoDB"],
    "DevOps": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Jenkins", "Terraform", "CI/CD", "Git"],
    "Data Science": ["Machine Learning", "Deep Learning", "Data Analysis", "NumPy", "Pandas", "TensorFlow", "PyTorch", "NLP"]
}

# Test names by category
TEST_CATEGORIES = {
    "Programming": ["Python Basics", "Advanced JavaScript", "Java Fundamentals", "C++ Data Structures", "Go Concurrency"],
    "Web Development": ["React Components", "Vue Directives", "Angular Services", "HTML/CSS Layout", "Responsive Design"],
    "Backend": ["API Design", "Database Optimization", "Server Management", "Authentication Methods", "Microservices"],
    "Cloud": ["AWS Essentials", "Azure Fundamentals", "GCP Core Services", "Cloud Security", "Serverless Architecture"],
    "Data": ["SQL Queries", "NoSQL Concepts", "Data Modeling", "ETL Processes", "Database Administration"],
    "AI/ML": ["Machine Learning Algorithms", "Neural Networks", "Data Preprocessing", "Model Evaluation", "NLP Techniques"]
}

# Job roles
JOB_ROLES = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", 
    "Data Scientist", "Machine Learning Engineer", "UX Designer", "Product Manager",
    "QA Engineer", "Cloud Architect", "Mobile Developer", "Blockchain Developer"
]

# Locations
LOCATIONS = [
    "Mumbai", "Pune", "Bangalore", "Hyderabad", "Delhi", "Chennai", "Kolkata", 
    "Ahmedabad", "Gurgaon", "Noida", "Remote"
]

def create_tables():
    """Creates the database tables."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        print(f"✅ Connected to database at {DB_PATH}")

        for table_name, create_query in TABLES.items():
            cursor.execute(create_query)

        conn.commit()
        print("✅ Database and tables created successfully!")
    except Exception as e:
        print(f"❌ ERROR: {e}")
    finally:
        conn.close()


def insert_sample_data():
    """Inserts extended sample data without duplicates."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Insert users and their resumes
        user_ids = []
        for i, user in enumerate(SAMPLE_DATA["users"]):
            name, email, password = user
            cursor.execute("SELECT id, email FROM users WHERE email=?", (email,))
            result = cursor.fetchone()
            
            if result is None:
                cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                               (name, email, password))
                user_id = cursor.lastrowid
                user_ids.append(user_id)
                
                # Insert resume if available
                if i < len(SAMPLE_DATA["resumes"]):
                    _, resume_text = SAMPLE_DATA["resumes"][i]
                    cursor.execute("INSERT INTO resumes (user_id, resume_text) VALUES (?, ?)",
                                  (user_id, resume_text))
            else:
                user_ids.append(result[0])
        
        conn.commit()
        print(f"✅ Inserted {len(user_ids)} users with resumes")

        # Insert random skills for each user
        cursor.execute("DELETE FROM skills")  # Clear existing skills for clean slate
        
        skills_added = 0
        for user_id in user_ids:
            # Assign 3-7 random skills to each user
            num_skills = random.randint(3, 7)
            categories = random.sample(list(SKILL_CATEGORIES.keys()), min(len(SKILL_CATEGORIES), num_skills))
            
            for category in categories:
                skill = random.choice(SKILL_CATEGORIES[category])
                cursor.execute("INSERT INTO skills (user_id, skill_name) VALUES (?, ?)",
                              (user_id, skill))
                skills_added += 1
        
        conn.commit()
        print(f"✅ Inserted {skills_added} skills across {len(user_ids)} users")
        
        # Insert test scores
        cursor.execute("DELETE FROM test_scores")  # Clear existing test scores
        
        scores_added = 0
        for user_id in user_ids:
            # Assign 2-5 test scores to each user
            num_tests = random.randint(2, 5)
            categories = random.sample(list(TEST_CATEGORIES.keys()), min(len(TEST_CATEGORIES), num_tests))
            
            for category in categories:
                test_name = random.choice(TEST_CATEGORIES[category])
                # Generate a realistic score (slightly biased toward higher scores)
                score = random.randint(50, 100)
                
                cursor.execute("INSERT INTO test_scores (user_id, test_name, score) VALUES (?, ?, ?)",
                              (user_id, test_name, score))
                scores_added += 1
        
        conn.commit()
        print(f"✅ Inserted {scores_added} test scores across {len(user_ids)} users")
        
        # Insert job preferences
        cursor.execute("DELETE FROM job_preferences")  # Clear existing preferences
        
        for user_id in user_ids:
            role = random.choice(JOB_ROLES)
            location = random.choice(LOCATIONS)
            
            cursor.execute("INSERT INTO job_preferences (user_id, preferred_role, location) VALUES (?, ?, ?)",
                          (user_id, role, location))
        
        conn.commit()
        print(f"✅ Inserted job preferences for {len(user_ids)} users")

    except Exception as e:
        print(f"❌ ERROR: {e}")
    finally:
        conn.close()


if __name__ == "__main__":
    create_tables()
    insert_sample_data()