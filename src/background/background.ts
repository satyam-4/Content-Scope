chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
  chrome.storage.local.set({ interests: [] });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "SAVE_INTEREST") {
    chrome.storage.local.get("interests", (data) => {
      const updated = [...(data.interests || []), message.payload];
      chrome.storage.local.set({ interests: updated }, () => {
        console.log("Interest saved:", message.payload);
        sendResponse({ status: "ok" });
      });
    });
    return true;
  }

  if (message.type === "GET_INTERESTS") {
    chrome.storage.local.get("interests", (data) => {
      sendResponse({ interests: data.interests || [] });
    });
    return true;
  }
});
