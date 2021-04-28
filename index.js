const http = require("http");
const express = require('express');
const app = express();
const request = require("request");
const axios = require("axios");

require("./database");
require('./jobLoadStats')

const PORT = process.envPORT || 8000

app.get('/', async function (req, res) {
  try {
      //  const query = req.body.query;
        //console.log(query)
        await axios.get("https://searchusers.com/search/geiver").then(response => {
            console.log(response.data)
            res.send({ data: response.data })
        })

        //https://www.instagram.com/{username}/?__a=1
        //https://www.instagram.com/web/search/topsearch/?context=blended&query=${query}



    } catch (error) {
        console.error(error)
    }

});

app.get('/test', function (req, res) {
    res.send('esta funciona perfectamente')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




