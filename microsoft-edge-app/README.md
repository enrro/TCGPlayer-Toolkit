# TCGPlayer Seller Info Tooltip - Edge Extension
An Edge extension that enhances the TCGPlayer website by displaying seller information tooltips when hovering over seller feedback links.

# Table of Contents
* Features
* Installation
* Usage
* Configuration
* Dependencies
* Contributing
* License
  
# Features
* Retrieves and displays seller information tooltips for TCGPlayer seller feedback links.
* Utilizes a proxy server for fetching and caching seller data.
* Dynamically adds tooltips to enhance user experience.

# Installation
1. Download the extension files
2. Open the Edge browser.
3. Navigate to `edge://extensions/`.
4. Enable "Developer mode" in the top right corner.
5. Click "Load unpacked" and select the extension directory.
6. The extension is now installed and ready to use.

# Usage
* Open the TCGPlayer website.
* Hover over seller feedback links to display seller information tooltips.


# Configuration
Update the proxyUrl variable in content.js with the URL of your proxy server's endpoint.
```javascript
const proxyUrl = 'http://localhost:3000/proxy';
```

# Dependencies
None (pure JavaScript and Edge Extension API).

# Contributing
Feel free to contribute by opening issues or submitting pull requests.

# License
This project is licensed under the MIT License.

