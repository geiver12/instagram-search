
const fetch = require("node-fetch");
const Stat = require("./stats");
const id_token = process.env.ID_TOKEN_MOMENT
const token = process.env.TOKEN_INSTAGRAM_MOMENT

const microJobStats = async () => {
    setInterval(async () => {
        const data_post = "comments_count,like_count"
        const stats = await Stat.find({});

        var profiles = []
        stats.map(async stat => {
            const username = stat.username

            const profile = await fetch(`https://graph.facebook.com/v10.0/${id_token}?_activeScenarioIDs=[]&_activeScenarios=[]&fields=business_discovery.username(${username}){follows_count,followers_count,media_count,media.limit(90){${data_post}}}&transport=cors&access_token=${token}`).then(response => response.json().catch(err => res.json(err)))
            let auxPost = profile.business_discovery.media.data.slice();
            let accountEngagement = 0;

            for (let i = 0; i < auxPost.length; i++) {
                let engagement = (((auxPost[i].like_count + auxPost[i].comments_count) / profile.business_discovery.followers_count) * 100);
                accountEngagement = accountEngagement + engagement;
            }
            accountEngagement = accountEngagement / auxPost.length;
            if (stat.data.length > 0) {
                const date = new Date();
                const date2 = stat.data[stat.data.length - 1].date;

                if (date.getDate() == date2.getDate() && date.getMonth() == date2.getMonth()) {
                    stat.data[stat.data.length - 1].date = date;
                    stat.data[stat.data.length - 1].engagement_rate.count = accountEngagement;
                    stat.data[stat.data.length - 1].followers_count.count = profile.business_discovery.followers_count;
                    stat.data[stat.data.length - 1].follows_count.count = profile.business_discovery.follows_count;
                    stat.data[stat.data.length - 1].media_count.count = profile.business_discovery.media_count;
                } else {
                    stat.data.push({
                        date: new Date(),
                        engagement_rate: {
                            count: accountEngagement,
                            prev_count: stat.data[stat.data.length - 1].engagement_rate.count
                        },
                        followers_count: {
                            count: profile.business_discovery.followers_count,
                            prev_count: stat.data[stat.data.length - 1].followers_count.count
                        },
                        follows_count: {
                            count: profile.business_discovery.follows_count,
                            prev_count: stat.data[stat.data.length - 1].follows_count.count
                        }, media_count: {
                            count: profile.business_discovery.media_count,
                            prev_count: stat.data[stat.data.length - 1].media_count.count
                        }
                    });
                }
            } else
                stat.data.push({
                    date: new Date(),
                    engagement_rate: {
                        count: accountEngagement,
                        prev_count: 0
                    },
                    followers_count: {
                        count: profile.business_discovery.followers_count,
                        prev_count: 0
                    },
                    follows_count: {
                        count: profile.business_discovery.follows_count,
                        prev_count: 0
                    }, media_count: {
                        count: profile.business_discovery.media_count,
                        prev_count: 0
                    }
                });

            await stat.save();
        })

    }, 5000 );//3600000

}

microJobStats();

