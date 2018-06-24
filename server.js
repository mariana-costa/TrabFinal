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
if(date >= 20 || date <= 6){
    texto7 = "Boa noite!";
}
if(date > 6 && date <= 12){
    texto7 = "Bom dia!";
}
if(date > 12 && date < 20){
    texto7 = "Boa tarde!";
}

//var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


var d = new Date();
var ndia = d.getDay();
if(ndia == 0){
    ndia = "Domingo"
}
if(ndia == 1){
    ndia = "Segunda"
}
if(ndia == 2){
    ndia = "Terça"
}
if(ndia == 3){
    ndia = "Quarta"
}
if(ndia == 4){
    ndia = "Quinta"
}
if(ndia == 5){
    ndia = "Sexta"
}
if(ndia == 6){
    ndia = "Sábado"
}

console.log(ndia);

app.get('/', (request, response) => {
    response.render('index.hbs', {
       title: "Nome do site",
      texto7:`${texto7}`
    });
    
});

app.get('/weather', (req, resp) => {
    var address = req.query.local;
    var encodedAddress = encodeURIComponent(address);
    request({
           url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GoogleAPIKey}`,
           json: true
          }, (error, response, body) => {
           var lat=body.results[0].geometry.location.lat;
           var lng=body.results[0].geometry.location.lng;
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
                  var humidade = DSbody.currently.humidity*100;
              var uvIndex = DSbody.currently.uvIndex;
              var precipitacao = DSbody.currently.precipProbability*100;
              var summary = DSbody.currently.summary;
              var vento = DSbody.currently.windSpeed;
              var pressao = DSbody.currently.pressure;
              var visibilidade = DSbody.currently.visibility;
              console.log(summary);
              var today = new Date(DSbody.currently.time * 1000);
              var horas = today.getHours();
              var minutos = today.getMinutes();
              var segundos = today.getSeconds();
              console.log("The temperature is: "+temperature);
              console.log("It feels like: "+apparentTemperature);
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


    resp.render('eco.hbs', {texto: req.query.local, textoTempAparente: apparentTemperature, textoHumidade: humidade, textoPrecipitacao: precipitacao, texto8: req.query.local, 
    texto9: SetimoHigh, texto10: SetimoLow, texto11: PrimeiroHigh, texto12: PrimeiroLow,  texto13: SegundoHigh, texto14: SegundoLow, texto15: TerceiroHigh, texto16: TerceiroLow,
    texto17: QuartoHigh, texto18: QuartoLow, texto19: QuintoHigh, texto20: QuintoLow, texto21: SextoHigh, texto22: SextoLow, tempAtual: temperature, info: "Estão " + temperature + " ºC, a temperatura máxima prevista para hoje é de " + PrimeiroHigh  + " ºC.",
    subtitulo: summary, textoVento: vento, textoUv: uvIndex, textoPressao: pressao, textoVisibilidade: visibilidade
});

                 });
           });

    });

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: "About us"
     });
 });  

//app.get('/sobre', (request, response) => {
//  response.send({
//    nome: 'Mariana',
//  interesses: ['jogar', 'passear', 'comer']
//  });
// }); 


app.listen(3300);//escuta a porta 3300, cada computador tem milhares de portas, não pode haver dois serviços a escutar uma porta
//a porta continua a mesma para todas as rotas