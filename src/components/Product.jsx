import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import RelatedProducts from "./RelatedProduct";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, cart } = useCart();
    const [inCart, setInCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setInCart(cart.some((item) => item.id == id));
    }, [cart, id]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {loading ? (
                // Skeleton Loader
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 w-3/4 rounded-md mb-4"></div>
                    <div className="w-full aspect-[4/3] bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 w-full rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-300 w-5/6 rounded-md mb-2"></div>
                    <div className="h-6 bg-gray-400 w-1/4 rounded-md mt-4"></div>
                    <div className="h-10 w-32 bg-gray-300 rounded-lg mt-6"></div>
                </div>
            ) : (
                // Product Details
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-[#0336A6] mb-4">{product.title}</h2>

                    {/* Image with Skeleton Loader */}
                    <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center relative">
                        {!imageLoaded && (
                            <div className="absolute w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
                        )}
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-contain rounded-lg transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </div>

                    <p className="text-gray-700 mt-4">{product.description}</p>
                    <p className="text-xl font-semibold mt-2 text-[#0336A6]">${product.price}</p>

                    {inCart ? (
                        <p className="text-green-500 mt-4">✔ Product already in cart</p>
                    ) : (
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-[#0336A6] text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-transform active:scale-95"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            )}

            {/* Related Products Section */}
            {!loading && <RelatedProducts category={product.category} />}
        </div>
    );
};

export default Product;

