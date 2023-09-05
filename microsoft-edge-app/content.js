// content.js
// URL of your proxy server's endpoint
const proxyUrl = 'http://localhost:3000/proxy';
const tcgplayerPattern = /https:\/\/shop\.tcgplayer\.com\/sellerfeedback\/([^&]+)/;
const url = "https://shop.tcgplayer.com/sellerfeedback/";
const sellerRegex = /seller=([^&]+)/;
const options = { method: 'GET', headers: { accept: 'application/json' } };

// Function to log the href attribute of an anchor element
function handleAnchorHover(event) {
  const element = event.target;
  if (element.tagName === 'A') {
    const href = element.href;
    var isSellerfeedback = tcgplayerPattern.exec(href);
    var isSellerRegex = sellerRegex.exec(href);
    if (isSellerfeedback) {
      console.log("isSellerfeedback:", isSellerfeedback);
      logElementsWithClassName('listing-item product-details__listings-results');
      // Perform a GET request using Fetch API
      const request = `${proxyUrl}?href=${encodeURIComponent(href)}`;
      fetch(request, options)
        .then(response => response.json())
        .then(response => {
          const state = response.state;
          displayTooltip(event, state);
        })
        .catch(err => console.error(err));
    } else if (isSellerRegex) {
      const sellerId = isSellerRegex[1]; // Extract the seller ID from the match
      console.log("isSellerRegex:", isSellerRegex);
      console.log("Seller ID:", sellerId);
      const request = `${proxyUrl}?href=${url + sellerId}`;
      console.log("request:", request);
      fetch(request, options)
        .then(response => response.json())
        .then(response => {
          const state = response.state;
          displayTooltip(event, state);
          console.log("response:", response);
        })
    }
  }
}

// Function to display the tooltip
function displayTooltip(event, address) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = address;
  tooltip.style.zIndex = '9999'; // rendered above other elements

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
  // Remove the tooltip when the mouse leaves the link
  // event.target.addEventListener('mouseleave', () => {
  //   document.body.removeChild(tooltip);
  // });
}

document.addEventListener('mouseover', handleAnchorHover);

// Function to retrieve and log all elements with a specific class name
function logElementsWithClassName(className) {
  const elements = document.getElementsByClassName(className);
  const elementsArray = Array.from(elements); // Convert HTMLCollection to an array
  console.log(`Found ${elementsArray.length} elements with class ${className}:`, elementsArray);
}