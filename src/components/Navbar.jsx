import { Link, NavLink } from 'react-router';
import Logo from './Logo';

const Navbar = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Brand Logo Link */}
                <Link to="/" className="transition-opacity hover:opacity-90">
                    <Logo />
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `text-sm font-semibold transition-colors ${isActive ? 'text-sky-400' : 'text-gray-300 hover:text-white'}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/movies"
                        className={({ isActive }) =>
                            `rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-500 active:bg-sky-700 ${isActive ? 'ring-2 ring-sky-300 ring-offset-2 ring-offset-gray-950' : ''
                            }`
                        }
                    >
                        Explore Movies
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;