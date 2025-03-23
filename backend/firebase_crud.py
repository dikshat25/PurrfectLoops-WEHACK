from firebase_config import db, bucket
from datetime import datetime
from firebase_config import db

# 🏷️ Fetch user by email
def get_user_by_email(email: str):
    user_ref = db.collection("users").document(email).get()
    if user_ref.exists:
        return user_ref.to_dict()
    return None


# 🆕 Add user to Firestore
def add_user_firestore(user_id: str, name: str, email: str, password: str):
    db.collection("users").document(user_id).set({
        "name": name,
        "email": email,
        "password": password  # Store the hashed password
    })


# 📝 Update user resume URL in Firestore
def update_user_resume_url(user_id: str, file_url: str):
    user_ref = db.collection("users").document(user_id)
    user_ref.update({"resume_url": file_url})

# 🏆 Update leaderboard in Firestore
def update_leaderboard(user_id: str, score: int, rank: int, test_type: str):
    db.collection("leaderboard").document(user_id).set({
        "score": score,
        "rank": rank,
        "test_type": test_type,
        "timestamp": datetime.utcnow()
    })

# 📊 Save test results in Firestore
def save_test_result(user_id: str, test_type: str, score: int):
    db.collection("results").document(user_id).set({
        "test_type": test_type,
        "score": score,
        "timestamp": datetime.utcnow()
    })

# 📋 Get test results
def get_test_results(user_id: str):
    results_ref = db.collection("results").document(user_id).get()
    if results_ref.exists:
        return results_ref.to_dict()
    return None

# 📂 Upload resume to Firebase Storage
def upload_resume_to_storage(file, user_id: str):
    blob = bucket.blob(f"resumes/{user_id}.pdf")
    blob.upload_from_file(file.file)
    blob.make_public()
    return blob.public_url
