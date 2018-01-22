var mongoose = require('mongoose');
mongoose.connect('mongodb://Fucks:84977412@ds111138.mlab.com:11138/fucks-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    //connected
});


var pessoaSchema = mongoose.Schema({
    name : String
});

pessoaSchema.methods.speak = function () {
    var greeting = this.name 
        ? 'My name is:' + this.name 
        : 'I dont have a name';
    console.log(greeting);  
}

var Pessoa = mongoose.model('Pessoa', pessoaSchema);

var savePessoa = function(pessoa, callback){
    var novaPessoa = new Pessoa(pessoa);
    
    novaPessoa.save(function (err, novaPessoa) {
        if (err) return console.error(err);
        callback(novaPessoa);
      });
}

var listPessoa = function(callback){
    Pessoa.find(function (err, pessoas) {
        if (err) return console.error(err);
        callback(pessoas);
      });
}

var deletePessoa = function(id, callback){
    Pessoa.findByIdAndRemove(id, function(){
        callback('DELETADO');
    })
}

var findOnePessoa = function(id, callback){
    Pessoa.findById(id, function(err, found){
        if (err) return console.error(err);
        callback(found ? found : 'NENHUM');
    });
}


module.exports = {
    modelPessoa: Pessoa,
    savePessoa: savePessoa,
    listPessoa: listPessoa,
    deletePessoa: deletePessoa,
    findOnePessoa: findOnePessoa
}

