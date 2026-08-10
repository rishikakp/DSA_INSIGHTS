from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "python"})

@app.route('/api/python/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    code = data.get('code', '')
    language = data.get('language', 'python')
    
    # Simple analysis placeholder
    result = {
        "complexity": "O(n)",
        "issues": [],
        "suggestions": ["Add type hints", "Consider edge cases"]
    }
    return jsonify(result)

if __name__ == '__main__':
    port = int(os.getenv('PYTHON_PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)