# TCGPlayer Toolkit
This repository contains two projects that work together to enhance the TCGPlayer website experience:

1. Proxy Server: A simple Express.js server that proxies requests to TCGPlayer and caches seller information for faster retrieval.

2. Edge Extension: An Edge extension that leverages the proxy server to display seller information tooltips when hovering over TCGPlayer seller feedback links.

Table of Contents
* Overview
* Proxy Server Installation
* Edge Extension Installation
* Contributing
* License

# Overview
To enhance your experience on the TCGPlayer website, these two projects work together. The proxy server fetches and caches seller information, while the Edge extension utilizes this data to display tooltips when hovering over seller feedback links.

# Proxy Server Installation
1. Navigate to the proxy-server directory:
```bash
cd my-server
```
2. Follow the instructions in the [Proxy Server README](./my-server/README.md) for installation and usage.

# Edge Extension Installation
1. Navigate to the edge-extension directory:
```bash
cd microsoft-edge-app
```
2. Follow the instructions in the [Edge Extension README](./microsoft-edge-app/README.md) for installation and usage.

# Contributing
Feel free to contribute by opening issues or submitting pull requests for either project.

# License
This project is licensed under the MIT License.