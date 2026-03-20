// PrivacyPixel - Content Script
// Runs on all pages to detect and block tracking pixels

console.log('PrivacyPixel: Content script loaded');

// Additional client-side blocking for images loaded after page load
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'IMG') {
        checkImage(node);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

function checkImage(img) {
  // Check for 1x1 tracking pixels
  if (img.width === 1 && img.height === 1) {
    img.src = '';
    img.style.display = 'none';
    console.log('PrivacyPixel: Blocked 1x1 pixel');
  }
}

// Check existing images on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(checkImage);
});
