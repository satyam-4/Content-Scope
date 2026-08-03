export const ProgressBar = () => {
    const progress = 75;
    return (
        <div className="w-full h-2 bg-neutral-700 rounded-2xl overflow-hidden">
            <div style={{ width: `${progress}%`}} className="h-full bg-green-500 rounded-2xl" />
        </div>
    )
}