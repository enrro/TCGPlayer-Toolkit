import express from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { loadCache, saveCache } from './cache.js';


const app = express();
const PORT = 3000;
const statesRegex = /\b(?:Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New\sHampshire|New\sJersey|New\sMexico|New\sYork|North\sCarolina|North\sDakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode\sIsland|South\sCarolina|South\sDakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West\sVirginia|Wisconsin|Wyoming)\b/g;
let sellerCache = loadCache();
app.use(express.json());

app.get('/proxy', async (req, res) => {
    const targetUrl = decodeURIComponent(req.query.href);
    try {
        new URL(targetUrl); // Validate the URL format
    } catch (error) {
        return res.status(400).json({ error: 'Invalid target URL' });
    }
    try {
        const response = await fetch(targetUrl);
        const sellersId = getSellerId(targetUrl);
        const htmlContent = await response.text();
        const $ = cheerio.load(htmlContent);
        const sellerInfoSection = $('.sellerInfo');
        const sellerMainDiv = $('.sellerMain');

        // Extract the seller's name from the h1 element
        const sellerName = sellerMainDiv.find('h1').text().trim();
        console.log(`Seller Name: ${sellerName}\nSeller id: ${sellersId}`);

        const sellerInfo = sellerInfoSection.text().trim();
        const stateMatch = sellerInfo.match(statesRegex);
        const state = stateMatch ? stateMatch[0] : "non US seller";
        console.log("state match: ", stateMatch);

        const newSellerData = {
            "sellerName": sellerName,
            "sellersId": sellersId,
            "state": state
        };
        sellerCache[newSellerData.sellersId] = newSellerData;
        saveCache(sellerCache);
        // Return the sellerInfo as a JSON response
        res.setHeader('Access-Control-Allow-Origin', '*'); // Update with appropriate origin
        res.json({ state });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data from target URL' });
    }
});

function getSellerId(targetUrl) {
    const targetUrlParts = targetUrl.split('/');
    return targetUrlParts.pop();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
