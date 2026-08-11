import ProductGrid from "./ProductGrid";
import type { Product } from "../../types/products";

interface FeaturedProductsProps {
    products: Product[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    searchQuery: string;
    onClearSearch: () => void;
    wishlistIds?: number[];
    onWishlistToggle?: (id: number) => void;
}

const CATEGORIES = ["All", "Books", "Electronics", "Mobile Phones", "Furniture", "Clothing", "Gaming", "Accessories"];

function FeaturedProducts({
    products,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
    searchQuery,
    onClearSearch,
    wishlistIds = [],
    onWishlistToggle,
}: FeaturedProductsProps) {
    const isFiltered = selectedCategory !== "All" || searchQuery !== "";

    const handleClearAll = () => {
        onCategoryChange("All");
        onClearSearch();
    };

    return (
        <section id="featured-products" className="py-20 bg-gray-50 scroll-mt-6">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Featured Products
                    </h2>
                    <p className="text-gray-500 mt-3 text-lg">
                        Discover the latest items posted by students.
                    </p>
                </div>

                {/* Filters & Sorting Controls */}
                <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    
                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-5 px-5 md:mx-0 md:px-0">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                                    selectedCategory === cat
                                        ? "bg-blue-600 text-white shadow-xs"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex items-center gap-3 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                        <label htmlFor="sort" className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                            Sort By
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 transition font-medium cursor-pointer"
                        >
                            <option value="Featured">Featured</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: High to Low">Price: High to Low</option>
                            <option value="Newest">Newest</option>
                        </select>
                    </div>

                </div>

                {/* Filter Summary */}
                {isFiltered && (
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-blue-800 font-medium">
                                Filters active:
                            </span>
                            {selectedCategory !== "All" && (
                                <span className="bg-white border border-blue-200 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 shadow-xs">
                                    Category: {selectedCategory}
                                    <button 
                                        onClick={() => onCategoryChange("All")}
                                        className="hover:text-blue-900 font-extrabold cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </span>
                            )}
                            {searchQuery !== "" && (
                                <span className="bg-white border border-blue-200 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 shadow-xs">
                                    Search: "{searchQuery}"
                                    <button 
                                        onClick={onClearSearch}
                                        className="hover:text-blue-900 font-extrabold cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleClearAll}
                            className="text-sm text-blue-600 hover:text-blue-800 font-bold transition cursor-pointer"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Products Grid or Empty State */}
                {products.length > 0 ? (
                    <ProductGrid 
                        products={products} 
                        wishlistIds={wishlistIds} 
                        onWishlistToggle={onWishlistToggle} 
                    />
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-xs border border-gray-155 max-w-2xl mx-auto px-6">
                        <div className="bg-blue-50 text-blue-600 inline-flex p-4 rounded-full mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                            No listings found
                        </h3>
                        <p className="text-gray-500 mt-3 max-w-md mx-auto">
                            We couldn't find any products matching your search query or selected category. Try checking your spelling or adjusting filters.
                        </p>
                        <button
                            onClick={handleClearAll}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mt-8 transition shadow-sm cursor-pointer"
                        >
                            Reset Search & Filters
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}

export default FeaturedProducts;