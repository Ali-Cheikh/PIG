import React, { useState } from "react";
import Swal from "sweetalert2";
import "./App.css"; // Ensure your TailwindCSS is properly imported

const forbiddenWords = [
  // List of forbidden words (same as your original list)
];

function App() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("000000");
  const [textColor, setTextColor] = useState("FFFFFF");
  const [resultUrl, setResultUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const validateInput = () => {
    // Check for forbidden words
    for (let word of forbiddenWords) {
      if (text.toLowerCase().includes(word)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Text",
          text: "Your input contains forbidden words!",
          background: "red",
          color: "rgb(202 138 4)",
        });
        return false;
      }
    }

    // Check for more than 3 separate groups of 3+ letters
    const letterGroups = text.split(/[\s]+/).filter((group) => group.length > 3);
    if (letterGroups.length > 3) {
      Swal.fire({
        icon: "error",
        title: "Too many words",
        text: "You cannot have more than 3 separate groups of 3+ letters!",
        background: "rgb(17 24 39)",
        color: "rgb(202 138 4)",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    const url = `https://via.placeholder.com/${width}x${height}/${bgColor.toUpperCase()}/${textColor.toUpperCase()}?text=${encodeURIComponent(text)}`;

    // Show loading indicator using SweetAlert
    Swal.fire({
      title: "Generating...",
      text: "Please wait while we generate the placeholder image.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: "rgb(17 24 39)",
      color: "rgb(202 138 4)",
    });

    const img = new Image();
    img.src = url;

    img.onload = () => {
      setImageLoaded(true);
      setResultUrl(url);
      Swal.close();
    };

    img.onerror = () => {
      Swal.fire({
        icon: "info",
        title: "Error",
        text: "Click again and if this popup comes again change something",
        background: "blue",
        color: "rgb(302 8 4)",
      });
    };
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-900 rounded-lg shadow-lg p-6 m-5">
        <h1 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Placeholder Image Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-white">
              Width (px):
            </label>
            <input
              type="number"
              min="150"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 300"
              required
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-white">
              Height (px):
            </label>
            <input
              type="number"
              min="150"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 200"
              required
            />
          </div>
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-white">
              Text (optional):
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Hello World (max 16 bytes)"
            />
          </div>
          <div>
            <label htmlFor="bgColor" className="block text-sm font-medium text-white">
              Background Color (hex):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="bgColor"
                name="bgColor"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-4/5 bg-gray-800 text-white border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., 000000"
              />
              <input
                type="color"
                id="bgColorPicker"
                value={`#${bgColor}`}
                onChange={(e) => setBgColor(e.target.value.slice(1))}
                style={{ height: "30px" }}
                className="w-1/5 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="textColor" className="block text-sm font-medium text-white">
              Text Color (hex):
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="textColor"
                name="textColor"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-4/5 bg-gray-800 text-white border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., FFFFFF"
              />
              <input
                type="color"
                id="textColorPicker"
                value={`#${textColor}`}
                onChange={(e) => setTextColor(e.target.value.slice(1))}
                style={{ height: "30px" }}
                className="w-1/5 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Generate Placeholder
          </button>
        </form>

        {imageLoaded && (
          <div id="result" className="mt-6 text-center">
            <p className="text-white">Generated Placeholder:</p>
            <a href={resultUrl} className="text-purple-400 underline">
              {resultUrl}
            </a>
            <img
              src={resultUrl}
              alt="Generated Placeholder"
              className="mt-4 rounded border border-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
