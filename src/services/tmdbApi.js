import normalizeMedia from '../utils/normalizeMedia';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = (
    import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
).replace(/\/$/, '');


// Fetch daily trending movies & TV shows for the Home Page
export const fetchTrending = async () => {
    const results = await fetchResults('trending/all/day');

    return results
        .filter((item) => item.media_type !== 'person')
        .map((item) => normalizeMedia(item));
};


// Let page components handle API failures so they can show an error state.
const fetchResults = async (endpoint, params = {}) => {
    if (!API_KEY) {
        throw new Error('Missing TMDB API key. Set VITE_TMDB_API_KEY in your environment.');
    }

    const searchParams = new URLSearchParams({
        api_key: API_KEY,
        ...params,
    });
    const response = await fetch(`${BASE_URL}/${endpoint}?${searchParams}`);

    if (!response.ok) {
        throw new Error(`TMDB request failed with status ${response.status}.`);
    }

    const data = await response.json();
    return data.results || [];
};

// Fetch popular movies for the catalog and its subsequent pages.
export const fetchDiscoverMovies = async (page = 1) => {
    const results = await fetchResults('discover/movie', {
        sort_by: 'popularity.desc',
        page: String(page),
    });

    return results.map((item) =>
        normalizeMedia({ ...item, media_type: 'movie' })
    );
};

// Search movies and TV shows; TMDB multi-search also returns people.
export const searchMedia = async (query, page = 1) => {
    const trimmedQuery = query?.trim();

    if (!trimmedQuery) {
        return fetchDiscoverMovies(page);
    }

    const results = await fetchResults('search/multi', {
        query: trimmedQuery,
        page: String(page),
    });

    return results
        .filter((item) => item.media_type !== 'person')
        .map(normalizeMedia);
};