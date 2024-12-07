from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)  # This will allow all origins

@app.route('/classify_image', methods=['GET', 'POST'])
def classify_image():
    # Access 'image_data' from form data
    image_data = request.form.get('image_data')
    if not image_data:
        return jsonify({"error": "No image data provided"}), 400

    response = jsonify(util.classify_image(image_data))
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    util.load_saved_artifacts()
    app.run(port=5000)
