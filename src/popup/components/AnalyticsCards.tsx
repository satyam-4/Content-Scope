const analyticsData = [
    {
        label: "productive",
        value: "3h 05m",
        labelColor: "text-green-500"
    },
    {
        label: "distracting",
        value: "45m",
        labelColor: "text-orange-500"
    },
    {
        label: "focus score",
        value: "84",
        labelColor: "text-sky-300"
    },
]

export const AnalyticsCards = () => {
    
    return (
        <div className="mx-3 my-4 flex items-center gap-3">
            {
                analyticsData.map((data) => (
                    <div className="py-2 flex-1 flex flex-col border-2 border-neutral-800 bg-zinc-900 rounded-2xl text-lg text-center">
                        <span className={`${data.labelColor} tracking-wider`}>
                            {data.label.toUpperCase()}
                        </span>
                        <span className="font-semibold font-mono text-xl tracking-wide">
                            {data.value}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}