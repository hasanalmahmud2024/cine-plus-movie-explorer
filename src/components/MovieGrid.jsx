import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onSeeDetails }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 min-[900px]:grid-cols-5 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSeeDetails={onSeeDetails}
                />
            ))}
        </div>
    );
};

export default MovieGrid;