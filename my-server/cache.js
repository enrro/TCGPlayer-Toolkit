// cache.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const cacheDirectoryName = 'cache'; // Name of the cache directory

function getCacheDirectory() {
    const currentModulePath = fileURLToPath(import.meta.url);
    const currentModuleDirectory = path.dirname(currentModulePath);
    return path.join(currentModuleDirectory, cacheDirectoryName);
}

function loadCache() {
    const cacheDirectory = getCacheDirectory();
    const cacheFilePath = path.join(cacheDirectory, 'sellerCache.json');
    let sellerCache = {};

    if (fs.existsSync(cacheFilePath)) {
        try {
            const data = fs.readFileSync(cacheFilePath, 'utf-8');
            sellerCache = JSON.parse(data);
            console.log('Seller cache loaded from file.');
        } catch (error) {
            console.error('Error loading seller cache from file:', error);
        }
    }

    return sellerCache;
}

function saveCache(sellerCache) {
    const cacheDirectory = getCacheDirectory();
    const cacheFilePath = path.join(cacheDirectory, 'sellerCache.json');
    ensureDirectoryExists(cacheDirectory);
    try {
        fs.writeFileSync(cacheFilePath, JSON.stringify(sellerCache, null, 2), 'utf-8');
        console.log('Seller cache saved to file.');
    } catch (error) {
        console.error('Error saving seller cache to file:', error);
    }
}

function ensureDirectoryExists(cacheDirectory) {
    if (!fs.existsSync(cacheDirectory)) {
        try {
            fs.mkdirSync(cacheDirectory, { recursive: true }); // Use recursive: true to create parent directories if needed
        } catch (error) {
            console.error('Error creating cache directory:', error);
            return; // Exit the function if directory creation fails
        }
    }
}

export { loadCache, saveCache };
