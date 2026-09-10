import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { logout } from "../../store/slices/authSlice";
import { normalizeRole, getRoleBadgeStyle } from "../../utils/roleUtils";
import DashboardIcon from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import ListAlt from "@mui/icons-material/ListAlt";
import RateReview from "@mui/icons-material/RateReview";
import AddCircle from "@mui/icons-material/AddCircle";
import Storefront from "@mui/icons-material/Storefront";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Person from "@mui/icons-material/Person";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface SidebarProps {
    onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
    const { user } = useAppSelector((state) => state.auth);
    const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) return null;

    const normRole = normalizeRole(user.role);
    const roleBadge = getRoleBadgeStyle(user.role);

    const handleLogout = () => {
        onCloseMobile?.();
        dispatch(logout());
        navigate("/");
    };

    // Determine navigation items based on actual role
    const getNavItems = () => {
        if (normRole === "ADMIN") {
            return [
                { label: "Dashboard", path: "/dashboard", icon: DashboardIcon },
                { label: "User Management", path: "/admin/users", icon: People },
                { label: "Listing Management", path: "/admin/listings", icon: ListAlt },
                { label: "Review Management", path: "/admin/reviews", icon: RateReview },
                { label: "Profile", path: "/admin/profile", icon: Person },
                { label: "Settings", path: "/admin/settings", icon: SettingsOutlined },
            ];
        }
        if (normRole === "SELLER") {
            return [
                { label: "Dashboard", path: "/dashboard", icon: DashboardIcon },
                { label: "My Listings", path: "/seller/listings", icon: ListAlt },
                { label: "Create Listing", path: "/seller/listings/create", icon: AddCircle },
                { label: "Profile", path: "/seller/profile", icon: Person },
                { label: "Settings", path: "/seller/settings", icon: SettingsOutlined },
            ];
        }
        // Default: BUYER
        return [
            { label: "Dashboard", path: "/dashboard", icon: DashboardIcon },
            { label: "Browse Listings", path: "/browse", icon: Storefront },
            { label: "Wishlist", path: "/wishlist", icon: FavoriteBorder, badge: wishlistCount > 0 ? wishlistCount : undefined },
            { label: "My Reviews", path: "/buyer/reviews", icon: RateReview },
            { label: "Profile", path: "/buyer/profile", icon: Person },
            { label: "Settings", path: "/buyer/settings", icon: SettingsOutlined },
        ];
    };

    const navItems = getNavItems();

    return (
        <aside className="w-64 bg-white border-r border-gray-150 flex flex-col h-full shrink-0">
            {/* User Profile Card */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                        {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-gray-900 truncate">{user.fullName}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.universityEmail}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${roleBadge.badgeClass}`}>
                        {roleBadge.label} PORTAL
                    </span>
                </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Menu
                </p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Active check includes subpath or exact match
                    const isActive = location.pathname === item.path ||
                        (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => onCloseMobile?.()}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                                isActive
                                    ? "bg-blue-50 text-blue-700 font-bold"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                <span className="truncate">{item.label}</span>
                            </div>
                            {item.badge !== undefined && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-gray-100 space-y-1 bg-gray-50/50">
                <NavLink
                    to="/"
                    onClick={() => onCloseMobile?.()}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-white hover:text-blue-600 transition"
                >
                    <ArrowBack className="w-4 h-4 text-gray-400" />
                    Marketplace Home
                </NavLink>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                    <LogoutIcon className="w-4 h-4 text-red-500" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
