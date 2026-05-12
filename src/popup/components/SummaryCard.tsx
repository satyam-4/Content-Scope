import { ArrowDown } from "lucide-react"
import { CircularProgress } from "../ui/CircularProgress"

export const SummaryCard = () => {
    return (
        <div className="mx-3 my-4 px-4 py-2 font-sans border-2 border-neutral-800 bg-zinc-900 rounded-2xl flex items-center justify-between">
            <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-neutral-400 text-[15px]">Today's Screen Time</span>
                <span className="text-5xl font-bold ">
                   4h 12m 
                </span>
                <div className="flex items-center gap-2 text-[15px] text-sky-300/80">
                   <ArrowDown size={18} />
                    <span>
                        12% lower than yesterday
                    </span>
                </div>
            </div>
            <div>
                <CircularProgress />
            </div>
        </div>
    )
}