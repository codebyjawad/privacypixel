// PrivacyPixel - Background Service Worker (Simplified)

let blockedCount = 0;
let trackerLog = [];

// Load saved stats on startup
chrome.storage.local.get(['blockedCount', 'trackerLog'], (result) => {
  if (result.blockedCount) blockedCount = result.blockedCount;
  if (result.trackerLog) trackerLog = result.trackerLog;
  updateBadge();
});

function updateBadge() {
  chrome.action.setBadgeText({ text: blockedCount.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#FF4444' });
}

function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return 'unknown';
  }
}

// Listen for popup requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    sendResponse({
      blockedCount: blockedCount,
      trackerLog: trackerLog
    });
  } else if (request.action === 'clearStats') {
    blockedCount = 0;
    trackerLog = [];
    chrome.storage.local.set({ blockedCount: 0, trackerLog: [] });
    updateBadge();
    sendResponse({ success: true });
  }
  return true;
});

console.log('PrivacyPixel loaded');
