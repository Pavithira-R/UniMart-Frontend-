import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { isSeller, isAdmin } from "../../utils/roleUtils";
import UserMenu from "./UserMenu";
import NotificationMenu from "./NotificationMenu";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddCircle from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Storefront from "@mui/icons-material/Storefront";
import Info from "@mui/icons-material/Info";
import Help from "@mui/icons-material/Help";

interface NavbarProps {
    onToggleMobileSidebar?: () => void;
}

export function Navbar({ onToggleMobileSidebar }: NavbarProps) {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
    const location = useLocation();

    const canSell = user ? (isSeller(user.role) || isAdmin(user.role)) : false;

    return (
        <header className="bg-white border-b border-gray-150 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                
                {/* Left: Mobile Toggle & Brand Logo */}
                <div className="flex items-center gap-3">
                    {onToggleMobileSidebar && isAuthenticated && (
                        <button
                            type="button"
                            onClick={onToggleMobileSidebar}
                            className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                            aria-label="Toggle navigation menu"
                        >
                            <MenuIcon className="w-5 h-5" />
                        </button>
                    )}

                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-blue-700 transition">
                            U
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight text-gray-900 leading-tight">
                                UNI<span className="text-blue-600">-MART</span>
                            </span>
                            <span className="text-[10px] font-semibold text-gray-400 -mt-0.5 tracking-wide uppercase">
                                Campus Marketplace
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center: Public Links (Visible on desktop) */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        to="/"
                        className={`text-xs font-bold transition flex items-center gap-1.5 ${
                            location.pathname === "/"
                                ? "text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/browse"
                        className={`text-xs font-bold transition flex items-center gap-1.5 ${
                            location.pathname === "/browse" || location.pathname === "/listings"
                                ? "text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        <Storefront className="w-4 h-4" />
                        Browse Listings
                    </Link>

                    <Link
                        to="/about"
                        className={`text-xs font-bold transition flex items-center gap-1.5 ${
                            location.pathname === "/about"
                                ? "text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        <Info className="w-4 h-4" />
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className={`text-xs font-bold transition flex items-center gap-1.5 ${
                            location.pathname === "/contact"
                                ? "text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        <Help className="w-4 h-4" />
                        Help & Contact
                    </Link>
                </nav>

                {/* Right: Actions / Auth */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Wishlist Link */}
                    <Link
                        to="/wishlist"
                        className="relative p-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-gray-100 transition"
                        title="My Wishlist"
                    >
                        <FavoriteBorder className="w-5 h-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated && user ? (
                        <>
                            {/* Sell Item button (Seller / Admin only) */}
                            {canSell && (
                                <Link
                                    to="/products/create"
                                    className="hidden sm:inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                                >
                                    <AddCircle className="w-4 h-4 text-blue-600" />
                                    Sell Item
                                </Link>
                            )}

                            {/* Notifications */}
                            <NotificationMenu />

                            {/* User Profile Menu */}
                            <UserMenu />
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="text-xs font-bold text-gray-700 hover:text-blue-600 px-3 py-2 rounded-xl transition"
                            >
                                Log In
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Navbar;
