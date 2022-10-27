const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    console.log("Just got a request!");
    const url = req.query.url;
    console.log(url);
    const title = await getTitle(url);
    res.send(title);
})

app.listen(process.env.PORT || 3000);

// Helper function to get the title of a web page
async function getTitle(url){
    try {
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        };
        const response = await fetch(url, options);
        const html = await response.text();
        let title = '';
        const titleMatches = html.match(/<title.*?>.*?<\/title>/gmi)||[];
        if (titleMatches.length > 0) {
            title = titleMatches[0];
            console.log(title);
        }
        if (title.search(/<title/gi) !== -1){
            const titleText = title.substring(title.indexOf('>')+1);
            const res = titleText.replace('</title>','');
            console.log(res);
            return res;
        }
        return '';
    } catch (err) {
        console.error(`Failed to retrieve title with error: ${err}`);
        return '';
    }

}
