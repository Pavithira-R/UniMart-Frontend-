import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/store";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";

const loginSchema = z.object({
    email: z.string()
        .email("Please enter a valid email address")
        .refine(
            (val) => val.includes(".edu") || val.includes(".ac.lk") || val.includes("student"),
            { message: "Please use your university email (e.g., name@student.kln.ac.lk or .edu)" }
        ),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFields = z.infer<typeof loginSchema>;

function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        }
    });

    const onSubmit = (data: LoginFields) => {
        setLoading(true);
        setErrorMessage(null);
        dispatch(loginStart());

        // Simulate backend API response delay
        setTimeout(() => {
            try {
                // Mock success for university students
                const nameFromEmail = data.email.split("@")[0];
                const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1).replace(".", " ");
                
                // Determine university from email or default to Kelaniya
                let university = "University of Kelaniya";
                if (data.email.includes("cmb.ac.lk")) university = "University of Colombo";
                if (data.email.includes("mrt.ac.lk")) university = "University of Moratuwa";
                if (data.email.includes("pdn.ac.lk")) university = "University of Peradeniya";

                const mockUser = {
                    id: "user_" + Date.now(),
                    name: displayName,
                    email: data.email,
                    university,
                };

                dispatch(loginSuccess(mockUser));
                setSuccessMessage("Logged in successfully! Redirecting...");
                setLoading(false);

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } catch (err) {
                dispatch(loginFailure("Invalid credentials"));
                setErrorMessage("Invalid credentials. Try again.");
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="max-w-md mx-auto my-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
                
                <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mt-2 text-sm">
                    Login to buy and sell inside your university
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

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            University Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="e.g. name@student.kln.ac.lk"
                            className={`w-full mt-2 px-4 py-3 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
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

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Forgot password clicked. For this demo, try typing any password of 6+ characters."); }} className="text-xs text-blue-600 hover:text-blue-800 font-bold transition">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className={`w-full mt-2 px-4 py-3 rounded-lg bg-gray-50 border outline-none text-gray-700 transition ${
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

                    <div className="flex items-center">
                        <input
                            id="rememberMe"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500"
                            {...register("rememberMe")}
                        />
                        <label htmlFor="rememberMe" className="ml-2.5 text-sm font-medium text-gray-600 cursor-pointer select-none">
                            Remember me on this device
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition shadow-md focus:outline-hidden disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    New to UniMart?{" "}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold transition">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
