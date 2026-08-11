import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import ProductCard from "../../components/FeaturedProducts/ProductCard";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LocationOn from "@mui/icons-material/LocationOn";
import School from "@mui/icons-material/School";
import ContactMail from "@mui/icons-material/ContactMail";
import CalendarToday from "@mui/icons-material/CalendarToday";
import VerifiedUser from "@mui/icons-material/VerifiedUser";

function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const wishlistIds = useAppSelector((state) => state.wishlist.items);

    const [showContact, setShowContact] = useState(false);

    const product = useMemo(() => {
        return products.find((p) => p.id === Number(id));
    }, [id]);

    const isWishlisted = useMemo(() => {
        return product ? wishlistIds.includes(product.id) : false;
    }, [product, wishlistIds]);

    const similarProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
    }, [product]);

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-gray-800">Product Not Found</h2>
                <p className="text-gray-500 mt-4">The listing you are looking for does not exist or has been removed.</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mt-8 transition"
                >
                    Return to Homepage
                </button>
            </div>
        );
    }

    const handleWishlistToggle = () => {
        dispatch(toggleWishlist(product.id));
    };

    return (
        <div className="py-6 max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition mb-8 cursor-pointer"
            >
                <ArrowBack className="w-5 h-5" />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Images Section (Left - 7 cols on large screens) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-[450px] object-cover"
                        />
                    </div>

                    {/* Mock thumbnails if additional images exist */}
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-3 gap-4">
                            {product.images.map((imgUrl, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-xs border border-gray-150 overflow-hidden cursor-pointer hover:border-blue-500 transition">
                                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section (Right - 5 cols on large screens) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 md:p-8 space-y-6">
                        
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-bold uppercase tracking-wider">
                                {product.category}
                            </span>
                            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md font-bold uppercase">
                                Condition: {product.condition}
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight">
                            {product.title}
                        </h1>

                        <p className="text-3xl font-black text-blue-600">
                            {product.price}
                        </p>

                        <hr className="border-gray-100" />

                        {/* Location and Uni */}
                        <div className="space-y-3.5 text-gray-600 font-medium">
                            <div className="flex items-center gap-3">
                                <School className="text-blue-500 w-5 h-5" />
                                <span>{product.university}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <LocationOn className="text-gray-400 w-5 h-5" />
                                <span>{product.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CalendarToday className="text-gray-400 w-5 h-5" />
                                <span>Posted on: {product.postedDate}</span>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div>
                            <h3 className="text-md font-bold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {product.description}
                            </p>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Seller Card */}
                        <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                                    {product.seller.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-800 flex items-center gap-1">
                                        {product.seller.name}
                                        <VerifiedUser className="text-blue-500 w-4 h-4" titleAccess="Verified Student" />
                                    </div>
                                    <div className="text-xs text-gray-500">Student Seller</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <button
                                onClick={handleWishlistToggle}
                                className={`flex items-center justify-center gap-2 border font-bold px-6 py-3 rounded-lg transition cursor-pointer ${
                                    isWishlisted
                                        ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {isWishlisted ? (
                                    <>
                                        <Favorite className="w-5 h-5 text-red-500" />
                                        Wishlisted
                                    </>
                                ) : (
                                    <>
                                        <FavoriteBorder className="w-5 h-5" />
                                        Add to Wishlist
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setShowContact(!showContact)}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition shadow-xs cursor-pointer"
                            >
                                <ContactMail className="w-5 h-5" />
                                Contact Seller
                            </button>
                        </div>

                        {/* Contact Details Card (Conditional) */}
                        {showContact && (
                            <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-4 space-y-2 mt-4">
                                <h4 className="font-bold text-sm text-blue-800">Seller Contact Information:</h4>
                                <p className="text-sm">
                                    <strong>Email:</strong>{" "}
                                    <a href={`mailto:${product.seller.email}`} className="text-blue-600 hover:underline">
                                        {product.seller.email}
                                    </a>
                                </p>
                                {product.seller.phone && (
                                    <p className="text-sm">
                                        <strong>Phone:</strong>{" "}
                                        <a href={`tel:${product.seller.phone}`} className="text-blue-600 hover:underline">
                                            {product.seller.phone}
                                        </a>
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 italic mt-1">
                                    Please verify student ID when meeting in person. Always make deals in public campus locations.
                                </p>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* Similar Products Section */}
            {similarProducts.length > 0 && (
                <div className="mt-20 border-t border-gray-150 pt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">
                        Similar Listings in {product.category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {similarProducts.map((p) => (
                            <ProductCard
                                key={p.id}
                                id={p.id}
                                image={p.image}
                                title={p.title}
                                price={p.price}
                                category={p.category}
                                location={p.location}
                                condition={p.condition}
                                isWishlisted={wishlistIds.includes(p.id)}
                                onWishlistToggle={(e) => {
                                    e.preventDefault();
                                    dispatch(toggleWishlist(p.id));
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailsPage;
