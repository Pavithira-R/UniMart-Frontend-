import SearchBar from "./SearchBar";
import Stats from "./Stats";

interface HeroProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
}

function Hero({ searchQuery, onSearchChange }: HeroProps) {
    const handleBrowseClick = () => {
        const element = document.getElementById("featured-products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="text-center">

                    <h1 className="text-6xl font-bold">
                        Buy & Sell
                        <br />
                        Within Your University
                    </h1>

                    <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
                        UniMart helps students buy and sell books,
                        electronics, furniture and much more
                        in a safe university marketplace.
                    </p>

                    <div className="flex justify-center">
                        <SearchBar value={searchQuery} onChange={onSearchChange} />
                    </div>

                    <div className="mt-8 flex justify-center gap-4">

                        <button 
                            onClick={handleBrowseClick}
                            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
                        >
                            Browse Products
                        </button>

                        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition cursor-pointer">
                            Sell an Item
                        </button>

                    </div>

                </div>

                <Stats />

            </div>
        </section>
    );
}

export default Hero;