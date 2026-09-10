import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { isAdmin, isSeller } from "../../utils/roleUtils";
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";
import BuyerDashboard from "./BuyerDashboard";

export function DashboardPage() {
    const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-500 font-medium">Loading your dashboard...</p>
            </div>
        );
    }

    if (!user) return null;

    if (isAdmin(user.role)) {
        return <AdminDashboard user={user} />;
    }

    if (isSeller(user.role)) {
        return <SellerDashboard user={user} />;
    }

    return <BuyerDashboard user={user} />;
}

export default DashboardPage;
