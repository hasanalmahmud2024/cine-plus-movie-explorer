const MovieCard = ({ movie, onSeeDetails }) => {
    // Extract values, fallbacking between Movie and TV properties
    const title = movie.title || "Untitled";
    const releaseYear = (movie.release_date || movie.first_air_date || "").slice(0, 4) || "N/A";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    const posterUrl = movie.poster_path;

    return (
        <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-brand-surface border border-brand-border shadow-md transition-all duration-300 hover:border-2 hover:border-brand-accent hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1">

            {/* Poster Image */}
            <div className="aspect-2/3 w-full overflow-hidden bg-gray-900">
                <img
                    src={posterUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Details Section */}
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <h3 className="text-base font-bold text-white truncate group-hover:text-brand-accent transition-colors">
                        {title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span className="text-brand-star font-semibold">
                            ⭐ {rating}
                        </span>
                        <span>📅 {releaseYear}</span>
                    </div>
                </div>

                {/* Details Button */}
                <button
                    onClick={() => onSeeDetails(movie)}
                    className="mt-4 w-full rounded-lg bg-brand-primary py-2 text-xs font-semibold text-white hover:bg-brand-primary-hover transition-colors"
                >
                    See Details
                </button>
            </div>

        </div>
    );
};

export default MovieCard;