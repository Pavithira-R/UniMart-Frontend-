import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { products } from "../../data/products";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import ProductGrid from "../../components/FeaturedProducts/ProductGrid";
import Favorite from "@mui/icons-material/Favorite";

function WishlistPage() {
    const wishlistIds = useAppSelector((state) => state.wishlist.items);
    const dispatch = useAppDispatch();

    const wishlistedProducts = useMemo(() => {
        return products.filter((p) => wishlistIds.includes(p.id));
    }, [wishlistIds]);

    const handleWishlistToggle = (id: number) => {
        dispatch(toggleWishlist(id));
    };

    return (
        <div className="py-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-6">
                <Favorite className="text-red-500 w-8 h-8" />
                <h1 className="text-3xl font-extrabold text-gray-800">
                    My Wishlist
                </h1>
                <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-bold">
                    {wishlistedProducts.length} Items
                </span>
            </div>

            {wishlistedProducts.length > 0 ? (
                <ProductGrid
                    products={wishlistedProducts}
                    wishlistIds={wishlistIds}
                    onWishlistToggle={handleWishlistToggle}
                />
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-150 shadow-xs max-w-2xl mx-auto px-6">
                    <div className="bg-red-50 text-red-500 inline-flex p-4 rounded-full mb-6">
                        <Favorite className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
                    <p className="text-gray-500 mt-4 max-w-md mx-auto">
                        Bookmark listings that catch your eye, and they will show up here for easy access later.
                    </p>
                    <Link to="/" className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-sm">
                        Browse Listings
                    </Link>
                </div>
            )}
        </div>
    );
}

export default WishlistPage;
