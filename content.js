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