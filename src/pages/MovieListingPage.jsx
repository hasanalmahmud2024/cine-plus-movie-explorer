import { useEffect, useRef, useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { fetchDiscoverMovies, searchMedia } from '../services/tmdbApi';
import useDebounce from '../hooks/useDebounce';

const fetchTitles = (searchTerm, filters, page) => {
  const query = searchTerm.trim();
  return query
    ? searchMedia(query, page, filters)
    : fetchDiscoverMovies(page, filters);
};

const MovieListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Unified filter state
  const [filters, setFilters] = useState({
    genre: 'all',
    sortBy: 'popularity.desc',
    language: 'all',
    mediaType: 'movie',
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreError, setLoadMoreError] = useState('');
  const currentSearch = useRef('');
  const requestVersion = useRef(0);

  // Re-fetch when debounced search OR any filter dropdown changes
  useEffect(() => {
    let cancelled = false;
    const version = ++requestVersion.current;

    const loadMovies = async () => {
      setIsLoading(true);
      setError('');
      try {
        const results = await fetchTitles(debouncedSearchTerm, filters, 1);
        if (!cancelled && version === requestVersion.current) setMovies(results);
      } catch (err) {
        console.error('Failed to load titles:', err);
        if (!cancelled && version === requestVersion.current) {
          setMovies([]);
          setError('Unable to load titles. Please try again.');
        }
      } finally {
        if (!cancelled && version === requestVersion.current) setIsLoading(false);
      }
    };

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, filters]);

  const handleSearchChange = (value) => {
    currentSearch.current = value;
    setSearchTerm(value);
    setPage(1);
    setIsLoading(true);
    setIsLoadingMore(false);
    setError('');
    setLoadMoreError('');
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => {
      const nextFilters = { ...prev, [filterKey]: value };
      if (filterKey === 'mediaType') {
        nextFilters.genre = 'all';
      }
      return nextFilters;
    });
    setPage(1);
    setIsLoading(true);
    setError('');
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    const search = debouncedSearchTerm;
    const nextPage = page + 1;
    const requestId = ++requestVersion.current;
    setIsLoadingMore(true);
    setLoadMoreError('');

    try {
      const results = await fetchTitles(search, filters, nextPage);

      // Ignore stale responses from earlier searches or filter changes.
      if (currentSearch.current === search && requestId === requestVersion.current) {
        setMovies((currentMovies) => [...currentMovies, ...results]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error('Failed to load more titles:', err);
      if (currentSearch.current === search && requestId === requestVersion.current) {
        setLoadMoreError('Unable to load more titles. Please try again.');
      }
    } finally {
      if (currentSearch.current === search && requestId === requestVersion.current) {
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

      {/* Filter Bar Controls */}
      {!searchTerm.trim() ? (
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      ) : (
        <p className="mb-6 text-center text-xs text-gray-400 italic">
          Showing search results for "{searchTerm}"
        </p>
      )}

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
            No titles found matching your current filter choices.
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