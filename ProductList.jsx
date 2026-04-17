import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const plantsData = [
  // Indoor Plants
  {
    id: 1,
    name: "Snake Plant",
    price: 15,
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1598887142487-6c3c5b1b5c72"
  },
  {
    id: 2,
    name: "Peace Lily",
    price: 20,
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1587502536263-3a6b9f3c0f36"
  },
  {
    id: 3,
    name: "Areca Palm",
    price: 25,
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1604762525956-8d52f57c4c89"
  },
  {
    id: 4,
    name: "Spider Plant",
    price: 10,
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1616628182507-2b3b5d3c4c62"
  },
  {
    id: 5,
    name: "Rubber Plant",
    price: 18,
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1603575448361-bf5b2a4b2e1c"
  },
  {
    id: 6,
    name: "ZZ Plant",
    price: 22,
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1614594855617-1c7c8a3c6d5d"
  },

  // Succulents
  {
    id: 7,
    name: "Aloe Vera",
    price: 12,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
  },
  {
    id: 8,
    name: "Echeveria",
    price: 14,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1512427691650-5d9b67c63c6f"
  },
  {
    id: 9,
    name: "Jade Plant",
    price: 16,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1597305222030-9b2c6e0f9c2e"
  },
  {
    id: 10,
    name: "Cactus",
    price: 10,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
  },
  {
    id: 11,
    name: "Haworthia",
    price: 13,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1524593166156-312f362cada0"
  },
  {
    id: 12,
    name: "Sedum",
    price: 11,
    category: "Succulents",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71"
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.id]: true }));
  };

  const categories = ["Indoor", "Succulents"];

  return (
    <div>
      {/* 🔥 FIX 1: CLEAN NAVBAR WITH CART ICON */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
          background: "#2d6a4f",
          color: "white"
        }}
      >
        <div>
          <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
          <Link to="/plants" style={{ color: "white", marginRight: "10px" }}>Plants</Link>
          <Link to="/cart" style={{ color: "white" }}>Cart</Link>
        </div>

        {/* 🔥 CLEAR CART ICON */}
        <div>
          🛒 {totalQuantity}
        </div>
      </nav>

      <h1 style={{ textAlign: "center" }}>Our Plants</h1>

      {/* 🔹 PRODUCTS */}
      {categories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {plantsData
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div
                  key={plant.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    width: "200px",
                    textAlign: "center"
                  }}
                >
                  {/* 🔥 FIX 2: IMAGE (THUMBNAIL) */}
                  <img
                    src={plant.image}
                    alt={plant.name}
                    width="150"
                    height="150"
                  />

                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>

                  {/* 🔹 BUTTON */}
                  <button
                    onClick={() => handleAdd(plant)}
                    disabled={addedItems[plant.id]}
                  >
                    {addedItems[plant.id] ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
