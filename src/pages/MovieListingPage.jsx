import { useEffect, useRef, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { fetchDiscoverMovies, searchMedia } from '../services/tmdbApi';

// Use the same fetch logic for the first page and later pages.
const fetchTitles = (searchTerm, page) => {
  const query = searchTerm.trim();
  return query ? searchMedia(query, page) : fetchDiscoverMovies(page);
};

const MovieListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreError, setLoadMoreError] = useState('');
  const currentSearch = useRef('');

  useEffect(() => {
    let cancelled = false;

    const loadMovies = async () => {
      try {
        const results = await fetchTitles(searchTerm, 1);

        // Ignore results if this search was replaced.
        if (!cancelled) setMovies(results);
      } catch (error) {
        console.error('Failed to load titles:', error);
        if (!cancelled) {
          setMovies([]);
          setError('Unable to load titles. Please try again.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  const handleSearchChange = (value) => {
    currentSearch.current = value;
    setSearchTerm(value);
    setMovies([]);
    setPage(1);
    setIsLoading(true);
    setIsLoadingMore(false);
    setError('');
    setLoadMoreError('');
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    const search = searchTerm;
    const nextPage = page + 1;
    setIsLoadingMore(true);
    setLoadMoreError('');

    try {
      const results = await fetchTitles(search, nextPage);

      // Don't add results from a search that has since changed.
      if (currentSearch.current === search) {
        setMovies((currentMovies) => [...currentMovies, ...results]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to load more titles:', error);
      if (currentSearch.current === search) {
        setLoadMoreError('Unable to load more titles. Please try again.');
      }
    } finally {
      if (currentSearch.current === search) {
        setIsLoadingMore(false);
      }
    }
  };

  return (
    <div className="mx-auto max-w-375 px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Explore Movies &amp; TV
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Browse popular movies or search for movies and TV shows.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
      />

      {isLoading ? (
        <div className="py-20 text-center font-medium text-brand-accent">
          Loading titles...
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-400" role="alert">
          {error}
        </div>
      ) : movies.length > 0 ? (
        <>
          <MovieGrid
            movies={movies}
            onSeeDetails={setSelectedMovie}
          />

          <div className="mt-12 flex flex-col items-center gap-3">
            {loadMoreError && (
              <p className="text-sm text-red-400" role="alert">
                {loadMoreError}
              </p>
            )}
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="cursor-pointer rounded-xl border border-brand-border bg-brand-surface px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:border-brand-accent hover:bg-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </>
      ) : (
        <div className="py-12 text-center text-gray-400">
          <p className="text-lg">
            No titles found for &quot;{searchTerm}&quot;.
          </p>
        </div>
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default MovieListingPage;