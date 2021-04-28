
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://lgblade:Aa123456@cluster0.7mje6.mongodb.net/lgbladeDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(db => console.log('db this connet')).catch(err => console.log('error  database?'));