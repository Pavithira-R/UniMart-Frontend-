import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/store";
import { registerSuccess } from "../../store/slices/authSlice";

const UNIVERSITIES = [
    "University of Kelaniya",
    "University of Colombo",
    "University of Moratuwa",
    "University of Peradeniya",
    "University of Sri Jayewardenepura",
    "Sabaragamuwa University of Sri Lanka",
    "Rajarata University of Sri Lanka",
];

const registerSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string()
        .email("Please enter a valid email address")
        .refine(
            (val) => val.includes(".edu") || val.includes(".ac.lk") || val.includes("student"),
            { message: "Please use your university email (e.g. .edu or .ac.lk)" }
        ),
    studentId: z.string().min(3, "Student ID is required"),
    university: z.string().min(1, "Please select your university"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFields = z.infer<typeof registerSchema>;

function RegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFields>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            studentId: "",
            university: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = (data: RegisterFields) => {
        setLoading(true);
        setErrorMessage(null);

        // Simulate backend API response delay
        setTimeout(() => {
            try {
                const mockUser = {
                    id: "user_" + Date.now(),
                    name: data.fullName,
                    email: data.email,
                    studentId: data.studentId,
                    university: data.university,
                };

                dispatch(registerSuccess(mockUser));
                setSuccessMessage("Account created successfully! Welcome to UniMart.");
                setLoading(false);

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1200);
            } catch (err) {
                setErrorMessage("An error occurred during registration. Please try again.");
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                    Create Student Account
                </h2>
                <p className="text-center text-gray-500 mt-2 text-sm">
                    Join UniMart to trade with fellow students safely
                </p>

                {successMessage && (
                    <div className="mt-6 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg font-semibold">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg font-semibold">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="e.g. John Doe"
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                errors.fullName ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("fullName")}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* University Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            University Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="e.g. name@student.kln.ac.lk"
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Student ID */}
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700">
                            Student ID / Index No.
                        </label>
                        <input
                            id="studentId"
                            type="text"
                            placeholder="e.g. SE/2021/045"
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                errors.studentId ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("studentId")}
                        />
                        {errors.studentId && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">
                                {errors.studentId.message}
                            </p>
                        )}
                    </div>

                    {/* University */}
                    <div className="md:col-span-2">
                        <label htmlFor="university" className="block text-sm font-semibold text-gray-700">
                            University
                        </label>
                        <select
                            id="university"
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition cursor-pointer ${
                                errors.university ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("university")}
                        >
                            <option value="">Select your university</option>
                            {UNIVERSITIES.map((uni) => (
                                <option key={uni} value={uni}>
                                    {uni}
                                </option>
                            ))}
                        </select>
                        {errors.university && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">
                                {errors.university.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Min 6 characters"
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                errors.password ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter password"
                            className={`w-full mt-2 px-4 py-2.5 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
                                errors.confirmPassword ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500 focus:bg-white"
                            }`}
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1.5 font-medium">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition shadow-md focus:outline-hidden disabled:opacity-50 mt-4 cursor-pointer"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold transition">
                        Log in instead
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;