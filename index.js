import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", (req, res) => {
  res.sendFile(__dirname+"/public/main.html");
});

app.get("/submit", (req, res) => {
  res.redirect("/");
});
app.get("/coordinates", (req, res) => {
  res.sendFile(__dirname+"/public/cord.html");
});
app.post("/submit", async(req, res) => {
  try {
    const api_key = "a7d014ee410955623d95fffa1be9f184";
    const City = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${api_key}`;
    const response = await axios.get(url);
    // console.log(response.data);
    const weatherData = response.data;

    var temp = weatherData.main.temp;

    const minTemp = weatherData.main.temp_min;

    const maxTemp = weatherData.main.temp_max;

    const weatherDescription = weatherData.weather[0].description;

    const humidity = weatherData.main.humidity;

    const pressure = weatherData.main.pressure;

    const windSpeed = weatherData.wind.speed;

    const imgUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
    const cityName = weatherData.name;
    const country = weatherData.sys.country;
    const condition = weatherData.weather[0].main;




    res.render("index.ejs", {
      currentTemp: temp,
      ImgUrl: imgUrl,
      weatherDescription: weatherDescription,
      countryCode: country,
      cityName: cityName,
      maxTemp: maxTemp,
      minTemp: minTemp,
      humidity: humidity,
      pressure: pressure,
      windSpeed: windSpeed,
      // currentTime: currentTime,
      condition: condition
    });

  } catch (error) {
    console.log(error);
    res.render("error.ejs",{
      page : "cityName"
    });
  }




})


app.post("/coordinates",async(req,res)=>{
  try{


  const lat = req.body.lat;
  const lon = req.body.long;
  const api_key = "a7d014ee410955623d95fffa1be9f184";
  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key+"&units=metric";

  const response = await axios.get(url);
    // console.log(response.data);
  const weatherData = response.data;

  var temp = weatherData.main.temp;

  const minTemp = weatherData.main.temp_min;

  const maxTemp = weatherData.main.temp_max;

  const weatherDescription = weatherData.weather[0].description;

  const humidity = weatherData.main.humidity;

  const pressure = weatherData.main.pressure;

  const windSpeed = weatherData.wind.speed;

  const imgUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const condition = weatherData.weather[0].main;




  res.render("index.ejs", {
    currentTemp: temp,
    ImgUrl: imgUrl,
    weatherDescription: weatherDescription,
    countryCode: country,
    cityName: cityName,
    maxTemp: maxTemp,
    minTemp: minTemp,
    humidity: humidity,
    pressure: pressure,
    windSpeed: windSpeed,
    // currentTime: currentTime,
    condition: condition
  });

} catch (error) {
  console.log(error);
  res.render("error.ejs",{page:"coordinates"});
}


})


app.get("/location",(req,res)=>{
  res.sendFile(__dirname+"/public/loc.html");
})

app.post("/location",async(req,res)=>{
  try{


  const lat = req.body.lat;
  const lon = req.body.long;
  const api_key = "a7d014ee410955623d95fffa1be9f184";
  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
  const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key+"&units=metric";

  const response = await axios.get(url);
    // console.log(response.data);
  const weatherData = response.data;

  var temp = weatherData.main.temp;

  const minTemp = weatherData.main.temp_min;

  const maxTemp = weatherData.main.temp_max;

  const weatherDescription = weatherData.weather[0].description;

  const humidity = weatherData.main.humidity;

  const pressure = weatherData.main.pressure;

  const windSpeed = weatherData.wind.speed;

  const imgUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const condition = weatherData.weather[0].main;




  res.render("index.ejs", {
    currentTemp: temp,
    ImgUrl: imgUrl,
    weatherDescription: weatherDescription,
    countryCode: country,
    cityName: cityName,
    maxTemp: maxTemp,
    minTemp: minTemp,
    humidity: humidity,
    pressure: pressure,
    windSpeed: windSpeed,
    // currentTime: currentTime,
    condition: condition
  });

} catch (error) {
  // console.log(error);
  res.render("error.ejs",{page:"coordinates"});
}

})





app.listen(port, () => {
  console.log(`The server is started at ${port}`);
})
