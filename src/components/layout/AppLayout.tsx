import { useState, type ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
import Footer from "../Footer/Footer";
import { useAppSelector } from "../../hooks/store";

interface AppLayoutProps {
    children: ReactNode;
    variant?: "standard" | "portal";
}

export function AppLayout({ children, variant }: AppLayoutProps) {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Auto-select portal layout if authenticated and variant is portal
    const isPortal = variant === "portal" && isAuthenticated;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased">
            {/* Top Navbar */}
            <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)} />

            {/* Mobile Navigation Drawer */}
            <MobileNavigation
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {isPortal ? (
                /* Authenticated Application Shell (Sidebar + Main Workspace) */
                <div className="flex-1 flex overflow-hidden">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block shrink-0">
                        <Sidebar />
                    </div>

                    {/* Main Workspace */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </main>
                </div>
            ) : (
                /* Public / Standard Full-Width Layout */
                <>
                    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
                        {children}
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default AppLayout;
