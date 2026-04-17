import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementItem, decrementItem, removeItem } from "../redux/CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // 🔹 Calculate total cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div>
      <h1>Your Cart</h1>

      {/* 🔹 Total Items */}
      <h2>Total Items: {totalQuantity}</h2>

      {/* 🔹 Cart Items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity || 1}</p>

            {/* 🔹 Increase / Decrease */}
            <button onClick={() => dispatch(incrementItem(item.id))}>+</button>
            <button onClick={() => dispatch(decrementItem(item.id))}>-</button>

            {/* 🔹 Delete */}
            <button onClick={() => dispatch(removeItem(item.id))}>
              Remove
            </button>
          </div>
        ))
      )}

      {/* 🔹 Total Cost */}
      <h2>Total Cost: ${totalCost}</h2>

      {/* 🔹 Buttons */}
      <button onClick={() => alert("Coming Soon!")}>
        Checkout
      </button>

      <br /><br />

      <button onClick={() => window.location.href = "/plants"}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
