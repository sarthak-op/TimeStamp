// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // If no date parameter provided, use the current time
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // If the date parameter is a Unix timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Try parsing the date parameter
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    // Invalid Date
    res.json({ error: 'Invalid Date' });
  } else {
    // Valid Date
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


const port = process.env.PORT || 3000;
// listen for requests :)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
