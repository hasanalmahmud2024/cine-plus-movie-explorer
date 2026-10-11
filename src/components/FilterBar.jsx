const MOVIE_GENRES = [
    { id: 'all', name: 'All Genres' },
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' },
    { id: 10770, name: 'TV Movie' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
];

const TV_GENRES = [
    { id: 'all', name: 'All Genres' },
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
    { id: 53, name: 'Thriller' },
    { id: 10762, name: 'Kids' },
];

const getGenreOptions = (mediaType) => (mediaType === 'tv' ? TV_GENRES : MOVIE_GENRES);

const SORT_OPTIONS = [
    { id: 'popularity.desc', name: 'Most Popular' },
    { id: 'primary_release_date.desc', name: 'Release Date (Newest)' },
    { id: 'vote_average.desc', name: 'Highest Rated' },
    { id: 'vote_count.desc', name: 'Most Voted' },
];

const LANGUAGES = [
    { id: 'all', name: 'All Languages' },
    { id: 'en', name: 'English' },
    { id: 'es', name: 'Spanish' },
    { id: 'fr', name: 'French' },
    { id: 'ja', name: 'Japanese' },
    { id: 'ko', name: 'Korean' },
    { id: 'hi', name: 'Hindi' },
];

const FilterBar = ({ filters, onFilterChange }) => {
    const selectClassName =
        'w-full appearance-none rounded-lg border border-brand-border/80 bg-brand-surface px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:border-brand-accent/70 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/25';

    const optionClassName = 'bg-brand-surface text-white';

    const labelClassName =
        'mb-0.5 block text-[9px] font-bold uppercase tracking-wide text-brand-accent';

    const genreOptions = getGenreOptions(filters.mediaType);
    const currentGenreValue = genreOptions.some((g) => String(g.id) === String(filters.genre))
        ? filters.genre
        : 'all';

    return (
        <div className="mx-auto mb-4 max-w-5xl rounded-xl border border-brand-accent/25 bg-linear-to-br from-brand-surface to-indigo-950/30 p-2 shadow-md">
            <div className="grid grid-cols-4 gap-x-2 gap-y-1.5">
                <div>
                    <label className={labelClassName}>Format</label>
                    <select
                        value={filters.mediaType}
                        onChange={(e) => onFilterChange('mediaType', e.target.value)}
                        className={selectClassName}
                    >
                        {['movie', 'tv'].map((m) => (
                            <option key={m} className={optionClassName} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Genre Dropdown */}
                <div>
                    <label className={labelClassName}>Genre</label>
                    <select
                        value={currentGenreValue}
                        onChange={(e) => onFilterChange('genre', e.target.value)}
                        className={selectClassName}
                    >
                        {genreOptions.map((g) => (
                            <option key={g.id} className={optionClassName} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By Dropdown */}
                <div>
                    <label className={labelClassName}>Sort By</label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => onFilterChange('sortBy', e.target.value)}
                        className={selectClassName}
                    >
                        {SORT_OPTIONS.map((s) => (
                            <option key={s.id} className={optionClassName} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Language Dropdown */}
                <div>
                    <label className={labelClassName}>Language</label>
                    <select
                        value={filters.language}
                        onChange={(e) => onFilterChange('language', e.target.value)}
                        className={selectClassName}
                    >
                        {LANGUAGES.map((l) => (
                            <option key={l.id} className={optionClassName} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;