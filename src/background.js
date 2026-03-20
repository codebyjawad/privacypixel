// PrivacyPixel - Background Service Worker (Manifest V3)
// Uses declarativeNetRequest for blocking

let blockedCount = 0;
let trackerLog = [];

// Listen for blocked requests
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((details) => {
  blockedCount++;
  logTracker(details.request.url, 'blocked-by-rule');
});

function logTracker(url, reason) {
  const tracker = {
    url: url,
    reason: reason,
    timestamp: Date.now(),
    domain: extractDomain(url)
  };
  
  trackerLog.push(tracker);
  
  // Keep only last 100 trackers
  if (trackerLog.length > 100) {
    trackerLog.shift();
  }
  
  // Save to storage
  chrome.storage.local.set({ 
    blockedCount: blockedCount,
    trackerLog: trackerLog 
  });
  
  // Update badge
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
    chrome.action.setBadgeText({ text: '0' });
    sendResponse({ success: true });
  }
  return true;
});

// Load saved stats on startup
chrome.storage.local.get(['blockedCount', 'trackerLog'], (result) => {
  if (result.blockedCount) blockedCount = result.blockedCount;
  if (result.trackerLog) trackerLog = result.trackerLog;
  chrome.action.setBadgeText({ text: blockedCount.toString() });
});

console.log('PrivacyPixel: Background service worker loaded (Manifest V3)');
