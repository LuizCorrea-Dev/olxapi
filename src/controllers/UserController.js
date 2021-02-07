const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

module.exports = {
    // estado do usuário
    getStates: async (req,res) => { 
        let states = await State.find(); // pega todos os dados da tabela states
        res.json({states}); // retorna todos os estado da lista
        console.log('getStates');  
    },

    // informações do próprio usuário
    info: async (req,res) => {
        let token = req.query.token;

        const user = await User.findOne({token}); // achar o usuário pelo token
        const state = await State.findById(user.state); // acha o estado o usuário
        const ads = await Ad.find({idUser: user._id.toString()}); // anuncio salvos com este usuário

        let adList = [];
        for(let i in ads){
            const cat = await Category.findById(ads[i].category);
            adList.push({ ...ads[i], category: cat.slug });
        }

        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        }); 

        console.log('info');   
    },

    // trocar informações do próprio
    editAction: async (req,res) => {

        // messagem de erro
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // tem algum erro?
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);
     
        // atualizar só as informações alteradas
        let updates = {};

        //*atualizar name ↓
            if(data.name) { // se name está preenchido
                updates.name = data.name;  // então pode atualizar
                console.log('atualizado o name para: '+data.name);
            }

        //*atualizar email ↓
            if(data.email) { // se email está preenchido
                
                // procura o email, para não haver dublicidade de email no bd
                const emailCheck = await User.findOne({email: data.email}); 
                
                // se achou o email no bd
                if(emailCheck){
                    res.json({error: 'E-mail já existente!'});
                    return;
                }

                // se NÃO achou o email no bd
                updates.email = data.email; // então pode atualizar
                console.log('atualizado o email para: '+data.email);
            }

        //*atualizar state ↓
            if(data.state) { // se state está preenchido
                if(mongoose.Types.ObjectId.isValid(data.state)) {
                                        
                    // verifica se o state existe
                    const stateCheck = await State.findById(data.state); 
                    if(!stateCheck){ // se não existe
                        res.json({error: 'Estado não existe'});
                        return;
                    }

                    updates.state = data.state;  // se nao houve erro, então pode atualizar
                    console.log('atualizado o state para: '+data.state);
                } else {
                    res.json({error: 'Código de estado inválido'});
                    return;
                }    
            }

        //*atualizar password ↓
        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password, 10);
            console.log('atualizado o senha para: '+data.password);
        }

        // comando ache um e atualize
        await User.findOneAndUpdate({token: data.token}, {$set: updates});

        res.json({});
        console.log('editAction'); 

    },
};