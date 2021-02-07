const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const User = require('../models/User');
const State = require('../models/State');

module.exports = {
    // para fazer login
    signin: async (req,res) => {

        // messagem de erro
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // tem algum erro?
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

        //validando o e-mail
        const user = await User.findOne({email: data.email}); // procuara o email no bd
        if(!user) { // se ele não achar
            res.json({error: 'E-mail errado!'}); // E-mail e ou  senha errados
            return;
        }

        // validando a senha
        const match = await bcrypt.compare(data.password, user.passwordHash);
        if(!match) { // se não deu match
            res.json({error: 'Senha errada!'}); // E-mail e ou  senha errados
            return;
        }

        // validado o e-mail e a senha, gerar um token novo salvar no usuário e retornar este token novo para o usuário

        // gerar um token do usuário recem criado
        const payload = (Date.now() + Math.random()).toString(); // milissegundos da data atual + um numero aleatório = token aleatório
        const token = await bcrypt.hash(payload, 10);

        user.token = token; // salva este novo token
        await user.save();  // atualizado

        res.json({token, email: data.email});
        console.log('Logado ' +token)

    },

    // para fazer cadastro
    signup: async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // tem algum erro?
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

        // verifica se o email já está cadastrado no sistema
        const user = await User.findOne({
            email: data.email // procura o email no bd
        });
        if(user) { // se achou o usuário com este email
            res.json({
                error: {email:{msg: 'E-mail já existe'}}
            });
            return;
        }

        // verificando se o estado existe
        if(mongoose.Types.ObjectId.isValid(data.state)) {
            // vedifica se o dado é um objetoId válido
            
            const stateItem = await State.findById(data.state);
            if(!stateItem) { // se não achar um estado
                res.json({
                    error: {state:{msg: 'Estado já existe'}}
                });
                return;
            }
        } else {
            res.json({
                error: {state:{msg: 'Código de estado inválido'}}
            });
            return;
        }

        // agora que pasou em todas a validações e teste, agora será criado o usuário

        // processo de criar o rash da senha
        const passwordHash = await bcrypt.hash(data.password, 10); //criptografia da senha

        // gerar um token do usuário recem criado
        const payload = (Date.now() + Math.random()).toString(); // milissegundos da data atual + um numero aleatório = token aleatório
        const token = await bcrypt.hash(payload, 10);

        // criar o usuário

        const newUser = new User({ // dados do usuário
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });
        await newUser.save(); // salvar o usuário      

        // se deu tudo certo
        res.json({token});
    }    
};