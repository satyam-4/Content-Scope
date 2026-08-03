// extract video details
function getVideoDetails() {
    const title = document.querySelector('h1.title')?.textContent?.trim() ||
                    document.querySelector('h1.ytd-watch-metadata')?.textContent?.trim();

    const channel = document.querySelector('#text-container yt-formatted-string')?.textContent?.trim();
    const url = window.location.href;

    if (title && channel) {
        return { title, channel, url, timestamp: Date.now() };
    }
    return null;
}

// send video details to background script
function sendVideoDetails() {
    const details = getVideoDetails();
    if (details) {
        chrome.runtime.sendMessage({ type: "VIDEO_WATCHED", data: details });
    }
}

let lastUrl = location.href;

setInterval(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        setTimeout(sendVideoDetails, 2000); 
    }
}, 1000);

window.addEventListener("DOMContentLoaded", () => {
setTimeout(sendVideoDetails, 2000);
});