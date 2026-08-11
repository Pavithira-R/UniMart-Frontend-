import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { addCustomProduct } from "../../data/products";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Publish from "@mui/icons-material/Publish";

const CATEGORIES = ["Books", "Electronics", "Mobile Phones", "Furniture", "Clothing", "Gaming", "Accessories"];
const CONDITIONS = ["New", "Like New", "Good", "Fair"] as const;

const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(80, "Title cannot exceed 80 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.string().min(1, "Price is required").refine(
        (val) => {
            const num = Number(val.replace(/[^0-9]/g, ""));
            return !isNaN(num) && num > 0;
        },
        { message: "Price must be a positive amount" }
    ),
    category: z.string().min(1, "Please select a category"),
    condition: z.enum(["New", "Like New", "Good", "Fair"]),
    location: z.string().min(3, "Location is required (e.g., Hostel Block B)"),
    university: z.string().min(1, "University is required"),
    imageFile: z.any().optional(),
});

type ProductFields = z.infer<typeof productSchema>;

function CreateProductPage() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFields>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            category: "",
            condition: undefined,
            location: "",
            university: user?.university || "",
        }
    });

    // Handle Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
            setValue("imageFile", file);
        }
    };

    const onSubmit = (data: ProductFields) => {
        if (!user) return;
        setLoading(true);

        setTimeout(() => {
            // Generate a random picsum image if no file was uploaded, or use the object URL
            const finalImage = previewImage || `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 100)}`;
            const numericPrice = Number(data.price.replace(/[^0-9]/g, ""));

            const newProduct = {
                id: Date.now(), // timestamp as mock ID
                title: data.title,
                price: `Rs. ${numericPrice.toLocaleString()}`,
                category: data.category,
                image: finalImage,
                location: data.location,
                description: data.description,
                condition: data.condition,
                seller: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                university: data.university,
                postedDate: new Date().toISOString().split("T")[0],
            };

            /*
              NOTE: Backend Integration Preparation
              When connecting to the backend API:
              1. Create a FormData object.
              2. Append file (data.imageFile) and all metadata text fields.
              3. Send a POST request to `${VITE_API_URL}/products` with headers: { 'Content-Type': 'multipart/form-data' }
            */

            addCustomProduct(newProduct);
            setLoading(false);
            navigate("/dashboard");
        }, 1200);
    };

    if (!user) return null;

    return (
        <div className="max-w-3xl mx-auto py-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition mb-8 cursor-pointer"
            >
                <ArrowBack className="w-5 h-5" />
                Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden px-8 py-10">
                <h1 className="text-3xl font-extrabold text-gray-800">
                    Sell an Item
                </h1>
                <p className="text-gray-500 mt-2 text-sm border-b border-gray-100 pb-6">
                    Create a new listing to advertise your product on campus
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                            Listing Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. Scientific Calculator, Engineering Chemistry book..."
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                errors.title ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Price and Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                                Price (Rs.)
                            </label>
                            <input
                                id="price"
                                type="text"
                                placeholder="e.g. 5,000"
                                className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                    errors.price ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                                }`}
                                {...register("price")}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.price.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition cursor-pointer ${
                                    errors.category ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                                }`}
                                {...register("category")}
                            >
                                <option value="">Select Category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Condition and Location Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Condition */}
                        <div>
                            <label htmlFor="condition" className="block text-sm font-semibold text-gray-700">
                                Item Condition
                            </label>
                            <select
                                id="condition"
                                className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition cursor-pointer ${
                                    errors.condition ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                                }`}
                                {...register("condition")}
                            >
                                <option value="">Select Condition</option>
                                {CONDITIONS.map((cond) => (
                                    <option key={cond} value={cond}>
                                        {cond}
                                    </option>
                                ))}
                            </select>
                            {errors.condition && (
                                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.condition.message}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                                Specific Meeting Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                placeholder="e.g. Science Library, Hostel C..."
                                className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                    errors.location ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                                }`}
                                {...register("location")}
                            />
                            {errors.location && (
                                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.location.message}</p>
                            )}
                        </div>
                    </div>

                    {/* University (Autopopulated) */}
                    <div>
                        <label htmlFor="university" className="block text-sm font-semibold text-gray-700">
                            University Scope
                        </label>
                        <input
                            id="university"
                            type="text"
                            readOnly
                            className="w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-100 border border-gray-200 outline-none text-gray-500 font-medium cursor-not-allowed"
                            {...register("university")}
                        />
                        <p className="text-xs text-gray-400 mt-1">Autopopulated based on your student account university profile.</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                            Product Description
                        </label>
                        <textarea
                            id="description"
                            rows={5}
                            placeholder="Provide details about specs, condition details, reasons for selling, and preferred times to meet..."
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition resize-none ${
                                errors.description ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Image Upload Box */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Product Image
                        </label>
                        <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition cursor-pointer relative min-h-[160px]">
                            {previewImage ? (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-100">
                                    <img src={previewImage} alt="Product preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setPreviewImage(null)}
                                        className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full p-1.5 shadow-sm text-xs font-bold transition cursor-pointer"
                                    >
                                        ✕ Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center space-y-2">
                                    <Publish className="text-gray-400 w-10 h-10 mx-auto" />
                                    <div className="text-sm text-gray-600">
                                        <span className="font-semibold text-blue-600 hover:text-blue-700">Click to upload</span> or drag and drop
                                    </div>
                                    <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition shadow-md focus:outline-hidden disabled:opacity-50 mt-4 cursor-pointer"
                    >
                        {loading ? "Creating Listing..." : "Publish Listing"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProductPage;
