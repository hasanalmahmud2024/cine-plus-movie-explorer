import { CalendarDays, Star } from 'lucide-react';

const MovieCard = ({ movie, onSeeDetails }) => {
    const title = movie.title || 'Untitled';

    // TMDB dates start with the four-digit release year.
    const releaseYear = (movie.release_date || '').slice(0, 4) || 'N/A';

    // Unrated titles are normalized to null, so display a fallback.
    const rating = Number.isFinite(movie.vote_average)
        ? movie.vote_average.toFixed(1)
        : 'N/A';

    return (
        <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-2 hover:border-brand-accent hover:shadow-lg hover:shadow-sky-500/20">
            <div className="aspect-2/3 w-full overflow-hidden bg-gray-900">
                <img
                    src={movie.poster_path}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Details Section */}
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <h3 className="truncate text-base font-bold text-white transition-colors group-hover:text-brand-accent">
                        {title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1 font-semibold text-brand-star">
                            <Star aria-hidden="true" className="h-3 w-3" />
                            {rating}
                        </span>
                        <span className="flex items-center gap-1">
                            <CalendarDays aria-hidden="true" className="h-3 w-3" />
                            {releaseYear}
                        </span>
                    </div>
                </div>

                {/* Details Button */}
                <button
                    onClick={() => onSeeDetails(movie)}
                    className="mt-4 w-full rounded-lg bg-brand-primary py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                >
                    See Details
                </button>
            </div>
        </div>
    );
};

export default MovieCard;