const { checkSchema } = require('express-validator');

module.exports = {
    
    signup: checkSchema({ // regras de cadastro
        
        name: {

            trim: true, // remove todos eo expaços do inicio e fim da string
            isLength:{
                options: { min: 2 } // pelo menos 2 caracteres
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'

        },
        email: {

            isEmail: true, // só email
            normalizeEmail: true, // estilo de email
            errorMessage: 'E-mail inválido'

        },
        password: {

            isLength:{
                options: { min: 2 } // pelo menos 2 caracteres
            },
            errorMessage:'Senha precisa ter pelo menos 2 caracteres'

        },
        state: {

            notEmpty: true,
            errorMessage: 'Estado não preenchido'

        }
    }),

    signin: checkSchema({ // regras de login

        email: {

            isEmail: true, // só email
            normalizeEmail: true, // estilo de email
            errorMessage: 'E-mail inválido'

        },
        password: {

            isLength:{
                options: { min: 2 } // pelo menos 2 caracteres
            },
            errorMessage:'Senha precisa ter pelo menos 2 caracteres'

        },
        
    })
};