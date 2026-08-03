import { Timer } from "lucide-react"

export const FocusModeCard = () => {
    return (
        <div className="mx-2 my-4 px-4 py-2 bg-zinc-800 rounded-2xl">
            <div>
                <span>
                    <Timer />
                    Focus Mode
                </span>
                <span>
                    Block distracting sites while working
                </span>
            </div>
            
        </div>
    )
}