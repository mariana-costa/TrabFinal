const GoogleAPIKey = 'AIzaSyAV4BNqBJwhTX5i-DtnM3Ol1O2f7ydtpMI';
const DarkSkyAPIKey = '50a5a701e63a841bb6863966a830778e';

const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public")); //o dirname dá sempre o caminho até onde o servidor esta a ser executado. Assim, se houver um pedido para um ficheiro, vai ver a pasta public, se estiver la, serve-o

//cumprimentos
var date = new Date().getHours().toString();
//var iconetime;
if (date >= 20 || date <= 6) {
    texto7 = "Good evening!";
    //document.getElementById("iconetime").value = "<img src='images/evening.png' width='128' height='128'>";
}
if (date > 6 && date <= 12) {
    texto7 = "Good morning!";
    //document.getElementById("iconetime").value = "<img src='images/morning.png' width='128' height='128'>";
}
if (date > 12 && date < 20) {
    texto7 = "Good afternoon!";
    //document.getElementById("iconetime").value = "<img src='images/night.png' width='128' height='128'>";
}


var d = new Date();
var ndia = d.getDay();
var ndiaHoje = "";
var ndiaAmanha = "";
var ndiaAmanha2 = "";
var ndiaAmanha3 = "";
var ndiaAmanha4 = "";
var ndiaAmanha5 = "";
var ndiaAmanha6 = "";

if (ndia == 0) {
    ndiaHoje = "Sunday"

    ndiaAmanha = "Monday"
    ndiaAmanha2 = "Tuesday"
    ndiaAmanha3 = "Wednesday"
    ndiaAmanha4 = "Thursday"
    ndiaAmanha5 = "Friday"
    ndiaAmanha6 = "Saturday"
}
if (ndia == 1) {
    ndiaHoje = "Monday"

    ndiaAmanha = "Tuesday"
    ndiaAmanha2 = "Wednesday"
    ndiaAmanha3 = "Thursday"
    ndiaAmanha4 = "Friday"
    ndiaAmanha5 = "Saturday"
    ndiaAmanha6 = "Sunday"
}
if (ndia == 2) {
    ndiaHoje = "Tuesday"

    ndiaAmanha = "Wednesday"
    ndiaAmanha2 = "Thursday"
    ndiaAmanha3 = "Friday"
    ndiaAmanha4 = "Saturday"
    ndiaAmanha5 = "Sunday"
    ndiaAmanha6 = "Monday"
}
if (ndia == 3) {
    ndiaHoje = "Wednesday"

    ndiaAmanha = "Thursday"
    ndiaAmanha2 = "Friday"
    ndiaAmanha3 = "Saturday"
    ndiaAmanha4 = "Domimgo"
    ndiaAmanha5 = "Monday"
    ndiaAmanha6 = "Tuesday"
}
if (ndia == 4) {
    ndiaHoje = "Thursday"

    ndiaAmanha = "Friday"
    ndiaAmanha2 = "Saturday"
    ndiaAmanha3 = "Sunday"
    ndiaAmanha4 = "Monday"
    ndiaAmanha5 = "Tuesday"
    ndiaAmanha6 = "Wednesday"
}
if (ndia == 5) {
    ndiaHoje = "Friday"

    ndiaAmanha6 = "Saturday"
    ndiaAmanha = "Sunday"
    ndiaAmanha2 = "Monday"
    ndiaAmanha3 = "Trça"
    ndiaAmanha4 = "Wednesday"
    ndiaAmanha5 = "Thursday"
}
if (ndia == 6) {
    ndiaHoje = "Saturday"

    ndiaAmanha = "Sunday"
    ndiaAmanha2 = "Monday"
    ndiaAmanha3 = "Tuesday"
    ndiaAmanha4 = "Wednesday"
    ndiaAmanha5 = "Thursday"
    ndiaAmanha6 = "Friday"
}

console.log(ndiaHoje);

app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: "Cloudy",
        texto7: `${texto7}`
    });

});

app.get('/weather', (req, resp) => {
    var address = req.query.local;
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GoogleAPIKey}`,
        json: true
    }, (error, response, body) => {
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;
        //console.log("latitude:"+lat);
        //console.log("longitude:"+lng);
        var formatted_address = body.results[0].formatted_address;


        //O segundo request tem de estar dentro do primeiro
        request({
            url: `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${lat},${lng}?units=si`,
            json: true
        }, (DSerror, DSresponse, DSbody) => {
            var temperature = DSbody.currently.temperature;
            var apparentTemperature = DSbody.currently.apparentTemperature;
            var humidade = DSbody.currently.humidity * 100;
            var uvIndex = DSbody.currently.uvIndex;
            var precipitacao = DSbody.currently.precipProbability * 100;
            var icone = DSbody.currently.icon;
            var summary = DSbody.currently.summary;
            var vento = DSbody.currently.windSpeed;
            var pressao = DSbody.currently.pressure;
            var visibilidade = DSbody.currently.visibility;
            console.log(summary);
            var today = new Date(DSbody.currently.time * 1000);
            var horas = today.getHours();
            var minutos = today.getMinutes();
            var segundos = today.getSeconds();
            console.log("The temperature is: " + temperature);
            console.log("It feels like: " + apparentTemperature);
            console.log(formatted_address);
            //Temperaturas Máximas e Minimas do primeiro ao sétimo dia da semana
            var PrimeiroHigh = DSbody.daily.data[0].temperatureMax;
            var PrimeiroLow = DSbody.daily.data[0].temperatureMin;
            var SegundoHigh = DSbody.daily.data[1].temperatureMax;
            var SegundoLow = DSbody.daily.data[1].temperatureMin;
            var TerceiroHigh = DSbody.daily.data[2].temperatureMax;
            var TerceiroLow = DSbody.daily.data[2].temperatureMin;
            var QuartoHigh = DSbody.daily.data[3].temperatureMax;
            var QuartoLow = DSbody.daily.data[3].temperatureMin;
            var QuintoHigh = DSbody.daily.data[4].temperatureMax;
            var QuintoLow = DSbody.daily.data[4].temperatureMin;
            var SextoHigh = DSbody.daily.data[5].temperatureMax;
            var SextoLow = DSbody.daily.data[5].temperatureMin;
            var SetimoHigh = DSbody.daily.data[6].temperatureMax;
            var SetimoLow = DSbody.daily.data[6].temperatureMin;


            resp.render('meteo.hbs', {
                texto: req.query.local, textoTempAparente: apparentTemperature, textoHumidade: humidade, textoPrecipitacao: precipitacao, texto8: req.query.local,
                texto9: SetimoHigh, texto10: SetimoLow, texto11: PrimeiroHigh, texto12: PrimeiroLow, texto13: SegundoHigh, texto14: SegundoLow, texto15: TerceiroHigh, texto16: TerceiroLow,
                texto17: QuartoHigh, texto18: QuartoLow, texto19: QuintoHigh, texto20: QuintoLow, texto21: SextoHigh, texto22: SextoLow, tempAtual: temperature, info: "It's " + temperature + " ºC, the maximum temperature expected for today is " + PrimeiroHigh + " ºC.",
                subtitulo: summary, textoVento: vento, textoUv: uvIndex, textoPressao: pressao, textoVisibilidade: visibilidade, hoje: ndiaHoje, amanha: ndiaAmanha, amanha2: ndiaAmanha2, amanha3: ndiaAmanha3, amanha4: ndiaAmanha4, amanha5: ndiaAmanha5, amanha6: ndiaAmanha6,
                icone1: icone
            });

        });
    });

});


app.get('/getFavorite', (req, resp) => {
    var address = req.query.comboBox;
    //if (address == undefined) {
    // resp.send('You don´t have favorites, go back to the home page: http://localhost:3300');
    // }
    //else {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GoogleAPIKey}`,
        json: true
    }, (error, response, body) => {
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;
        //console.log("latitude:"+lat);
        //console.log("longitude:"+lng);
        var formatted_address = body.results[0].formatted_address;


        //O segundo request tem de estar dentro do primeiro
        request({
            url: `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${lat},${lng}?units=si`,
            json: true
        }, (DSerror, DSresponse, DSbody) => {
            var temperature = DSbody.currently.temperature;
            var apparentTemperature = DSbody.currently.apparentTemperature;
            var humidade = DSbody.currently.humidity * 100;
            var uvIndex = DSbody.currently.uvIndex;
            var precipitacao = DSbody.currently.precipProbability * 100;
            var summary = DSbody.currently.summary;
            var vento = DSbody.currently.windSpeed;
            var pressao = DSbody.currently.pressure;
            var visibilidade = DSbody.currently.visibility;
            console.log(summary);
            var today = new Date(DSbody.currently.time * 1000);
            var horas = today.getHours();
            var minutos = today.getMinutes();
            var segundos = today.getSeconds();
            console.log("The temperature is: " + temperature);
            console.log("It feels like: " + apparentTemperature);
            console.log(formatted_address);
            //Temperaturas Máximas e Minimas do primeiro ao sétimo dia da semana
            var PrimeiroHigh = DSbody.daily.data[0].temperatureMax;
            var PrimeiroLow = DSbody.daily.data[0].temperatureMin;
            var SegundoHigh = DSbody.daily.data[1].temperatureMax;
            var SegundoLow = DSbody.daily.data[1].temperatureMin;
            var TerceiroHigh = DSbody.daily.data[2].temperatureMax;
            var TerceiroLow = DSbody.daily.data[2].temperatureMin;
            var QuartoHigh = DSbody.daily.data[3].temperatureMax;
            var QuartoLow = DSbody.daily.data[3].temperatureMin;
            var QuintoHigh = DSbody.daily.data[4].temperatureMax;
            var QuintoLow = DSbody.daily.data[4].temperatureMin;
            var SextoHigh = DSbody.daily.data[5].temperatureMax;
            var SextoLow = DSbody.daily.data[5].temperatureMin;
            var SetimoHigh = DSbody.daily.data[6].temperatureMax;
            var SetimoLow = DSbody.daily.data[6].temperatureMin;


            resp.render('meteo.hbs', {
                texto: req.query.comboBox, textoTempAparente: apparentTemperature, textoHumidade: humidade, textoPrecipitacao: precipitacao, texto8: req.query.comboBox,
                texto9: SetimoHigh, texto10: SetimoLow, texto11: PrimeiroHigh, texto12: PrimeiroLow, texto13: SegundoHigh, texto14: SegundoLow, texto15: TerceiroHigh, texto16: TerceiroLow,
                texto17: QuartoHigh, texto18: QuartoLow, texto19: QuintoHigh, texto20: QuintoLow, texto21: SextoHigh, texto22: SextoLow, tempAtual: temperature, info: "It's " + temperature + " ºC, the maximum temperature expected for today is " + PrimeiroHigh + " ºC.",
                subtitulo: summary, textoVento: vento, textoUv: uvIndex, textoPressao: pressao, textoVisibilidade: visibilidade, hoje: ndiaHoje, amanha: ndiaAmanha, amanha2: ndiaAmanha2, amanha3: ndiaAmanha3, amanha4: ndiaAmanha4, amanha5: ndiaAmanha5, amanha6: ndiaAmanha6
            });

        });
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: "About Us"
    });
});

app.listen(3300);//escuta a porta 3300, cada computador tem milhares de portas, não pode haver dois serviços a escutar uma porta
//a porta continua a mesma para todas as rotas