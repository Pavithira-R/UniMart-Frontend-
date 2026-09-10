import type { ElementType, ReactNode } from "react";
import { Link } from "react-router-dom";
import Inbox from "@mui/icons-material/Inbox";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ElementType;
    actionLabel?: string;
    actionHref?: string;
    onActionClick?: () => void;
    customAction?: ReactNode;
}

export function EmptyState({
    title,
    description,
    icon: Icon = Inbox,
    actionLabel,
    actionHref,
    onActionClick,
    customAction,
}: EmptyStateProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-150 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Icon className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
                {description}
            </p>

            {customAction && <div className="mt-6">{customAction}</div>}

            {actionLabel && actionHref && (
                <div className="mt-6">
                    <Link
                        to={actionHref}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                    >
                        {actionLabel}
                    </Link>
                </div>
            )}

            {actionLabel && onActionClick && !actionHref && (
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={onActionClick}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
                    >
                        {actionLabel}
                    </button>
                </div>
            )}
        </div>
    );
}

export default EmptyState;
