const express = require('express');
const app = express();
const port = 3000;
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{
  const cityName = req.body.cityName.toLowerCase();
  const stateCode = req.body.stateCode.toUpperCase();
  const countryCode = req.body.countryCode.toUpperCase();
  const apiId = "6608274c44a06e3d3460b1f02c5abd5c";

  const units_input = req.body.units.toLowerCase();
  var units = "";
  if (units_input == "kelvin"){units = "imperial";}
  else {units = "metric";}

  const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + "," + stateCode + "," + countryCode + '&appid=' + apiId + '&units=' + units;
  https.get(api_url, (response)=>{
    // console.log(response.statusCode)
    response.on('data', (d) => {
        const jsonData = JSON.parse(d);
        const temp = jsonData.main.temp;
        const feelsLikeTemp = jsonData.main.feels_like;
        const weatherDescription = jsonData.weather[0].description;

        res.write("<h1>The temperature in " + cityName + " is " + temp + " degree " + units_input + " and feels like " + feelsLikeTemp +" degree " + units_input + ".</h1>");
        res.write("<p>Weather Description: " + weatherDescription +"</p>");
        res.send();
      });
  });

});

app.get("/", (req, res)=>{
  const cityName = "jaipur";
  const stateCode = "RJ";
  const countryCode = "IND";
  const apiId = "6608274c44a06e3d3460b1f02c5abd5c";
  const units = 'metric';

  const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + "," + stateCode + "," + countryCode + '&appid=' + apiId + '&units=' + units;
  https.get(api_url, (response)=>{
    // console.log(response.statusCode)
    response.on('data', (d) => {
        const jsonData = JSON.parse(d);
        const temp = jsonData.main.temp;
        const feelsLikeTemp = jsonData.main.feels_like;
        const weatherDescription = jsonData.weather[0].description;

        res.write("<h1>The temperature in Jaipur is " + temp + " degree Celcius and feels like " + feelsLikeTemp +" degree Celcius </h1>");
        res.write("<p>Weather Description: " + weatherDescription +"</p>");
        res.send();
      });
  });
});

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});
