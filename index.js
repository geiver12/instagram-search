const http = require("http");
const express = require('express');
const app = express();
const request = require("request");

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.get('/', function (req, res) {
    request("https://www.instagram.com/web/search/topsearch/?context=blended&query=instaescuela", function (error, response, body) {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.json({ message: 'Hola Mundo!'});
    });

});

app.get('/test', function (req, res) {
   
   res.send('esta funciona perfectamente')

});


