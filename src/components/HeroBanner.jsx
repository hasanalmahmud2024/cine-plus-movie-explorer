import { Link } from 'react-router';
import { ArrowRight, Clapperboard } from 'lucide-react';

const HeroBanner = () => {
    return (
        <section className="relative overflow-hidden bg-brand-dark py-20 sm:py-28 lg:py-32">
            {/* Decorative background glow */}
            <div
                className="absolute left-1/2 top-0 z-0 h-75 w-150 -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                {/* Subtitle Badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent backdrop-blur-md">
                    <Clapperboard size={16} aria-hidden="true" />
                    Welcome to CinePulse
                </span>

                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Discover your next <br className="hidden sm:inline" />
                    <span className="uppercase bg-linear-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        favorite movie
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
                    Explore thousands of movies and TV shows from around the world. Search titles, check ratings, and dive into detailed cinema metadata in seconds.
                </p>

                {/* Primary call to action */}
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        to="/movies"
                        className="group inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-600/30 transition-all hover:bg-brand-primary-hover hover:shadow-sky-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-95"
                    >
                        Explore Now
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;