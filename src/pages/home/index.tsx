import { useNavigate } from "react-router-dom";
import { Trending } from '../../components/trending'
import { AllMovie } from './components/all-movie'
import { Hero } from './components/hero'
import { CONSTANTS } from '../../constants'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col h-full'>
            <Hero />
            <div className='flex-1'>
                <Trending />
                <AllMovie />
                <div className="px-8 mb-12 flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate(CONSTANTS.ROUTERS.movies)}
                        className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-full font-medium transition"
                    >
                        Ver mais
                    </button>
                </div>
            </div>
        </div>
    )
}