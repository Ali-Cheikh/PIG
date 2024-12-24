

# Placeholder Image Generator

## Overview
The Placeholder Image Generator is a web application built with React that allows users to create placeholder images with customizable dimensions, text, background color, and text color. It also validates the input text to ensure no offensive language is included and adheres to specific text formatting rules. The application uses the **Via.placeholder.com** API for image generation.

### Features
- Generate placeholder images with specified width and height.
- Customizable background and text colors (supports hex codes).
- Optional text overlay with validation for offensive words and text formatting.
- Real-time syncing between hex color input and color picker.
- SweetAlert for user-friendly alerts and loading indicators.
- Fully responsive design styled with Tailwind CSS.

## Getting Started

### Prerequisites
To run this application, you need the following:
- **Node.js** and **npm** installed on your system.
- A modern web browser with JavaScript enabled.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ali-Cheikh/PIG.git
   cd PIG
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the application in your browser at `http://localhost:3000`.

### Usage
1. Enter the desired dimensions (width and height) in pixels.
2. Optionally, specify the text to overlay on the image.
3. Choose background and text colors using either the color picker or hex input.
4. Click the "Generate Placeholder" button.
5. View and download the generated image from the provided link.

## Validation Rules
1. The text field ensures that no offensive words are included.
2. Text must not exceed three separate groups of more than three characters.
3. Background and text colors must be valid hex codes

## File Structure
```js
├── public
│   ├── index.js         # Main HTML file
│   ├── styles.css         # Main CSS file
├── src
│   ├── components
│   │   ├── PlaceholderForm.jsx  # React component for the form
│   │   ├── ImagePreview.jsx     # React component for the image preview
│   └── utils
│       ├── validation.js        # Input validation logic
│       ├── api.js               # API interaction logic
├── README.md             # Documentation
├── index.html         # Main HTML file
```

## Technologies Used
- **React** for building the user interface.
- **Node.js** and **Express** for backend support (if applicable).
- **Tailwind CSS** for styling.
- **JavaScript** for interactivity and input validation.
- **SweetAlert2** for enhanced alerts.
- **Via.placeholder.com API** for image generation.


## License
This project is open source and available under the [MIT License](LICENSE).

## Contributions
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## Contact
For any questions or feedback, please contact [Ali Cheikh](mailto:ali@example.com).

---

Enjoy creating placeholder images effortlessly!
Let me know if you'd like to add or change anything!

--- 


## File Structure
```
.
├── public
│   ├── index.html         # Entry point for the React app
│   ├── styles.css         # Global CSS file
├── src
│   ├── components
│   │   ├── PlaceholderForm.jsx  # React component for the form
│   │   ├── ImagePreview.jsx     # React component for the image preview
│   └── utils
│       ├── validation.js        # Input validation logic
│       ├── api.js               # API interaction logic
├── server
│   ├── server.js          # Node.js server (if backend exists)
├── README.md              # Documentation
├── package.json           # Project metadata and dependencies
```
