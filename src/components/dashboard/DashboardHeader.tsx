import type { ReactNode } from "react";
import { getRoleBadgeStyle } from "../../utils/roleUtils";

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
    role?: string;
    actions?: ReactNode;
}

export function DashboardHeader({ title, subtitle, role, actions }: DashboardHeaderProps) {
    const roleBadge = role ? getRoleBadgeStyle(role) : null;

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                        {title}
                    </h1>
                    {roleBadge && (
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${roleBadge.badgeClass}`}>
                            {roleBadge.label}
                        </span>
                    )}
                </div>
                {subtitle && (
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}

export default DashboardHeader;
