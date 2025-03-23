from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/recommend": {"origins": "*"}}, supports_credentials=True)

@app.route('/recommend', methods=['OPTIONS'])
def handle_options():
    """Handles CORS preflight OPTIONS request"""
    response = jsonify({"message": "CORS preflight success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response, 200

@app.route('/recommend', methods=['POST'])
def recommend():
    if request.content_type != "application/json":
        return jsonify({"error": "Content-Type must be application/json"}), 415

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    skills = data.get("skills")
    experience = data.get("experience")

    if not skills or experience is None:
        return jsonify({"error": "Missing required fields"}), 400

    recommendations = [
        {"job_title": "Machine Learning Engineer", "company": "Google"},
        {"job_title": "Data Scientist", "company": "Facebook"}
    ]

    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
