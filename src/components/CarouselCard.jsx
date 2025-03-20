import { Link } from "react-router-dom";

const CarouselCard = ({ product }) => {
    if (!product) return null;

    return (
        <div className="w-full h-64 md:h-80 flex items-center bg-blue-100 p-6 md:p-10 relative">
            {/* Text */}
            <div className="w-1/2 z-10 left-44">
                <h3 className="text-2xl md:text-3xl font-bold capitalize">{product.category}</h3>
                <p className="mt-2 text-lg md:text-xl hidden md:block">{product.description}</p>
                <Link
                    to={`/category/${product.category}`}
                    className="mt-4 inline-block bg-white text-[#0336A6] px-4 py-2 rounded-lg font-semibold"
                >
                    View Category
                </Link>
            </div>

            {/* Image */}
            <div className=" h-full absolute right-28 top-0">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-80"
                />
            </div>
        </div>
    );
};

export default CarouselCard;

