import React from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer.jsx";

// Mount only the footer into the placeholder div in index.html
const mountNode = document.getElementById("footer-root");
if (mountNode) {
  const root = createRoot(mountNode);
  root.render(<Footer />);
}
