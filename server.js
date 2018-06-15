const express = require('express');
const app = express();
const hbs = require('hbs');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public")); //o dirname dá sempre o caminho até onde o servidor esta a ser executado. Assim, se houver um pedido para um ficheiro, vai ver a pasta public, se estiver la, serve-o

app.get('/', (request, response) => {
    response.render('template.hbs', {
       title: "Welcome to this site!",
       text: "Hello from the Express..."
    });
    //response.send("<h1>Hello from Express!</h1><p>Welcome to this site!</p>")
});

app.get('/about', (request, response) => {
    response.render('template.hbs', {
        title: "About my site",
        text: "This a website for meteorology"
     });
    });

//app.get('/sobre', (request, response) => {
//  response.send({
//    nome: 'Mariana',
//  interesses: ['jogar', 'passear', 'comer']
//  });
// }); 

app.get('/carochao', (request, response) => {
    var date = new Date().getHours().toString();
    console.log(date);
    var tempo;
    
    if(date >= 20 || date <= 6){
        var tempo = "Boa noite!";
    }
    if(date > 6 && date <= 12){
        var tempo = "Bom dia!";
    }
    if(date > 12 && date < 20){
        var tempo = "Boa tarde!";
    }
    response.render('template.hbs', {
        title: "Current time:",
        text: `${tempo}`
     });
    //response.send(`<h1>Current time: </h1><p>${date}</p>`); //toString, pois caso contrário corro o risco de ele achar que isto é um objeto
}); 

app.listen(3000);//escuta a porta 3000, cada computador tem milhares de portas, não pode haver dois serviços a escutar uma porta
//a porta continua a mesma para todas as rotas