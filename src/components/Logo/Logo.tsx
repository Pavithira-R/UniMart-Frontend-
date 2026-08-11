function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                U
            </div>

            <div>
                <h1 className="text-2xl font-bold text-blue-600">
                    UniMart
                </h1>

                <p className="text-xs text-gray-500">
                    Student Marketplace
                </p>
            </div>
        </div>
    );
}

export default Logo;