import { getGenreNames } from './genres';

const normalizeMedia = (item) => {
    if (!item) return null;

    const isMovie = item.media_type === 'movie' || Boolean(item.title);
    const mediaType = item.media_type || (isMovie ? 'movie' : 'tv');
    const imageBase = import.meta.env.VITE_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';
    const fallbackPoster = 'https://via.placeholder.com/500x750?text=No+Poster+Available';

    const getImageUrl = (path, size) => {
        if (!path) return null;
        if (/^https?:\/\//i.test(path)) return path;

        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${imageBase}/${size}${normalizedPath}`;
    };

    const posterPath = getImageUrl(item.poster_path, 'w500') || fallbackPoster;
    const backdropPath =
        getImageUrl(item.backdrop_path, 'w1280') ||
        getImageUrl(item.poster_path, 'w500') ||
        fallbackPoster;

    return {
        id: item.id,
        media_type: mediaType,
        title: item.title || item.name || 'Untitled',
        original_title: item.original_title || item.original_name || '',
        overview: item.overview || 'No overview description available for this title.',
        vote_average: Number.isFinite(item.vote_average) ? item.vote_average : null,
        vote_count: item.vote_count ?? 0,
        popularity: Number.isFinite(item.popularity) ? item.popularity : null,
        adult: item.adult ?? false,
        language: (item.original_language || '').toUpperCase(),
        release_date: item.release_date || item.first_air_date || 'N/A',
        genres: getGenreNames(item.genre_ids),
        poster_path: posterPath,
        backdrop_path: backdropPath,
    };
};

export default normalizeMedia;