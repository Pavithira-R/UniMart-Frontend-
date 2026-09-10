interface LoadingStateProps {
    message?: string;
    rows?: number;
}

export function LoadingState({ message = "Loading data...", rows = 3 }: LoadingStateProps) {
    return (
        <div className="space-y-4 animate-pulse py-4">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-200 rounded-full animate-spin border-2 border-blue-600 border-t-transparent" />
                <span className="text-xs font-semibold text-gray-500">{message}</span>
            </div>
            <div className="space-y-3 pt-2">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-xl border border-gray-100" />
                ))}
            </div>
        </div>
    );
}

export default LoadingState;
