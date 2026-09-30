import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/80 bg-gray-950 py-8 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">

        {/* Brand Copyright */}
        <p className="text-sm">
          © 2026 <span className="font-semibold text-white">CinePulse</span>. All rights reserved.
        </p>

        {/* Quick Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-sky-400 transition-colors">
            Home
          </Link>
          <Link to="/movies" className="hover:text-sky-400 transition-colors">
            Movies
          </Link>
          <Link to="/about" className="hover:text-sky-400 transition-colors">
            About
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;