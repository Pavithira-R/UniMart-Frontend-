interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="mt-8 w-full max-w-xl">
            <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 focus-within:border-blue-500 transition-colors">
                <span className="pl-5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                    </svg>
                </span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for books, laptops, locations..."
                    className="flex-1 px-4 py-4 outline-none text-gray-700 placeholder-gray-400 font-medium"
                />
                {value && (
                    <button 
                        onClick={() => onChange("")} 
                        className="text-gray-400 hover:text-gray-600 px-4 py-4 transition font-bold"
                        title="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;