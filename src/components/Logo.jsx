const Logo = () => {
    return (
        <div className="flex items-center gap-2.5">
            {/* SVG Logo Icon */}
            <img
                src="/favicon.svg"
                alt="CinePulse Logo"
                className="h-9 w-9 transition-transform duration-300 hover:scale-105"
            />
            {/* Brand Name */}
            <span className="text-xl font-extrabold tracking-tight text-white">
                Cine<span className="text-sky-400">Pulse</span>
            </span>
        </div>
    );
};
export default Logo;