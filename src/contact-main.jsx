import React from "react";
import { createRoot } from "react-dom/client";
import Contact from "./pages/Contact.jsx";
import "./contact.css";

const mountNode = document.getElementById("contact-root");

if (mountNode) {
  const root = createRoot(mountNode);
  root.render(<Contact />);
}
