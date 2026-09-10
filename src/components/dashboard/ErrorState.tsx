import ErrorIcon from "@mui/icons-material/Error";
import Refresh from "@mui/icons-material/Refresh";

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "Unable to load data",
    message,
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ErrorIcon className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-red-900">{title}</h3>
            <p className="text-xs text-red-700 mt-1 max-w-sm mx-auto leading-relaxed">
                {message}
            </p>

            {onRetry && (
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
                    >
                        <Refresh className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default ErrorState;
