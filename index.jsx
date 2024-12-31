import React from "react"
import { createRoot } from "react-dom/client" // Update this line
import App from "./App"
import './style.css'

const root = createRoot(document.getElementById("root"))
root.render(<App />)