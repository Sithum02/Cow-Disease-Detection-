# 🐄 HerdHealth AI – Cow Disease Detection System  

HerdHealth AI is a deep learning-based web application that detects cow diseases from images, helping farmers quickly identify **healthy or infected** cows. The system leverages **Convolutional Neural Networks (CNNs)** trained on Kaggle’s **Lumpy Skin Disease Cow Images** dataset and provides real-time predictions.  

Developed by **Nishadhi** and **Chandupa Ambepitiya** from the **Department of CSE**, this project was built alongside the **Machine Learning Specialization by DeepLearning.AI**.  

---

## 🚀 Features  

✅ **Image-based Disease Detection:** Upload a cow image to determine if it is infected or healthy.  
✅ **Deep Learning Model:** CNN-based classification trained on **Google Colab with a T4 GPU**.  
✅ **User-friendly Web Interface:** Built with **React, Vite, and Tailwind CSS**.  
✅ **Flask Backend:** Handles model inference and API requests.  
✅ **Runs Locally:** Set up on your own machine for testing and usage.  
✅ **Future Goal:** Develop real-time disease detection using **farm-mounted cameras**.  

---

## 🛠️ Tech Stack  

- **Machine Learning:** TensorFlow, Keras  
- **Model Training:** Google Colab (T4 GPU)  
- **Data Processing:** OpenCV, NumPy, Pandas  
- **Backend:** Flask, Python  
- **Frontend:** React, Vite, Tailwind CSS  
- **Dataset:** Kaggle ([Lumpy Skin Disease Cow Images](https://www.kaggle.com/datasets/kaushalrimal619/lumpy-skin-disease-cow-images))  

---

## 📦 Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/HerdHealth-AI.git
cd HerdHealth-AI

2️⃣ Set Up Backend (Flask)
Install dependencies:
bash
Copy
Edit
cd backend
pip install -r requirements.txt
Run the Flask server:
bash
Copy
Edit
python app.py
3️⃣ Set Up Frontend (React + Vite)
Install dependencies:
bash
Copy
Edit
cd frontend
npm install
Start the development server:
bash
Copy
Edit
npm run dev
🔍 How It Works
1️⃣ Upload an Image – Users upload an image of a cow through the web interface.
2️⃣ Image Processing – The backend preprocesses the image and sends it to the trained CNN model for inference.
3️⃣ Prediction Output – The app displays whether the cow is healthy or infected based on model results.

📊 Model Performance
The CNN model was trained on 3200 images with 80% training and 20% validation split. Early stopping was used to optimize performance.

Results:
✔ Training Accuracy: ~99%
✔ Validation Accuracy: ~85%

📌 Future Enhancements
✅ Deploy on Cloud (AWS/GCP) for remote access
✅ Optimize model for real-time inference
✅ Integrate IoT cameras for automated disease detection on farms

💡 Contributing
Contributions are welcome! Fork this repository, make your changes, and submit a pull request.

📜 License
This project is licensed under the MIT License – feel free to use, modify, and share!

🤝 Contact
For inquiries or collaborations, reach out via LinkedIn or open an issue in the repo.

arduino
Copy
Edit

This file provides a **clear and professional** documentation for your project. Let me know if you wan
