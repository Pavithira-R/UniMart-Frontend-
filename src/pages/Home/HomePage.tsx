import { useState, useMemo } from "react";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import CTA from "../../components/CTA/CTA";
import { products } from "../../data/products";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { toggleWishlist } from "../../store/slices/wishlistSlice";

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Featured");

    const wishlistIds = useAppSelector((state) => state.wishlist.items);
    const dispatch = useAppDispatch();

    const handleWishlistToggle = (id: number) => {
        dispatch(toggleWishlist(id));
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 1. Search Query Filter (Title, Category, Location, or Description)
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.location.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // 2. Category Filter
        if (selectedCategory !== "All") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // 3. Sorting Logic
        if (sortBy === "Price: Low to High") {
            result.sort((a, b) => {
                const priceA = Number(a.price.replace(/[^0-9]/g, ""));
                const priceB = Number(b.price.replace(/[^0-9]/g, ""));
                return priceA - priceB;
            });
        } else if (sortBy === "Price: High to Low") {
            result.sort((a, b) => {
                const priceA = Number(a.price.replace(/[^0-9]/g, ""));
                const priceB = Number(b.price.replace(/[^0-9]/g, ""));
                return priceB - priceA;
            });
        } else if (sortBy === "Newest") {
            result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        }

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <>
            <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <Categories onSelectCategory={setSelectedCategory} />
            <FeaturedProducts
                products={filteredAndSortedProducts}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
                wishlistIds={wishlistIds}
                onWishlistToggle={handleWishlistToggle}
            />
            <WhyChooseUs />
            <CTA />
        </>
    );
}

export default HomePage;