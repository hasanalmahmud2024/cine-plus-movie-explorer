import { useEffect } from 'react';
import {
    X,
    Star,
    Calendar,
    Film,
    Globe,
    Users,
    ShieldAlert,
    TrendingUp,
} from 'lucide-react';

const MovieModal = ({ movie, onClose }) => {
    useEffect(() => {
        if (!movie) return;

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [movie, onClose]);

    if (!movie) return null;

    const title = movie.title || 'Untitled';
    const releaseDate = movie.release_date || 'N/A';
    const rating = Number.isFinite(movie.vote_average)
        ? movie.vote_average.toFixed(1)
        : 'N/A';
    const voteCount = movie.vote_count ?? 0;
    const language = movie.language || 'N/A';
    const mediaType = movie.media_type || 'movie';
    const genres = movie.genres || [];
    const backdropUrl = movie.backdrop_path || movie.poster_path;
    const originalTitle = movie.original_title || movie.original_name;
    const popularity = Number.isFinite(movie.popularity)
        ? Math.round(movie.popularity)
        : null;
    const isAdult = movie.adult === true;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-modal-title"
        >
            <div
                className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-brand-border bg-brand-surface text-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-gray-300 transition-colors hover:bg-black hover:text-white"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Backdrop Banner Header Image */}
                <div className="relative h-72 w-full overflow-hidden bg-gray-900 sm:h-96">
                    <img
                        src={backdropUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-surface via-brand-surface/40 to-transparent" />
                </div>

                {/* Content Body */}
                <div className="relative z-10 -mt-24 p-6 pt-0 sm:p-8 sm:pt-0">
                    <h2
                        id="movie-modal-title"
                        className="text-2xl font-extrabold text-white sm:text-3xl"
                    >
                        {title}
                    </h2>

                    {originalTitle && originalTitle !== title && (
                        <p className="mt-0.5 text-xs italic text-gray-400">
                            Original: {originalTitle}
                        </p>
                    )}

                    {isAdult && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded border border-red-800 bg-red-950 px-2.5 py-1 text-xs font-bold text-red-400">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            18+
                        </span>
                    )}

                    {/* Genre Badges */}
                    {genres.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="rounded-full bg-brand-border px-3 py-1 text-xs font-medium text-gray-300"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Key Details Metadata Grid */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-300 sm:text-sm">
                        <span className="flex items-center gap-1 font-semibold text-brand-star">
                            <Star className="h-4 w-4 fill-brand-star text-brand-star" />
                            {rating}
                        </span>

                        <span className="flex items-center gap-1 text-gray-400">
                            <Users className="h-4 w-4" />
                            {voteCount} votes
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {releaseDate}
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            Lang: {language}
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-1 rounded border border-sky-800 bg-sky-950 px-2 py-0.5 text-xs font-semibold uppercase text-brand-accent">
                            <Film className="h-3 w-3" />
                            {mediaType}
                        </span>

                        {popularity !== null && (
                            <span className="flex items-center gap-1 text-gray-400">
                                <TrendingUp className="h-4 w-4" />
                                Popularity #{popularity}
                            </span>
                        )}
                    </div>

                    {/* Overview Section */}
                    <div className="mt-6 border-t border-brand-border pt-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Overview
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">
                            {movie.overview || 'No description available for this title.'}
                        </p>
                    </div>

                    {/* Close Action Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-lg bg-red-600/90 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;