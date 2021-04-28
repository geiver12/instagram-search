const { Schema, model } = require("mongoose");

const Data = new Schema({

    followers_count: {
        count: Number,
        prev_count: Number
    },
    follows_count: {
        count: Number,
        prev_count: Number
    },
    media_count: {
        count: Number,
        prev_count: Number
    },
    engagement_rate: {
        count: Number,
        prev_count: Number
    },
    date: Date

});

const Stats = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    data: [Data]

});

module.exports = model("Stats", Stats);