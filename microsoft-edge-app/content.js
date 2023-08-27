// content.js
// URL of your proxy server's endpoint
const proxyUrl = 'http://localhost:3000/proxy';
const tcgplayerPattern = /https:\/\/shop\.tcgplayer\.com\/sellerfeedback\/[a-zA-Z0-9_-]+/;

// Function to log the href attribute of an anchor element
function logAnchorHref(event) {
  const element = event.target;
  if (element.tagName === 'A') {
    const href = element.href;
    
    if (tcgplayerPattern.test(href)) {
      const parts = href.split("/");
      const lastPart = parts[parts.length - 1];

      // console.log('Element Href:', href);
      // console.log('last part:', lastPart);
      // Perform a GET request using Fetch API
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      const apiUrl = `https://api.tcgplayer.com/stores/${lastPart}/address`;
      const request = `${proxyUrl}?href=${encodeURIComponent(href)}`;
      console.log('request to sent:', request);
      fetch(request, options)
        .then(response => response.json())
        .then(response => {
          const state = response.state;
          displayTooltip(event, state);
        })
        .catch(err => console.error(err));
    }
  }
}

// Function to display the tooltip
function displayTooltip(event, address) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = address;

  const bodyRect = document.body.getBoundingClientRect();
  const elementRect = event.target.getBoundingClientRect();

  tooltip.style.position = 'absolute';
  
  tooltip.style.left = `${elementRect.left - bodyRect.left}px`;
  tooltip.style.top = `${elementRect.top - bodyRect.top - tooltip.offsetHeight - 20}px`;

  document.body.appendChild(tooltip);

  // Remove the tooltip after a delay
  setTimeout(() => {
    document.body.removeChild(tooltip);
  }, 3000);
}
  
document.addEventListener('mouseover', logAnchorHref);