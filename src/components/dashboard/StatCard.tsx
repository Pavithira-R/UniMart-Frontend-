import type { ElementType } from "react";
import { Link } from "react-router-dom";

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ElementType;
    iconColor?: "blue" | "emerald" | "amber" | "purple" | "rose";
    linkTo?: string;
}

const COLOR_MAP = {
    blue: {
        bg: "bg-blue-50 text-blue-600 border-blue-100",
        pill: "bg-blue-100 text-blue-700",
    },
    emerald: {
        bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
        pill: "bg-emerald-100 text-emerald-700",
    },
    amber: {
        bg: "bg-amber-50 text-amber-600 border-amber-100",
        pill: "bg-amber-100 text-amber-700",
    },
    purple: {
        bg: "bg-purple-50 text-purple-600 border-purple-100",
        pill: "bg-purple-100 text-purple-700",
    },
    rose: {
        bg: "bg-rose-50 text-rose-600 border-rose-100",
        pill: "bg-rose-100 text-rose-700",
    },
};

export function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor = "blue",
    linkTo,
}: StatCardProps) {
    const colors = COLOR_MAP[iconColor] || COLOR_MAP.blue;

    const content = (
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs hover:border-gray-300 transition duration-150 group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 tracking-tight">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 font-medium mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-xl border ${colors.bg} shrink-0 transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );

    if (linkTo) {
        return <Link to={linkTo} className="block">{content}</Link>;
    }

    return content;
}

export default StatCard;
