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
  let dateObj;
  let timeStamp = Date.parse(date);
  if(isNaN(timeStamp) == false){
    dateObj = new Date(date);
    timeStamp = Date.parse(date);
  }else{
    dateObj = new Date(parseInt(date));
    timeStamp = parseInt(date);
  }

  if(isNaN(timeStamp)){
    return response.json({error: "Invalid Date"});
  }
  return response.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
  
});

app.get("/api/", function (request, response) {
  const dateObj = new Date();
  return response.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
