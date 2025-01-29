from flask import Flask, request, jsonify
from PIL import Image
import io
import tensorflow as tf
from flask_cors import CORS
import numpy as np
from keras.utils import load_img, img_to_array



app = Flask(__name__)
CORS(app) 
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


model = tf.keras.models.load_model("backend/model.h5")  



def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image):
    img = image.resize((128, 128))  
    img_array = img_to_array(img) 
    img_array = img_array / 255.0  
    img_array = np.expand_dims(img_array, axis=0) 
    return img_array

def model_predict(image):
    """Make a prediction using the loaded model."""
    preprocessed_image = preprocess_image(image) 
    prediction = model.predict(preprocessed_image)

    # Interpret the result
    if prediction[0][0] > 0.5:
        return "Unhealthy Cow Detected (Infected)"
    else:
        return "Healthy Cow Detected (Normal)"


@app.route("/predict", methods=["POST"])
def predict():
    
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]

    
    if file.filename == "":
        return jsonify({"error": "No file selected for uploading"}), 400

    if file and allowed_file(file.filename):
        try:
            
            image = Image.open(io.BytesIO(file.read()))
            prediction = model_predict(image)
            return jsonify({"prediction": prediction})
        except Exception as e:
            return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

    else:
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == "__main__":
    app.run(debug=True)
