import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChevronRight from "@mui/icons-material/ChevronRight";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionHref?: string;
    actionNode?: ReactNode;
}

export function SectionHeader({
    title,
    subtitle,
    actionLabel,
    actionHref,
    actionNode,
}: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4 mb-4">
            <div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
            </div>

            {actionNode}

            {actionLabel && actionHref && (
                <Link
                    to={actionHref}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition shrink-0"
                >
                    {actionLabel}
                    <ChevronRight className="w-4 h-4" />
                </Link>
            )}
        </div>
    );
}

export default SectionHeader;
