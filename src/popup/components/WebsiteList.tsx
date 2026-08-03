import { Globe, SquareArrowOutUpRight, Trash2 } from "lucide-react"
import { ProgressBar } from "../ui/ProgressBar"
import { useEffect, useState } from "react"

type SiteData = {
    domain: string;
    duration: number;
}

export const WebsiteList = () => {
    const [topSites, setTopSites] = useState<SiteData[]>([]);

    useEffect(() => {
        chrome.storage.local.get("timeData", (data) => {
            console.log("data:", data);

            const sites = data.timeData || {};

            console.log("Sites:", sites);

            const formatted: SiteData[] = Object.entries(sites).map(([domain, time]) => ({
                domain: domain,
                duration: Number(time)
            }));

            setTopSites(formatted);
        });
    }, []);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }

        return `${minutes}m`;
    }

    const formatSiteName = (domain: string) => {
        
        // www.youtube.com ---> youtube
        const cleaned = domain
        .replace("www.", "")
        .replace(".com", "")
        .replace(".org", "")
        .replace(".in", "")
        .replace("web.", "");

        // youtube ---> Youtube
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    const deleteSite = async (domain: string) => {
        console.log("Domain to be deleted:", domain);

        const data = await chrome.storage.local.get("timeData");
        console.log("data:", data);
        const updated = { ...data.timeData };
        delete updated[domain];

        await chrome.storage.local.set({
            timeData: updated,
        });

        setTopSites((prev) => prev.filter(site =>
            site.domain !== domain
        ));
    }

    return (
        <div className="mx-3 my-4 px-4 py-3 space-y-3 rounded-2xl border-2 border-neutral-800 bg-zinc-900">
            <div className="flex items-center justify-between">
                <h2 className="uppercase text-xl font-semibold">top destinations</h2>
                <SquareArrowOutUpRight size={18} />
            </div>
            {
                topSites.length === 0 
                ? (
                    <p className="text-sm text-zinc-500">
                        No activity tracked yet
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {
                            topSites.map((site) => (
                                <li key={site.domain} className="space-y-2">
                                    <div className="text-lg flex items-center justify-between">
                                        <span className="flex items-center gap-1">
                                            <Globe size={18} />
                                            {formatSiteName(site.domain)}
                                        </span>
                                        <div className="flex items-center gap-5">
                                            <span className="font-mono">{formatTime(site.duration)}</span>
                                            <button 
                                            onClick={() => deleteSite(site.domain)}
                                            className="cursor-pointer text-neutral-500 hover:text-neutral-400">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <ProgressBar />
                                </li>       
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}