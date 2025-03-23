from flask import Flask, request, jsonify

app = Flask(__name__)

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

    # Replace this with your ML model's actual predictions
    recommendations = [
        {"job_title": "Machine Learning Engineer", "company": "Google"},
        {"job_title": "Data Scientist", "company": "Facebook"}
    ]

    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
