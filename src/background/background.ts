// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed!");
//   chrome.storage.local.set({ interests: [] });
// });

// chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
//   if (message.type === "SAVE_INTEREST") {
//     chrome.storage.local.get("interests", (data) => {
//       const updated = [...(data.interests || []), message.payload];
//       chrome.storage.local.set({ interests: updated }, () => {
//         console.log("Interest saved:", message.payload);
//         sendResponse({ status: "ok" });
//       });
//     });
//     return true;
//   }

//   if (message.type === "GET_INTERESTS") {
//     chrome.storage.local.get("interests", (data) => {
//       sendResponse({ interests: data.interests || [] });
//     });
//     return true;
//   }
// });

let currentDomain: string | null = null;
let startTime = Date.now();

const getActiveTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  console.log("Tabs: ", tabs);
  return tabs[0];
}

const getDomain = (url?: string) => {
  if (!url) return null;

  try {
    return new URL(url).hostname;
  } catch (error) {
    return null;
  }
}

const saveTime = async (domain: string, duration: number) => {
  const data = await chrome.storage.local.get("timeData");

  const existing = data.timeData || {};

  existing[domain] = (existing[domain] || 0) + duration;

  await chrome.storage.local.set({
    timeData: existing,
  });

  console.log("Duration saved");
}

const trackActiveTab = async () => {
  console.log("trackActiveTab running");
  
  const tab = await getActiveTab();
  const domain = getDomain(tab.url);

  if (
    !domain ||
    tab.url?.startsWith("chrome://") ||
    tab.url?.startsWith("edge://") 
  ) {
      return;
  }

  if (!currentDomain) {
    currentDomain = domain;
    startTime = Date.now();
    return;
  }

  if (currentDomain !== domain) {
    const duration = Date.now() - startTime;
    await saveTime(currentDomain, duration);
    currentDomain = domain;
    startTime = Date.now();
  }
}

chrome.tabs.onActivated.addListener(() => {
  trackActiveTab();
});

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  if (changeInfo.status === "complete") {
    trackActiveTab();
  }
});

trackActiveTab();
