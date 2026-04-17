import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // 🔹 Total Cart Cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🔹 Increase Quantity
  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, amount: 1 }));
  };

  // 🔹 Decrease Quantity (FIXED: removes item at 0)
  const handleDecrement = (id, quantity) => {
    if (quantity === 1) {
      dispatch(removeItem(id)); // 🔥 FIX
    } else {
      dispatch(updateQuantity({ id, amount: -1 }));
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>

      {/* 🔹 Total Items */}
      <h2>Total Items: {totalQuantity}</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {/* 🔥 FIX 1: IMAGE ADDED */}
              <img
                src={item.image}
                alt={item.name}
                width="100"
                height="100"
              />

              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>

                {/* 🔥 FIX 2: ITEM TOTAL COST */}
                <p>Total: ${itemTotal}</p>

                {/* 🔹 Buttons */}
                <button onClick={() => handleIncrement(item.id)}>+</button>

                <button
                  onClick={() =>
                    handleDecrement(item.id, item.quantity)
                  }
                >
                  -
                </button>

                {/* 🔹 Remove */}
                <button onClick={() => dispatch(removeItem(item.id))}>
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}

      {/* 🔹 Total Cart Cost */}
      <h2>Total Cost: ${totalCost}</h2>

      {/* 🔹 Checkout */}
      <button onClick={() => alert("Coming Soon!")}>
        Checkout
      </button>

      <br /><br />

      {/* 🔥 FIX 3: NAVIGATION */}
      <button onClick={() => navigate("/plants")}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
