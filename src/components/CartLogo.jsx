import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const CartLogo = () => {
    const { cart } = useCart();
    const length = useMemo(() => cart.length, [cart]);
    const { user } = useAuth();

    return (
        <>
            {user && (
                <Link to="/cart" className="relative">
                    <ShoppingCart />

                    <AnimatePresence>
                        {length > 0 && (
                            <motion.div
                                key={length}
                                initial={{ scale: 0, opacity: 0, y: -10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0, opacity: 0, y: -10 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10,
                                }}
                                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                            >
                                {length}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
            )}
        </>
    );
};

export default CartLogo;

