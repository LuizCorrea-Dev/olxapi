const { checkSchema } = require('express-validator');

module.exports = {
    
    editAction: checkSchema({ // regras de alteração no cadastro

        token: {
            notEmpty: true
        },
        
        name: {

            optional:true,
            trim: true, // remove todos eo expaços do inicio e fim da string
            isLength:{
                options: { min: 2 } // pelo menos 2 caracteres
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'

        },
        email: {

            optional:true,
            isEmail: true, // só email
            normalizeEmail: true, // estilo de email
            errorMessage: 'E-mail inválido'

        },
        password: {

            optional:true,
            isLength:{
                options: { min: 2 } // pelo menos 2 caracteres
            },
            errorMessage:'Senha precisa ter pelo menos 2 caracteres'

        },
        state: {

            optional:true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'

        }
    }),
};