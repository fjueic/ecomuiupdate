import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
    const { cart } = useCart();

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0336A6] mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-lg text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <CartItem index={index} key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Total Price */}
                    <div className="mt-6 text-xl font-bold">
                        Total: <span className="text-[#0336A6]">${totalPrice.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button
                        className="mt-4 px-6 py-2 bg-[#0336A6] text-white rounded-lg shadow hover:bg-blue-700 w-full"
                        onClick={() => alert("Proceeding to checkout...")}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;

