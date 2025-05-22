# Proxy Server
A simple proxy server built with Express.js that retrieves and caches seller information from a given URL.

# Table of Contents
* Features
* Installation
* Usage
* Endpoints
* Dependencies
* Contributing
* License
# Features
* Proxy server for fetching and caching seller information from a target URL.
* Uses Express.js for handling HTTP requests.
* Utilizes Cheerio for web scraping and Node-fetch for making HTTP requests.
Implements basic caching functionality to reduce redundant requests.


# Installation
1. Navigate to the project directory:
```bash
cd my-server
```
2. Install dependencies:
```bash
npm install
```

# Usage
1. Start the server:

```bash
npm start
node proxyServer.js
```
2. The server will be running on http://localhost:3000 by default.

# Endpoints
* `/proxy`
* Method: GET
* Query Parameter:
  * `href`: URL-encoded target URL for fetching seller information.
* Response:
    * Successful response: Returns seller information as JSON.
    * Error response: Returns appropriate error message.

# Dependencies
* Express.js: Fast, unopinionated, minimalist web framework for Node.js.
* Cheerio: Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
* Node-fetch: A light-weight module that brings window.fetch to Node.js.
# Contributing
Feel free to contribute by opening issues or submitting pull requests.

# License
This project is licensed under the MIT License.

---
