import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryNavigator from "./CategoryNavigator";
import ProductCard from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CarouselCard from "./CarouselCard";


const Home = () => {
    const [categories, setCategories] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [deals, setDeals] = useState([]);
    const [festivalSales, setFestivalSales] = useState([]);
    const [extraOffers, setExtraOffers] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));

        fetch("https://dummyjson.com/products?limit=16")
            .then((res) => res.json())
            .then((data) => {
                const products = data.products;
                setNewArrivals(products.slice(0, 4));
                setDeals(products.slice(4, 8));
                setFestivalSales(products.slice(8, 12));
                setExtraOffers(products.slice(12, 16));
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prev) => (prev + 1) % sections.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);



    const sections = [
        { title: "New Products", products: newArrivals, slug: "new-arrivals" },
        { title: "Deals", products: deals, slug: "deals" },
        { title: "Festival Sales", products: festivalSales, slug: "festival-sales" },
        { title: "Extra Offers", products: extraOffers, slug: "extra-offers" },
    ];
    const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % sections.length);
    const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + sections.length) % sections.length);

    return (
        <div className="w-full px-6 md:px-12 py-8">
            {/* Full-Width Carousel */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
                <h2 className="text-center text-3xl font-bold text-blue-700 mb-4">
                    {sections[carouselIndex].title}
                </h2>

                <div
                    className="absolute top-0 left-0 w-full h-full flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                    {sections.map((section, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            {section.products.length > 0 && <CarouselCard product={section.products[0]} />}
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#0336A6] text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
                >
                    <ArrowLeft size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#0336A6] text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
                >
                    <ArrowRight size={20} />
                </button>
            </div>


            {sections.map((section, index) => (
                <div key={index} className="mb-12">
                    {/* Category Navigator with Bigger Title */}
                    <h2 className="text-center text-3xl lg:text-4xl font-bold text-blue-700 mb-4">
                        {section.title}
                    </h2>

                    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start mt-4 space-y-4 lg:space-y-0 lg:space-x-8 overflow-x-auto scrollbar-hide">
                        {section.products.length > 0
                            ? section.products.map((product, idx) => (
                                <div key={idx} className="w-[300px]">
                                    <ProductCard product={product} index={idx} />
                                </div>
                            ))
                            : Array(4)
                                .fill(null)
                                .map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="w-[300px] h-48 bg-gray-300 animate-pulse rounded-lg"
                                    ></div>
                                ))}
                    </div>
                </div>
            ))}

            <h2 className="text-center text-3xl lg:text-4xl font-bold text-blue-700 mb-6">
                All Categories
            </h2>
            <CategoryNavigator slug="all" name="Explore More Categories" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6 justify-center">
                {categories.slice(0, 8).map((category, index) => (
                    <CategoryCard index={index} key={index} category={category} />
                ))}
            </div>
        </div>
    );
};

export default Home;

