import React, { useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [showProducts, setShowProducts] = useState(false);

  // 🔹 Handle button click
  const handleGetStarted = () => {
    setShowProducts(true);
  };

  // 🔹 Show Product List after click
  if (showProducts) {
    return <ProductList />;
  }

  // 🔹 Landing Page
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Paradise Nursery</h1>
      <p>Welcome to our plant shop 🌿</p>

      {/* 🔥 FIX: onClick added */}
      <button onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default App;
