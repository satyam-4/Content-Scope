import { Zap } from "lucide-react";

export const CircularProgress = () => {
    const progress = 65;

    const size = 100;
    const strokeWidth = 12;

    const radius = (size - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;

    // how much border should remain hidden 
    const strokeDashOffset = circumference - (circumference * (progress / 100));

    return (
        <div className="flex items-center justify-center relative w-[120px] h-[120px]">
            <svg
             width={size}
             height={size}
             className="-rotate-90"
            >   
                {/* Background ring */}
                <circle 
                 cx={size / 2}
                 cy={size / 2}
                 r={radius}
                 fill="transparent"
                 stroke="#27272a"
                 strokeWidth={strokeWidth}
                />

                {/* Progress ring */}
                <circle 
                 cx={size / 2}
                 cy={size / 2}
                 r={radius}
                 fill="transparent"
                 stroke="#4F8CFF"
                 strokeWidth={strokeWidth}
                 strokeLinecap="round"
                 strokeDasharray={circumference}
                 strokeDashoffset={strokeDashOffset}
                 className="transition-all duration-500 drop-shadow-[0_0_8px_rgba(79,140,255,0.7)]"
                />
            </svg>

            <div className="absolute flex items-center justify-center w-12 h-12">
                <Zap
                    size={28}
                    className="text-blue-300"
                    fill="currentColor"
                />
            </div>
        </div>
    )
}