// PrivacyPixel - Popup Script

document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  
  document.getElementById('clearBtn').addEventListener('click', clearStats);
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
});

function loadStats() {
  chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
    if (response) {
      document.getElementById('blockedCount').textContent = response.blockedCount || 0;
      displayTrackers(response.trackerLog || []);
    }
  });
}

function displayTrackers(trackers) {
  const listEl = document.getElementById('trackerList');
  
  if (trackers.length === 0) {
    listEl.innerHTML = '<div class="empty">No trackers blocked yet</div>';
    return;
  }
  
  // Show last 10 trackers
  const recent = trackers.slice(-10).reverse();
  
  listEl.innerHTML = recent.map(tracker => {
    const time = new Date(tracker.timestamp).toLocaleTimeString();
    return `
      <div class="tracker-item">
        <div class="tracker-domain">${tracker.domain}</div>
        <div class="tracker-time">${time} - ${tracker.reason}</div>
      </div>
    `;
  }).join('');
}

function clearStats() {
  if (confirm('Clear all stats?')) {
    chrome.runtime.sendMessage({ action: 'clearStats' }, () => {
      loadStats();
    });
  }
}

function openSettings() {
  chrome.tabs.create({ url: chrome.runtime.getURL('src/settings.html') });
}
