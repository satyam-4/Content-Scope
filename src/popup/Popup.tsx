import { Header } from "./components/Header";
import { SummaryCard } from "./components/SummaryCard";
import { AnalyticsCards } from "./components/AnalyticsCards";
import { WebsiteList } from "./components/WebsiteList";
// import { FocusModeCard } from "./components/FocusModeCard";
// import { ActionButtons } from "./components/ActionButtons";

const Popup = () => {
    return (
        <div className="bg-[#18181b] overflow-hidden w-[480px] text-white font-sans">
            <Header />
            <SummaryCard />
            <AnalyticsCards />
            <WebsiteList />
            {/* <FocusModeCard /> */}
            {/* <ActionButtons /> */}
        </div>
    );
};

export default Popup;