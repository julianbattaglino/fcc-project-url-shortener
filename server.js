require('dotenv').config();
const express = require('express');
const app = express();
const mongo = require ('mongodb')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const shortid = require('shortid')

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Basic Configuration
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(mongoose.connection.readyState)

//Build a schemaand model to store saved URLS
var ShortURL = moongose.model('ShortURL', new mongoose.Schema({
  short_url: String,
  original_url: String,
  suffix: String
}));

//enable CORS so your api is remotely testeable by freecodecamp
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


// API endpoint
app.post('/api/shorturl/new', function (req, res) {

  let client_requested_url = body.body.url
  let suffix = shortid.generate();
  let newShortURL = suffix

  let newURL = new ShortURL({
    short_url:__dirname + "/api/shorturl/" + suffix,
    original_url: client_requested_url,
    suffix: suffix
  })

  newURL.save(function (err, doc) {
    if(err) return console.error(err);
    console.log("Document inserted succussfully", newURL);
    res.json({
      "saved": true,
      "short_url": newURL.short_url,
      "original_url": newURL.original_url,
      "suffix": newURL.suffix
    });
  });
});

  app.get('/api/shorturl/:suffix', function (req, res) {
    let userGeneratedSuffix = req.params.suffix;
    ShortURL.find({ suffix: userGeneratedSuffix }).then(foundUrls => {
      let urlForRedirect = foundUrls[0];
      res.redirect(urlForRedirect.original_url);
    });
  });   

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
