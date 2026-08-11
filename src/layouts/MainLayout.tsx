import type { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface MainLayoutProps {
    children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full p-6">
                {children}
            </main>

            <Footer />

        </div>
    );
}

export default MainLayout;