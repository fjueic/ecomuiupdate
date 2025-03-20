import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCart } from "../context/CartContext";

const CartItem = ({ item, index }) => {
    const { removeFromCart } = useCart();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    return (
        <motion.div
            className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white"
            initial={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20,
            }}
            layout
        >
            <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
            >
                {!loaded && <Skeleton width={80} height={80} className="rounded-lg" />}
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`w-20 h-20 object-cover rounded-lg ${!loaded ? "hidden" : ""}`}
                    onLoad={() => setLoaded(true)}
                />
                <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-[#0336A6] font-bold">${item.price}</p>
                </div>
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
                Delete
            </button>
        </motion.div>
    );
};

export default CartItem;

