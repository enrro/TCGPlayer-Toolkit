// content.js

// Function to log the href attribute of an anchor element
function logAnchorHref(event) {
    const element = event.target;
    if (element.tagName === 'A') {
      console.log('Element Href:', element.href);
    }
  }
  
  // Check if the current frame is the main frame
  if (window === window.top) {
    // Attach event listeners to all elements in the main frame
    const mainFrameElements = document.querySelectorAll('*');
    mainFrameElements.forEach(element => {
      element.addEventListener('mouseover', logAnchorHref);
    });
  }
  
  // Wait for DOM content to load
  document.addEventListener('DOMContentLoaded', function() {
    // Monitor for changes in the DOM using MutationObserver
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Check if new nodes are added to the DOM
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(node => {
            // Check if the added node is an element
            if (node.nodeType === Node.ELEMENT_NODE) {
              node.addEventListener('mouseover', logAnchorHref);
            }
          });
        }
      });
    });
  
    // Start observing the DOM for changes
    observer.observe(document.body, { childList: true, subtree: true });
  });
  