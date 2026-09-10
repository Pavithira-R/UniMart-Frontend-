import type { ElementType } from "react";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: ElementType;
    linkTo: string;
    actionText?: string;
    theme?: "blue" | "emerald" | "amber" | "purple";
}

const THEME_MAP = {
    blue: "hover:border-blue-300 group-hover:text-blue-600 bg-blue-50 text-blue-600",
    emerald: "hover:border-emerald-300 group-hover:text-emerald-600 bg-emerald-50 text-emerald-600",
    amber: "hover:border-amber-300 group-hover:text-amber-600 bg-amber-50 text-amber-600",
    purple: "hover:border-purple-300 group-hover:text-purple-600 bg-purple-50 text-purple-600",
};

export function QuickActionCard({
    title,
    description,
    icon: Icon,
    linkTo,
    actionText = "Proceed",
    theme = "blue",
}: QuickActionCardProps) {
    const themeClass = THEME_MAP[theme] || THEME_MAP.blue;

    return (
        <Link
            to={linkTo}
            className="group bg-white rounded-2xl p-5 border border-gray-150 shadow-xs hover:shadow-md transition duration-150 flex flex-col justify-between"
        >
            <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${themeClass}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>{actionText}</span>
                <ArrowForward className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}

export default QuickActionCard;
