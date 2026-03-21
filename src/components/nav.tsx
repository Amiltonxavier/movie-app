import { Search, Menu, X } from 'lucide-react'
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { CONSTANTS } from '../constants';

export function Nav() {
    const [searchParams, setSearchParams] = React.useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const query = searchParams.trim();
        if (!query) return;

        navigate(`${CONSTANTS.ROUTERS.search}?q=${encodeURIComponent(query)}`);
        setMobileMenuOpen(false);
    }

    const navLinks = [
        { to: CONSTANTS.ROUTERS.home, label: 'Início' },
        { to: CONSTANTS.ROUTERS.movies, label: 'Filmes' },
        { to: CONSTANTS.ROUTERS.series, label: 'Séries' },
        { to: CONSTANTS.ROUTERS.upcoming, label: 'Em Breve' },
        { to: CONSTANTS.ROUTERS.search, label: 'Busca' },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 px-4 md:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">

                <Link
                    to={"/"}
                >
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12" />
                </Link>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white hover:text-purple-400 transition"
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                <nav className="hidden md:flex gap-6">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`hover:text-purple-400 transition text-sm ${isActive(link.to) ? 'text-purple-400 font-medium' : 'text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchParams}
                        onChange={(e) => setSearchParams(e.target.value)}
                        className="bg-slate-800/70 rounded-full py-2 pl-9 md:pl-10 pr-3 md:pr-4 w-48 md:w-[300px] focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-sm"
                    />
                    <button type="submit" className="absolute left-3 top-2.5 md:top-2.5">
                        <Search className="text-slate-400 w-4 h-4" />
                    </button>
                </form>
            </div>

            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md md:hidden border-t border-slate-800">
                    <nav className="flex flex-col p-4 gap-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-4 py-3 rounded-lg hover:bg-slate-800 transition text-sm ${isActive(link.to) ? 'text-purple-400 font-medium bg-slate-800/50' : 'text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
