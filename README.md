# HerdHealth AI: lumpy skin disease detection in cattle

A web app that classifies a photo of a cow as healthy or infected with lumpy skin disease, using a CNN
trained from scratch. Upload an image in the browser; a Flask API runs the model and returns the result.

Built with Chandupa Ambepitiya in January 2025.

## Model

- **Data:** the [Lumpy Skin Disease Cow Images](https://www.kaggle.com/datasets/kaushalrimal619/lumpy-skin-disease-cow-images)
  dataset on Kaggle: 4,000 images in two classes (infected, normal), split 80/20 into 3,200 training and 800
  validation images.
- **Input:** 128×128 RGB, scaled to [0, 1], with random rotation (±20°), shifts, zoom and horizontal flips.
- **Network:** three convolution blocks (32, 64 and 128 filters, each with batch normalisation and max pooling),
  a 256-unit dense layer with dropout 0.5 and a sigmoid output; 6.5 M parameters.
- **Training:** Adam and binary cross-entropy, with early stopping on validation loss (patience 5). Training
  stopped after 12 epochs and kept the weights of epoch 7.

**Result:** 84% validation accuracy, against about 99% training accuracy. The gap shows the small CNN
overfits; a pretrained backbone is the obvious next step.

The training run is saved as `Cow_Disease_Detection_notebook.pdf` (a printout of the Colab notebook), and the
trained model is `backend/model.h5`.

## Web app

- `backend/app.py`: a Flask server with one endpoint, `POST /predict`. It accepts a PNG or JPEG upload,
  resizes it to 128×128 and returns the prediction as JSON.
- `frontend/`: a React page (Vite, Tailwind CSS) for uploading an image and showing the result.

## Running locally

Requires Python 3.9+ and Node.js 18+.

```bash
pip install -r backend/requirements.txt
python backend/app.py            # run from the repository root; serves http://127.0.0.1:5000
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev                      # opens on http://localhost:5173
```
