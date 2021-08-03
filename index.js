const http = require("http");
const express = require('express');
const app = express();

const axios = require("axios");
const cors = require('cors');
const morgan = require("morgan");
const fetch = require('node-fetch');
require('dotenv').config();
require("./database");
const Stat = require("./stats");
require('./jobLoadStats')

//var toolsForInstagram = require("tools-for-instagram")

const PORT = process.envPORT || 8000

const Instagram = require('instagram-web-api')
const username = "sosdani2000@hotmail.com", password = "21036842"

///const client = new Instagram({ username, password })

app.get('/', async (req, res) => {
    try {
        const query = req.body.query;
        const profile = await fetch(`https://graph.facebook.com/v11.0/${id_token}?_activeScenarioIDs=[]&_activeScenarios=[]&fields=business_discovery.username(${username}){follows_count,followers_count,media_count,media.limit(90){${data_post}}}&transport=cors&access_token=${token}`).then(response => response.json().catch(err => res.json(err)))
        console.log(query)
        //await axios.get("https://www.instagram.com/web/search/topsearch/?context=blended&query=instaescuela").then(response => {
            //  console.log(response.data)
          //  res.send({ data: response.data })
     //   })
        // const stats = await Stat.find({});
        //  res.json(stats)
        //https://www.instagram.com/{username}/?__a=1
        //https://www.instagram.com/web/search/topsearch/?context=blended&query=${query}

    } catch (error) {
        console.error(error)
    }
});

app.get('/users', async (req, res) => {
    let username = 'geiverbotello'
    let followers = [], followings = []
    var data;
    var config = {
        method: 'get',
        url: `https://www.instagram.com/${username}/?__a=1`,
        headers: {
            'Cookie': 'csrftoken=XsLpP6dr2lCDkfLMdmfBZY9iXMxuYpe5; mid=YHDN4wAEAAE3RK3aw6cZu8fT06hD; ig_did=8DCC03EB-F4FE-4E9C-8652-A52FC982BD79; ig_nrcb=1'
        }
    };

    axios(config)
        .then(async function (response) {
            //console.log(JSON.stringify(response.data));
            data = response.data;

            ress = data

            let userId = ress.graphql.user.id
            console.log(userId)

            let after = null, has_next = true
            try {


                while (has_next) {
                    await fetch(`https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` + encodeURIComponent(JSON.stringify({
                        id: userId,
                        include_reel: true,
                        fetch_mutual: true,
                        first: 50,
                        after: after
                    }))).then(res => res.json()).then(ress => {
                        has_next = ress.data.user.edge_followed_by.page_info.has_next_page
                        after = ress.data.user.edge_followed_by.page_info.end_cursor
                        followers = followers.concat(ress.data.user.edge_followed_by.edges.map(({ node }) => {
                            return {
                                username: node.username,
                                full_name: node.full_name
                            }
                        }))
                    })
                }
                
                console.log('Followers', followers)
                res.json(followers)

                has_next = true
                after = null
            } catch (error) {
                console.error(error)
            }

        })
        .catch(function (error) {
            console.log(error);
        });

    /*
            console.log('que pasa')
        
        
          
            while (has_next) {
                await fetch(`https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` + encodeURIComponent(JSON.stringify({
                    id: userId,
                    include_reel: true,
                    fetch_mutual: true,
                    first: 50,
                    after: after
                }))).then(res => res.json()).then(res => {
                    has_next = res.data.user.edge_follow.page_info.has_next_page
                    after = res.data.user.edge_follow.page_info.end_cursor
                    followings = followings.concat(res.data.user.edge_follow.edges.map(({ node }) => {
                        return {
                            username: node.username,
                            full_name: node.full_name
                        }
                    }))
                })
            }
            console.log('Followings', followings)*/


});

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/test', function (req, res) {
    res.send('esta funciona perfectamente')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




