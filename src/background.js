// PrivacyPixel - Background Service Worker
// Blocks email tracking pixels

const TRACKING_DOMAINS = [
  'open.spotify.com',
  'mandrillapp.com',
  'sendgrid.net',
  'mailchimp.com',
  'constantcontact.com',
  'hubspot.com',
  'salesforce.com',
  'marketo.net',
  'eloqua.com',
  'mailgun.net',
  'postmarkapp.com',
  'sendinblue.com',
  'amazonses.com',
  'createsend.com',
  'list-manage.com'
];

let blockedCount = 0;
let trackerLog = [];

// Block tracking pixels
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = details.url.toLowerCase();
    
    // Check if it's a tracking pixel (1x1 image)
    if (details.type === 'image' || details.type === 'xmlhttprequest') {
      // Check for tracking domains
      for (const domain of TRACKING_DOMAINS) {
        if (url.includes(domain)) {
          blockedCount++;
          logTracker(url, domain);
          return { cancel: true };
        }
      }
      
      // Check for 1x1 pixel patterns
      if (url.match(/[?&](width|w)=1[&$]/) && url.match(/[?&](height|h)=1[&$]/)) {
        blockedCount++;
        logTracker(url, 'pixel-pattern');
        return { cancel: true };
      }
      
      // Check for common tracking endpoints
      if (url.includes('/track') || url.includes('/pixel') || url.includes('/open')) {
        blockedCount++;
        logTracker(url, 'tracking-endpoint');
        return { cancel: true };
      }
    }
    
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

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

console.log('PrivacyPixel: Background service worker loaded');
