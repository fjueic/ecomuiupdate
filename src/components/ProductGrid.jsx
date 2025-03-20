import Skeleton from "react-loading-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";

const ProductGrid = ({ products, loading, maxPrice }) => {
    return (
        <div className="px-10">
            {loading ? (
                <motion.div
                    key="skeletons"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                    {[...Array(9)].map((_, index) => (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                className="border p-4 rounded-lg shadow-md"
                                initial={{ opacity: 0, translateY: 20 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: -10 }}
                                transition={{
                                    delay: (index / 3 + 1) * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 25,
                                }}
                            >
                                <Skeleton height={160} className="rounded-lg" />
                                <Skeleton width="80%" height={20} className="mt-2" />
                                <Skeleton width="60%" height={16} className="mt-1" />
                                <Skeleton width="40%" height={20} className="mt-2" />
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </motion.div>
            ) : (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                    {products
                        .filter((product) => product.price <= maxPrice)
                        .map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;

