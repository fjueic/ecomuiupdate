import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category.slug}`)
            .then((res) => res.json())
            .then((data) => {
                setImage(data.products?.[0]?.thumbnail);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [category.slug]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="relative min-w-[160px] sm:min-w-[200px] md:min-w-[240px] h-[180px] rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer hover:scale-105 transition-transform"
        >
            <Link to={`/category/${category.slug}`} className="block h-full">
                {/* Image Wrapper */}
                <div className="relative w-full h-full">
                    {/* Skeleton Loader */}
                    {loading ? (
                        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                    ) : (
                        <img
                            src={image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-opacity opacity-0"
                            onLoad={(e) => (e.target.style.opacity = 1)}
                        />
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-lg font-semibold py-2">
                        {category.name}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;

