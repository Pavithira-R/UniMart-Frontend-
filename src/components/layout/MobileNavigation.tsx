import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import Sidebar from "./Sidebar";
import Close from "@mui/icons-material/Close";
import Storefront from "@mui/icons-material/Storefront";
import Info from "@mui/icons-material/Info";
import Help from "@mui/icons-material/Help";
import Home from "@mui/icons-material/Home";

interface MobileNavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // Close mobile drawer on route change
    useEffect(() => {
        onClose();
    }, [location.pathname]);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10">
                {/* Header */}
                <div className="p-4 border-b border-gray-150 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            U
                        </div>
                        <span className="font-bold text-gray-900 text-sm">UNI-MART</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                        aria-label="Close menu"
                    >
                        <Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {isAuthenticated ? (
                        <Sidebar onCloseMobile={onClose} />
                    ) : (
                        <div className="p-4 space-y-2">
                            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                                Marketplace Navigation
                            </p>
                            <Link
                                to="/"
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                <Home className="w-4 h-4 text-gray-400" />
                                Home
                            </Link>
                            <Link
                                to="/browse"
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                <Storefront className="w-4 h-4 text-gray-400" />
                                Browse Listings
                            </Link>
                            <Link
                                to="/about"
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                <Info className="w-4 h-4 text-gray-400" />
                                About UNI-MART
                            </Link>
                            <Link
                                to="/contact"
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                <Help className="w-4 h-4 text-gray-400" />
                                Help & Support
                            </Link>

                            <div className="pt-6 border-t border-gray-100 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={onClose}
                                    className="block w-full text-center py-2.5 rounded-xl bg-gray-100 text-gray-800 font-bold text-xs hover:bg-gray-200 transition"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={onClose}
                                    className="block w-full text-center py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MobileNavigation;
