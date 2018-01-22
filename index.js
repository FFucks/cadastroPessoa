const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
var nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/pessoa', (req, res) => {
    database.savePessoa(req.body, function(pessoaSalva){
        res.send(pessoaSalva);
        
    });
});

app.get('/pessoa', (req, res) => {
    database.listPessoa(function(pessoas){
        //res.send(pessoas);
        res.render('all.njk', { listaPessoas: pessoas })
    });
});

app.get('/pessoa/:id', (req, res) => {
    database.findOnePessoa(req.params.id, (pessoa) => {
        res.send(pessoa);
    })
});

app.delete('/pessoa/:id', (req, res) => {
    database.deletePessoa(req.params.id, (mensagem) => {
        res.send(mensagem);
    })
});



app.listen(3000, () => console.log('Example app listening on port 3000!'))
