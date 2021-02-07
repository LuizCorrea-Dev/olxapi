require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

// routes
const apiRoutes = require('./src/routes.js');

//conexão com o banco de dados
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', () => { // se der erro na conexão
        console.log("Erro: ", error.message);
    });
   
// criação do servidor
    const server = express();

    server.use(cors()); // habilita a receber requisições de qualquer lugar
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    server.use(fileupload());

    server.use(express.static(__dirname+'/public'));


// rotas
server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`- Rodando no endereço: ${process.env.BASE}`);
});