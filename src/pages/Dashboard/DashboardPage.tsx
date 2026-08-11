import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { updateProfile } from "../../store/slices/authSlice";
import { products, deleteCustomProduct, updateCustomProduct } from "../../data/products";
import type { Product } from "../../types/products";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Refresh from "@mui/icons-material/Refresh";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListAlt from "@mui/icons-material/ListAlt";
import Favorite from "@mui/icons-material/Favorite";
import Settings from "@mui/icons-material/Settings";

type Tab = "overview" | "listings" | "profile" | "settings";

function DashboardPage() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const wishlistIds = useAppSelector((state) => state.wishlist.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [localProducts, setLocalProducts] = useState<Product[]>([]);

    // Profile state fields
    const [profileName, setProfileName] = useState("");
    const [profileStudentId, setProfileStudentId] = useState("");
    const [profileMessage, setProfileMessage] = useState<string | null>(null);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Load initial listings matching this user
    useEffect(() => {
        if (user) {
            setProfileName(user.name);
            setProfileStudentId(user.studentId || "");
            const userProducts = products.filter((p) => p.seller.id === user.id);
            setLocalProducts(userProducts);
        }
    }, [user, activeTab]); // Reload when tab changes or user changes

    const wishlistedCount = useMemo(() => {
        return products.filter((p) => wishlistIds.includes(p.id)).length;
    }, [wishlistIds]);

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!profileName.trim()) {
            alert("Name is required");
            return;
        }
        dispatch(updateProfile({ name: profileName, studentId: profileStudentId }));
        setProfileMessage("Profile updated successfully!");
        setTimeout(() => setProfileMessage(null), 3000);
    };

    const handleDeleteProduct = (productId: number) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            deleteCustomProduct(productId);
            // Refresh list
            if (user) {
                setLocalProducts(products.filter((p) => p.seller.id === user.id));
            }
        }
    };

    const handleToggleSold = (product: Product) => {
        const nextStatus = product.status === "Sold" ? "Available" : "Sold";
        const updatedProduct: Product = {
            ...product,
            status: nextStatus,
        };
        updateCustomProduct(updatedProduct);
        // Refresh list
        if (user) {
            setLocalProducts(products.filter((p) => p.seller.id === user.id));
        }
    };

    if (!user) return null;

    return (
        <div className="py-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Student Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user.name}!</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
                {/* Navigation Sidebar (3 cols) */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-1 shadow-xs">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition cursor-pointer ${
                                activeTab === "overview"
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <ListAlt className="w-5 h-5" />
                            Overview
                        </button>
                        
                        <button
                            onClick={() => setActiveTab("listings")}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition cursor-pointer ${
                                activeTab === "listings"
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <span className="flex items-center gap-3">
                                <ListAlt className="w-5 h-5" />
                                My Listings
                            </span>
                            <span className="bg-gray-150 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                                {localProducts.length}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition cursor-pointer ${
                                activeTab === "profile"
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <AccountCircle className="w-5 h-5" />
                            My Profile
                        </button>

                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition cursor-pointer ${
                                activeTab === "settings"
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <Settings className="w-5 h-5" />
                            Settings
                        </button>
                    </div>
                </div>

                {/* Dashboard View (9 cols) */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs min-h-[400px]">
                        
                        {/* OVERVIEW TAB */}
                        {activeTab === "overview" && (
                            <div className="space-y-8">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6 shadow-xs">
                                    <h2 className="text-2xl font-bold">Hello, {user.name}!</h2>
                                    <p className="mt-2 text-blue-100 text-sm max-w-xl">
                                        Use the UniMart dashboard to manage your listings, edit your profile details, and track your active bookmarked listings.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="border border-gray-150 rounded-xl p-5 bg-gray-50 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Listings</span>
                                            <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{localProducts.length}</h3>
                                        </div>
                                        <ListAlt className="w-8 h-8 text-blue-600" />
                                    </div>

                                    <div className="border border-gray-150 rounded-xl p-5 bg-gray-50 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Wishlist Items</span>
                                            <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{wishlistedCount}</h3>
                                        </div>
                                        <Favorite className="w-8 h-8 text-red-500" />
                                    </div>

                                    <div className="border border-gray-150 rounded-xl p-5 bg-gray-50 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">University Scope</span>
                                            <h3 className="text-sm font-bold text-gray-800 mt-2 truncate max-w-[160px]">{user.university}</h3>
                                        </div>
                                        <AccountCircle className="w-8 h-8 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <Link to="/products/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition">
                                            + Create New Listing
                                        </Link>
                                        <Link to="/wishlist" className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-5 py-2.5 rounded-lg text-sm transition">
                                            View Wishlist
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* LISTINGS TAB */}
                        {activeTab === "listings" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                    <h2 className="text-xl font-bold text-gray-800">My Listings</h2>
                                    <Link to="/products/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition">
                                        + Add Listing
                                    </Link>
                                </div>

                                {localProducts.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {localProducts.map((product) => (
                                            <div key={product.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                                                    />
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 hover:text-blue-600 transition">
                                                            <Link to={`/products/${product.id}`}>{product.title}</Link>
                                                        </h3>
                                                        <p className="text-blue-600 font-extrabold text-sm mt-1">{product.price}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm font-semibold uppercase">{product.category}</span>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase ${
                                                                product.status === "Sold"
                                                                    ? "bg-gray-200 text-gray-700"
                                                                    : "bg-green-100 text-green-700"
                                                            }`}>
                                                                {product.status || "Available"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                                    <button
                                                        onClick={() => handleToggleSold(product)}
                                                        className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer border ${
                                                            product.status === "Sold"
                                                                ? "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                                                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                                        }`}
                                                        title={product.status === "Sold" ? "Mark Available" : "Mark Sold"}
                                                    >
                                                        {product.status === "Sold" ? <Refresh className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                        <span className="hidden md:inline">{product.status === "Sold" ? "Re-list" : "Mark Sold"}</span>
                                                    </button>

                                                    <Link to={`/products/${product.id}/edit`} className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-600 transition" title="Edit Listing">
                                                        <Edit className="w-4 h-4" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="p-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition cursor-pointer"
                                                        title="Delete Listing"
                                                    >
                                                        <Delete className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">You haven't listed any items for sale yet.</p>
                                        <Link to="/products/create" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm mt-6 transition">
                                            Create First Listing
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PROFILE TAB */}
                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">My Student Profile</h2>
                                
                                {profileMessage && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg font-semibold">
                                        {profileMessage}
                                    </div>
                                )}

                                <form onSubmit={handleProfileSave} className="space-y-5 max-w-xl">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileName}
                                            onChange={(e) => setProfileName(e.target.value)}
                                            className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-gray-700 font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">University Email Address</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="w-full mt-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-400 font-medium cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Contact support to modify registered email.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Student ID / Index No.</label>
                                        <input
                                            type="text"
                                            value={profileStudentId}
                                            onChange={(e) => setProfileStudentId(e.target.value)}
                                            placeholder="e.g. SE/2021/045"
                                            className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-gray-700 font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">University</label>
                                        <input
                                            type="text"
                                            value={user.university}
                                            readOnly
                                            className="w-full mt-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-400 font-medium cursor-not-allowed"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-sm transition shadow-sm cursor-pointer"
                                    >
                                        Save Profile Changes
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* SETTINGS TAB */}
                        {activeTab === "settings" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">Account Settings</h2>
                                
                                <div className="space-y-4 max-w-xl">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-150">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">Email Notifications</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Receive alerts when someone contacts you about listings</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded-sm" />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-150">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">Community Safety Rules</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Restrict listings strictly to users within my own university</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded-sm" />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-150">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">Theme Mode</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">Toggle light/dark appearance preference (Mockup)</p>
                                        </div>
                                        <select className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700">
                                            <option>Light Theme</option>
                                            <option disabled>Dark Theme (Coming Soon)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
