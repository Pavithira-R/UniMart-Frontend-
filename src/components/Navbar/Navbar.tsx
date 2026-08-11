import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { logout } from "../../store/slices/authSlice";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddCircle from "@mui/icons-material/AddCircle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                <Logo />

                <div className="flex items-center gap-6 md:gap-8">
                    <Link
                        to="/"
                        className="text-gray-600 hover:text-blue-600 font-semibold transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/wishlist"
                        className="text-gray-600 hover:text-blue-600 font-semibold transition flex items-center gap-1.5 relative"
                    >
                        <FavoriteBorder className="w-5 h-5 text-gray-500" />
                        <span className="hidden sm:inline">Wishlist</span>
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/products/create"
                                className="text-gray-600 hover:text-blue-600 font-semibold transition flex items-center gap-1.5"
                            >
                                <AddCircle className="w-5 h-5 text-gray-500" />
                                <span className="hidden sm:inline">Sell Item</span>
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-gray-600 hover:text-blue-600 font-semibold transition flex items-center gap-1.5"
                            >
                                <AccountCircle className="w-5 h-5 text-gray-500" />
                                <span className="hidden sm:inline">Dashboard</span>
                                <span className="sm:hidden max-w-[80px] truncate text-xs bg-gray-100 px-2 py-0.5 rounded-sm">
                                    {user?.name.split(" ")[0]}
                                </span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-red-600 font-semibold transition flex items-center gap-1.5 cursor-pointer"
                                title="Sign Out"
                            >
                                <LogoutIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-blue-600 font-semibold transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-xs"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;