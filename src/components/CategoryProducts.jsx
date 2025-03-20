import React, { useEffect, useState } from "react";
import useQueryState from "../hooks/useQueryState";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useQueryState("page", 1);
    const [search, setSearch] = useQueryState("filter", "");
    const [maxPrice, setMaxPrice] = useQueryState("maxPrice", 100000);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            let url = `https://dummyjson.com/products?limit=0`
            if (search) {
                url = `https://dummyjson.com/products/search?q=${search}&limit=0`
            }
            const res = await fetch(url);
            const data = await res.json();
            let t = (page - 1) * 9
            setProducts(data.products
                .filter((q) => slug == "all" || q.category == slug)
                .filter((q) => q.price <= maxPrice)
                .slice(t, t + 9))
            setNextPage(
                data.products
                    .filter((q) => slug == "all" || q.category == slug)
                    .filter((q) => q.price <= maxPrice)
                    .length > (t + 9)
            );
            setLoading(false);
        };

        fetchData();
    }, [page, search, slug]);

    return (
        <div className="p-6">
            {/* Search & Max Price Inputs */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Products..."
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <label className="text-gray-700 font-semibold">Max Price:</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                        className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-4 text-center text-[#0336A6]">Product List</h2>

            {/* Loading Animation & Product List */}
            <ProductGrid products={products} loading={loading} maxPrice={maxPrice} page={page} setPage={setPage} />

            {/* Pagination Buttons */}
            <Pagination page={page} setPage={setPage} nextPage={nextPage} />
        </div>

    );
};

export default CategoryProducts;

