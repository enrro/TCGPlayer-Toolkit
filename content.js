// content.js

// Function to log the href attribute of an anchor element
function logAnchorHref(event) {
  const element = event.target;
  if (element.tagName === 'A') {
    const href = element.href;
    const tcgplayerPattern = /https:\/\/shop\.tcgplayer\.com\/sellerfeedback\/[a-zA-Z0-9_-]+/;
    
    if (tcgplayerPattern.test(href)) {
      const parts = href.split("/");
      const lastPart = parts[parts.length - 1];

      console.log('Element Href:', href);
      console.log('last part:', lastPart);
      // Perform a GET request using Fetch API
      fetch(href)
      .then(response => response.text())
      .then(content => {
        console.log('Content:', content);
      })
      .catch(error => {
        console.error('Error fetching:', error);
      });
    }
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