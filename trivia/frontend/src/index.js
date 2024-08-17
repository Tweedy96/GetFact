import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

// Store the root instance globally
let root;

const appDiv = document.getElementById("app");

// Check if the root instance already exists
if (!root) {
    root = createRoot(appDiv);
}

root.render(<App />);