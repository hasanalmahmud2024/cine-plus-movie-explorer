import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Flame, ArrowRight } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { fetchTrending } from '../services/tmdbApi';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadTrending = async () => {
      try {
        const results = await fetchTrending();
        if (!cancelled) {
          // Display top 12 trending items on the home page
          setTrending(results.slice(0, 12));
        }
      } catch (err) {
        console.error('Failed to load trending items:', err);
        if (!cancelled) {
          setError('Unable to load trending titles right now.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadTrending();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <HeroBanner />

      {/* Trending Section */}
      <section className="mx-auto max-w-375 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-brand-accent">
              <Flame className="h-5 w-5 fill-brand-accent text-brand-accent" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Trending Today
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
              Popular Across Cinema
            </h2>
          </div>

          <Link
            to="/movies"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-white transition-colors"
          >
            Explore All Catalog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content States */}
        {isLoading ? (
          <div className="py-20 text-center font-medium text-brand-accent">
            Loading trending titles...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-400" role="alert">
            {error}
          </div>
        ) : (
          <MovieGrid
            movies={trending}
            onSeeDetails={setSelectedMovie}
          />
        )}
      </section>

      {/* Details Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default HomePage;