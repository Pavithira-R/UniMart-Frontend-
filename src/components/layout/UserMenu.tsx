import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { logout } from "../../store/slices/authSlice";
import { getRoleBadgeStyle } from "../../utils/roleUtils";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export function UserMenu() {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const roleBadge = getRoleBadgeStyle(user.role);
    const initials = user.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : "U";

    const handleLogout = () => {
        setIsOpen(false);
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer border border-transparent hover:border-gray-200"
                aria-expanded={isOpen}
                aria-label="User profile menu"
            >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {initials}
                </div>
                <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-gray-800 leading-tight truncate max-w-[120px]">
                        {user.fullName}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium">
                        {roleBadge.label}
                    </p>
                </div>
                <KeyboardArrowDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    {/* Header with user info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user.universityEmail}</p>
                        <div className="mt-2.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${roleBadge.badgeClass}`}>
                                {roleBadge.label} ACCOUNT
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="py-1">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            <DashboardIcon className="w-4 h-4 text-gray-400" />
                            My Dashboard
                        </Link>
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            <Person className="w-4 h-4 text-gray-400" />
                            Profile & Account
                        </Link>
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                            <Settings className="w-4 h-4 text-gray-400" />
                            Settings
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-1">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                        >
                            <LogoutIcon className="w-4 h-4 text-red-500" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
