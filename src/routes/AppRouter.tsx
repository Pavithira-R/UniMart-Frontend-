import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import WishlistPage from "../pages/Wishlist/WishlistPage";
import CreateProductPage from "../pages/CreateProduct/CreateProductPage";
import EditProductPage from "../pages/EditProduct/EditProductPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <HomePage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <MainLayout>
                            <LoginPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <MainLayout>
                            <RegisterPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/products/:id"
                    element={
                        <MainLayout>
                            <ProductDetailsPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/products/create"
                    element={
                        <MainLayout>
                            <CreateProductPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/products/:id/edit"
                    element={
                        <MainLayout>
                            <EditProductPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/wishlist"
                    element={
                        <MainLayout>
                            <WishlistPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <MainLayout>
                            <DashboardPage />
                        </MainLayout>
                    }
                />

                <Route
                    path="*"
                    element={
                        <MainLayout>
                            <NotFoundPage />
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;