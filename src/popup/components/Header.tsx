import { Settings } from "lucide-react";
import Logo from "../assets/logo.svg";

export const Header = () => {
    return (
        <div className="px-3 py-4 border-b-2 border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img 
                 src={Logo} 
                 alt="logo"
                 className="w-6 h-6"
                />
                <h1 className="text-xl font-bold tracking-wide font-sans">ContentScope</h1>
            </div>

            <button>
                <Settings size={22} />
            </button>
        </div>
    )
}