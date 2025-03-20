import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const ProductCard = ({ type, product, index }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                className="border p-4 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg aspect-[4/3] hover:border-[#0336A6]  bg-white"
                onClick={() => navigate(`/product/${product.id}`)}
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                    delay: (index / 3 + 1) * 0.1,
                }}
            >
                <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden h-3/5">
                    {!loaded && <div className="animate-pulse bg-gray-300 h-full w-full"></div>}
                    <motion.img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                        onLoad={() => {
                            setLoaded(true)
                        }}
                        className={`w-full h-full object-cover ${!loaded ? "opacity-0 fixed" : ""}`}
                    />
                </div>

                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                {
                    type != "category" &&
                    <>

                        <p className="text-sm text-gray-600">{product.description.substring(0, 50)}...</p>
                        <p className="font-bold text-[#0336A6] mt-2">${product.price}</p>
                    </>
                }
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductCard;

