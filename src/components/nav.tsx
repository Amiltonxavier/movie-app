import { Search } from 'lucide-react'
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { CONSTANTS } from '../constants';

export function Nav() {
    const [searchParams, setSearchParams] = React.useState('');
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
    }

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 px-8 py-3  flex items-center justify-between">
            <div className="flex items-center gap-8">
                <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                <nav className="hidden md:flex gap-6">
                    <Link to={CONSTANTS.ROUTERS.home} className={`hover:text-purple-400 transition text-sm ${isActive('/') ? 'text-purple-400 font-medium' : 'text-white'}`}>
                        Início
                    </Link>
                    <Link to={CONSTANTS.ROUTERS.movies} className={`hover:text-purple-400 transition text-sm ${isActive('/movies') ? 'text-purple-400 font-medium' : 'text-white'}`}>
                        Filmes
                    </Link>

                    <Link to={CONSTANTS.ROUTERS.series} className={`hover:text-purple-400 transition text-sm ${isActive('/series') ? 'text-purple-400 font-medium' : 'text-white'}`}>
                        Séries
                    </Link>
                    <Link to={CONSTANTS.ROUTERS.upcoming} className={`hover:text-purple-400 transition text-sm ${isActive('/upcoming') ? 'text-purple-400 font-medium' : 'text-white'}`}>
                        Em Breve
                    </Link>
                    <Link to={CONSTANTS.ROUTERS.search} className={`hover:text-purple-400 transition text-sm ${isActive('/search') ? 'text-purple-400 font-medium' : 'text-white'}`}>
                        Busca
                    </Link>
                    <Link to={CONSTANTS.ROUTERS.watchlist} className={`hover:text-purple-400 transition text-sm ${isActive('/watchlist') ? 'text-purple-400 font-medium' : 'text-white'}`}>
                        Minha Lista
                    </Link>
                </nav>
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder="Pesquise entre milhares de filmes"
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    className="bg-slate-800/70 rounded-full py-2 pl-10 pr-4 w-[300px] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                <button type="submit" className="absolute left-3 top-2.5">
                    <Search className="text-slate-400 w-4 h-4" />
                </button>
            </form>
        </header>
    );
}
