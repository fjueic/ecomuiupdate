import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryNavigator from "./CategoryNavigator";

const Catagories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    return (
        <div className="w-full px-4 py-6">
            <CategoryNavigator slug="all" name="All Categories" />

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 md:px-8">
                {categories.map((category, index) => (
                    <CategoryCard index={index} key={index} category={category} />
                ))}
            </div>

        </div>
    );
};

export default Catagories;

