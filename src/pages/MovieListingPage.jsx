import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import mockMovies from '../utils/MockData';


const MovieListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter mock movies based on input query
  const filteredMovies = mockMovies.filter((item) => {
    const title = item.title || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSeeDetails = (movie) => {
    console.log('Selected movie for modal:', movie);
  };

  return (
    <div className="mx-auto max-w-375 px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold text-white">
        Explore Movies & TV Shows
      </h2>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


      {filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} onSeeDetails={handleSeeDetails} />
      ) : (
        <div className="py-12 text-center text-gray-400">
          <p className="text-lg">No movies or TV shows found for "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};

export default MovieListingPage;