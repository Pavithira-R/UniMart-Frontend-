import { Navigate, useLocation, Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { normalizeRole } from "../../utils/roleUtils";
import Lock from "@mui/icons-material/Lock";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ("ADMIN" | "SELLER" | "BUYER")[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-500 font-medium">Checking authorization...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userNormRole = normalizeRole(user.role) as "ADMIN" | "SELLER" | "BUYER";
        const hasAccess = allowedRoles.includes(userNormRole);

        if (!hasAccess) {
            return (
                <div className="max-w-xl mx-auto my-16 bg-white rounded-2xl border border-red-200 p-8 text-center shadow-xs">
                    <div className="bg-red-50 text-red-600 inline-flex p-4 rounded-full mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Access Restricted</h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        Your account has the role <strong className="uppercase text-red-600">{userNormRole}</strong>,
                        which does not have permission to access this page.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link
                            to="/dashboard"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition flex items-center gap-2"
                        >
                            <ArrowBack className="w-4 h-4" /> Go to My Dashboard
                        </Link>
                    </div>
                </div>
            );
        }
    }

    return <>{children}</>;
}

export default ProtectedRoute;
