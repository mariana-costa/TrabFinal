const GoogleAPIKey = 'AIzaSyAV4BNqBJwhTX5i-DtnM3Ol1O2f7ydtpMI';
const DarkSkyAPIKey = '50a5a701e63a841bb6863966a830778e';

const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public")); //o dirname dá sempre o caminho até onde o servidor esta a ser executado. Assim, se houver um pedido para um ficheiro, vai ver a pasta public, se estiver la, serve-o

app.get('/', (request, response) => {
    response.render('index.hbs', {
       title: "Welcome to this site!",
      

      /* var date = new Date().getHours().toString();
       console.log(date);
       
       if(date >= 20 || date <= 6){
           var tempo = "Boa noite! São " + date + " horas da noite";
       }
       if(date > 6 && date <= 12){
           var tempo = "Bom dia! São " + date + " horas da manhã";
       }
       if(date > 12 && date < 20){
           var tempo = "Boa tarde! São " + date + " horas da tarde";
       }
       /*
    resp.render('index.hbs', {
        title: "Current time:",
        text: `${tempo}`
     });
     */
    //response.send(`<h1>Current time: </h1><p>${date}</p>`); //toString, pois caso contrário corro o risco de ele achar que isto é um objeto
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
           console.log(formatted_address);
    
    //O segundo request tem de estar dentro do primeiro
           request({
            url: `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${lat},${lng}?units=si`,
            json: true
          }, (DSerror, DSresponse, DSbody) => {
                  var temperature = DSbody.currently.temperature;
                  var apparentTemperature = DSbody.currently.apparentTemperature;
                  var humidade = DSbody.currently.humidity;
              var uvIndex = DSbody.currently.uvIndex;
              var precipitacao = DSbody.currently.precipProbability;
              var today = new Date(DSbody.currently.time * 1000);
              var horas = today.getHours();
              var minutos = today.getMinutes();
              var segundos = today.getSeconds();
              console.log("The temperature is: "+temperature);
              console.log("It feels like: "+apparentTemperature);
              var tempo;
                 
    resp.render('eco.hbs', {texto: req.query.local, texto2: "A temperatura é " + temperature, texto3: "A temperatura aparente é " + apparentTemperature, texto4: "A humidade é " + humidade, texto5: "A probabilidade de precipitação é " + precipitacao});

                 });
           });

    });

//app.get('/sobre', (request, response) => {
//  response.send({
//    nome: 'Mariana',
//  interesses: ['jogar', 'passear', 'comer']
//  });
// }); 

/*app.get('/carochao', (request, response) => {

    
}); 
 */
app.listen(3300);//escuta a porta 3300, cada computador tem milhares de portas, não pode haver dois serviços a escutar uma porta
//a porta continua a mesma para todas as rotas