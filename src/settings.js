// PrivacyPixel - Settings Page

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  document.getElementById('exportBtn').addEventListener('click', exportData);
});

function loadSettings() {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {
      notifications: true,
      autoBlock: true,
      showBadge: true
    };
    
    document.getElementById('notifications').checked = settings.notifications;
    document.getElementById('autoBlock').checked = settings.autoBlock;
    document.getElementById('showBadge').checked = settings.showBadge;
  });
}

function saveSettings() {
  const settings = {
    notifications: document.getElementById('notifications').checked,
    autoBlock: document.getElementById('autoBlock').checked,
    showBadge: document.getElementById('showBadge').checked
  };
  
  chrome.storage.local.set({ settings }, () => {
    alert('Settings saved!');
  });
}

function exportData() {
  chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
    const data = {
      blockedCount: response.blockedCount,
      trackerLog: response.trackerLog,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privacypixel-export-${Date.now()}.json`;
    a.click();
  });
}
