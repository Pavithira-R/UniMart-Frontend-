import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import LocationOn from "@mui/icons-material/LocationOn";

interface ProductCardProps {
    id: number;
    image: string;
    title: string;
    price: string;
    category: string;
    location: string;
    condition: string;
    isWishlisted?: boolean;
    onWishlistToggle?: (e: React.MouseEvent) => void;
}

function ProductCard({
    id,
    image,
    title,
    price,
    category,
    location,
    condition,
    isWishlisted = false,
    onWishlistToggle,
}: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between relative group">
            {/* Wishlist Button Overlay */}
            {onWishlistToggle && (
                <button
                    onClick={onWishlistToggle}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs p-2 rounded-full shadow-md text-gray-500 hover:text-red-500 hover:bg-white transition z-10 cursor-pointer"
                    aria-label="Toggle Wishlist"
                >
                    {isWishlisted ? (
                        <Favorite className="text-red-500 w-5 h-5" />
                    ) : (
                        <FavoriteBorder className="w-5 h-5" />
                    )}
                </button>
            )}

            <Link to={`/products/${id}`} className="block overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-3 left-3 text-xs bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md font-semibold">
                    {condition}
                </span>
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider">
                            {category}
                        </span>
                    </div>

                    <Link to={`/products/${id}`} className="block mt-3 hover:text-blue-600 transition">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-snug">
                            {title}
                        </h3>
                    </Link>
                </div>

                <div className="mt-4">
                    <p className="text-blue-600 text-xl font-extrabold">
                        {price}
                    </p>

                    <div className="flex items-center text-gray-500 mt-2 text-sm">
                        <LocationOn className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="truncate">{location}</span>
                    </div>

                    <Link to={`/products/${id}`} className="block mt-5">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer text-center text-sm">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;