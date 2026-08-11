interface CategoryCardProps {
    icon: string;
    title: string;
    count: string;
}

function CategoryCard({ icon, title, count }: CategoryCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer">

            <div className="text-5xl mb-4">
                {icon}
            </div>

            <h3 className="text-xl font-bold">
                {title}
            </h3>

            <p className="text-gray-500 mt-2">
                {count}
            </p>

        </div>
    );
}

export default CategoryCard;