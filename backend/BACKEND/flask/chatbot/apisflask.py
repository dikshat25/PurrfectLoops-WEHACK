from flask import Flask, jsonify, request
import pandas as pd
import random

app = Flask(__name__)

# Load the CSV file
csv_path = "maturity-model-questions-answers-scores-and-suggested-improvements-csv-1.csv"  # Make sure the path is correct
df = pd.read_csv(csv_path)

# Get a random question
@app.route("/get_question", methods=["GET"])
def get_question():
    question_row = df.sample(n=1).iloc[0]  # Select a random question
    question_text = question_row["question"]
    return jsonify({"question": question_text})

# Submit an answer and get feedback
@app.route("/submit_answer", methods=["POST"])
def submit_answer():
    data = request.json
    user_answer = data.get("answer", "")
    
    # Simulate checking the answer
    response = {
        "score": random.randint(0, 5),  # Random score (replace with proper logic)
        "feedback": "Good response! Try adding more details." if len(user_answer) > 10 else "Provide a more detailed answer."
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
