import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RelatedProduct = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (category) {
            setLoading(true);
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.products);
                    setLoading(false);
                });
        }
    }, [category]);

    return (
        <div className="p-6 max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-[#0336A6] mb-4">Related Products</h2>

            {loading ? (
                <div className="space-y-4">
                    {Array(3).fill(0).map((_, index) => (
                        <div key={index} className="flex items-center justify-between border p-4 rounded-lg shadow-md animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                                <div className="space-y-2">
                                    <div className="w-32 h-4 bg-gray-300 rounded"></div>
                                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                            <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <p className="text-gray-500">No related products found.</p>
            ) : (
                <div className="space-y-4">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border p-4 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            <div className="flex items-center space-x-4">
                                <ImageWithSkeleton src={item.thumbnail} alt={item.title} />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-[#0336A6] font-bold">${item.price}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/product/${item.id}`)}
                                className="px-3 py-1 bg-[#0336A6] text-white rounded-lg hover:bg-blue-700 transition-all"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ImageWithSkeleton = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="w-20 h-20 rounded-lg bg-gray-300 relative">
            {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>}
            <img
                src={src}
                alt={alt}
                className={`w-20 h-20 object-contain rounded-lg transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default RelatedProduct;

