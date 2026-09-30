import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative mx-auto my-8 w-full max-w-xl">
            <div className="relative flex items-center">
                {/* Search Icon */}
                <Search className="absolute left-4 h-5 w-5 text-gray-400" />

                {/* Input Field */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies or TV shows..."
                    className="w-full rounded-xl border border-brand-border bg-brand-surface py-3.5 pl-11 pr-10 text-sm text-white placeholder-gray-400 shadow-md transition-all focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
                    aria-label="Search movies or TV shows"
                />

                {/* Clear Button */}
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3.5 rounded-full p-1 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear search input"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;