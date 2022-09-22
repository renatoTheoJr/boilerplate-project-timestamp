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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (request, response) {
  const {date} = request.params;
  const dateStr = date.split("-");
  let dateObj;
  if(dateStr.length == 3 ){
    dateObj = new Date(date);
  }else{
    dateObj = new Date(parseInt(date));

  }

  return response.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
  
});



// listen for requests :)
var listener = app.listen(3333, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
