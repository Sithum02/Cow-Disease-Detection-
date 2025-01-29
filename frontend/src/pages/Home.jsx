import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import backgroundImage from "../assets/background.jpg"
import logo from "../assets/logo.jpg"

export default function ImagePrediction() {
  const [image, setImage] = useState(null)
  const [prediction, setPrediction] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
    setPrediction(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  })

  const handlePredict = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append("file", document.querySelector('input[type="file"]').files[0])

    try {
      setPrediction("Processing your image...")

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process the image")
      }

      const data = await response.json()
      console.log(data)
      setPrediction(data.prediction)
    } catch (error) {
      console.error("Error during prediction:", error)
      setPrediction("An error occurred during the prediction. Please try again.")
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8 bg-white/70 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-grow">
              <div className="uppercase tracking-wide text-2xl text-customGreen font-bold">HERD-HEALTH AI</div>
              <h1 className="mt-1 text-sm leading-tight font-medium text-black">Upload an image for prediction</h1>
              <p className="mt-1 text-gray-600 text-sm">
                For the most accurate predictions, please upload clear, well-lit images.
              </p>
            </div>
            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-20 w-auto ml-4" />
          </div>
          <div
            {...getRootProps()}
            className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer w-full ${
              isDragActive ? "border-indigo-500" : ""
            }`}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-customGreen hover:text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {image && (
            <div className="mt-4 w-full">
              <img
                src={image || "/placeholder.svg"}
                alt="Uploaded or Processed"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          <button
            onClick={handlePredict}
            disabled={!image}
            className="mt-4 w-full bg-customGreen text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen disabled:opacity-100 disabled:cursor-not-allowed"
          >
            Predict
          </button>
          {prediction && (
            <div className="mt-4 p-4 bg-green-100 rounded-md w-full">
              <p className="text-green-700 text-center">{prediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

