const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.get('/:id', (req, res) => {
    console.log("Just got a request!");
    const url = req.params.id;
    console.log(url);
    const title = getTitle(url);
    res.send(title);
})

app.listen(process.env.PORT || 3000);

// Helper function to get the title of a web page
function getTitle(url){
    return 'Hello World!'

}
