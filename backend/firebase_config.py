import firebase_admin
from firebase_admin import credentials, firestore, storage

# Load Firebase credentials
cred = credentials.Certificate("firebase_credentials.json")  # Ensure this file exists
firebase_admin.initialize_app(cred, {
    'storageBucket': 'your-project-id.appspot.com'  # Replace with your Firebase Storage bucket
})

# Firestore database instance
db = firestore.client()

# Firebase Storage instance
bucket = storage.bucket()
