# CinePulse

CinePulse is a modern movie and TV discovery application built with React and Vite. It uses the TMDB API to surface trending titles, search across the catalog, and help users discover content by media type, genre, language, and sort preference.

## Features

- Trending titles on the home page
- Search across movies and TV shows
- Filter by media type, genre, language, and sort order
- Browse responsive catalog cards
- Detailed movie and TV metadata in a modal view
- Clean, dark-themed UI for a cinematic experience

## Tech Stack

- React
- Vite
- Tailwind CSS
- TMDB API
- React Router
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hasanalmahmud2024/cine-plus-movie-explorer.git
   ```

2. Navigate to the project folder:

   ```bash
   cd cine-plus-movie-explorer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_TMDB_API_KEY` | Your TMDB API key used to fetch movie and TV data |
| `VITE_TMDB_BASE_URL` | Optional TMDB API base URL override (defaults to `https://api.themoviedb.org/3`) |
| `VITE_TMDB_IMAGE_BASE` | Optional TMDB image base URL override |

## Project Structure

```text
src/
  components/      UI components
  hooks/           custom hooks
  pages/           route-level pages
  services/        TMDB API integration
  utils/           helpers, normalization, and mocked data
  App.jsx          application routing
  main.jsx         app bootstrap
```

## Usage

- Open the home page to see trending content.
- Visit the movie catalog to filter and browse titles.
- Use the search bar to find specific content.
- Select a card to view more details in the info modal.

## Attribution

This project uses the TMDB API but is not endorsed by or affiliated with TMDB.

## License

This project is intended for personal learning and portfolio use.
