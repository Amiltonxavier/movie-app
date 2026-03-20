import { Outlet } from "react-router-dom";
import { Nav } from "../../components/nav";


export function AppLayout() {
    return (
        <div className="flex flex-col max-w-auto w-full min-h-screen bg-gradient-to-b from-black to-slate-950 text-white">
            <Nav />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}
