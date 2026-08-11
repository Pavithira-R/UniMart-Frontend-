import CategoryCard from "../CategoryCard/CategoryCard";

const categoriesList = [
    { icon: "📚", title: "Books", count: "240 Items" },
    { icon: "💻", title: "Electronics", count: "150 Items" },
    { icon: "📱", title: "Mobile Phones", count: "120 Items" },
    { icon: "🪑", title: "Furniture", count: "70 Items" },
    { icon: "👕", title: "Clothing", count: "95 Items" },
    { icon: "🎮", title: "Gaming", count: "65 Items" },
    { icon: "🎧", title: "Accessories", count: "110 Items" },
];

interface CategoriesProps {
    onSelectCategory: (category: string) => void;
}

function Categories({ onSelectCategory }: CategoriesProps) {
    const handleCategoryClick = (categoryTitle: string) => {
        onSelectCategory(categoryTitle);
        const element = document.getElementById("featured-products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="py-20 bg-gray-150">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center text-gray-800">
                    Browse Categories
                </h2>
                <p className="text-center text-gray-500 mt-2">
                    Select a category to filter listings instantly
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-12">

                    {categoriesList.map((category) => (
                        <div 
                            key={category.title} 
                            onClick={() => handleCategoryClick(category.title)}
                        >
                            <CategoryCard
                                icon={category.icon}
                                title={category.title}
                                count={category.count}
                            />
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Categories;