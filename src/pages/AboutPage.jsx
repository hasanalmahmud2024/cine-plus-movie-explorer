import { Link } from 'react-router';

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-gray-300 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <header className="border-b border-brand-border pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
          Project Overview & System Architecture
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          ABOUT CINEPULSE
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm italic text-gray-400">
          "A streamlined movie and television exploration interface designed for clarity, performance, and immediate metadata access."
        </p>
      </header>

      {/* Main Content: Two Column Layout */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Descriptive Content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white border-b border-brand-border pb-2 uppercase tracking-wide">
              1. The Mission
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              CinePulse was built to simplify how cinema enthusiasts search for and discover media. By stripping away heavy UI abstractions and bloated navigation patterns, the application delivers direct access to global media catalogs in real time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white border-b border-brand-border pb-2 uppercase tracking-wide">
              2. Core Principles
            </h2>
            <ul className="mt-4 list-disc pl-5 text-sm leading-relaxed space-y-2 text-gray-300">
              <li>
                <strong className="text-white">Direct Data Ingestion:</strong> Displays TMDB payloads directly within UI components for fast, predictable rendering.
              </li>
              <li>
                <strong className="text-white">Debounced Search:</strong> Minimizes network strain by executing API queries only after user input pauses.
              </li>
              <li>
                <strong className="text-white">Fluid Responsiveness:</strong> Adapts layout dynamically from mobile devices up to ultra-wide desktop monitors.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white border-b border-brand-border pb-2 uppercase tracking-wide">
              3. Acknowledgments
            </h2>
            <blockquote className="mt-4 border-l-2 border-brand-accent pl-4 text-xs italic text-gray-400">
              This product uses the TMDB API but is not endorsed or certified by TMDB. All movie images, ratings, and plot details are sourced directly from The Movie Database.
            </blockquote>
          </section>
        </div>

        {/* Right Column: Specification Sidebar */}
        <aside className="border-t border-brand-border pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-4">
            Technical Index
          </h2>

          <dl className="space-y-4 text-xs">
            <div className="border-b border-brand-border/60 pb-2">
              <dt className="text-gray-400 uppercase font-medium">Framework</dt>
              <dd className="mt-1 font-semibold text-white">React 19 + Vite</dd>
            </div>

            <div className="border-b border-brand-border/60 pb-2">
              <dt className="text-gray-400 uppercase font-medium">Styling Engine</dt>
              <dd className="mt-1 font-semibold text-white">Tailwind CSS v4</dd>
            </div>

            <div className="border-b border-brand-border/60 pb-2">
              <dt className="text-gray-400 uppercase font-medium">Routing</dt>
              <dd className="mt-1 font-semibold text-white">React Router v7</dd>
            </div>

            <div className="border-b border-brand-border/60 pb-2">
              <dt className="text-gray-400 uppercase font-medium">Data Source</dt>
              <dd className="mt-1 font-semibold text-white">TMDB REST API v3</dd>
            </div>

            <div className="border-b border-brand-border/60 pb-2">
              <dt className="text-gray-400 uppercase font-medium">Icon Set</dt>
              <dd className="mt-1 font-semibold text-white">Lucide React</dd>
            </div>
          </dl>

          <div className="mt-8 pt-4 border-t border-brand-border">
            <Link
              to="/movies"
              className="block w-full text-center rounded-lg border border-brand-accent py-2 text-xs font-bold uppercase text-brand-accent hover:bg-brand-accent hover:text-black transition-colors"
            >
              Back to Catalog
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AboutPage;