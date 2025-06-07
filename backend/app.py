from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

nlp = spacy.load("en_core_web_sm")

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    data = request.get_json()
    name = data.get('name', '')
    skills = data.get('skills', '')
    education = data.get('education', '')

    # Sample logic for recommendations
    recommendations = []
    if 'data science' in skills.lower():
        recommendations.append('Data Analyst')
    if 'programming' in skills.lower():
        recommendations.append('Software Developer')
    if not recommendations:
        recommendations.append('General Graduate Trainee')

    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
