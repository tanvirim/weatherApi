const { json } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const app = express();

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(8000,()=> console.log('listening at 8000')
)


app.get('/', function(req, res){

    res.sendFile(`${__dirname}/index.html`)
})


app.post('/', (req,res)=>{
  
    const query = req.body.cityName
    const appId = "023771359889e3a98a02a4e130c74cb6"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${appId}`
    

    https.get(url,(response)=>{
        
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp ; 
            const image = weatherData.weather[0].icon
            const iconUrl = "http://openweathermap.org/img/wn/"+image+"@2x.png"
            res.write("<h1>"+query+" temperature today is "+temp+ " degree celcious<h1/>")
            res.write("<img src="+iconUrl+"/>")
            console.log(iconUrl);
            res.send()
        })
    })
})




