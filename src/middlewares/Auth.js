const User = require('../models/User');

module.exports = {
    private: async (req, res, next) => {
        //se recebeu uma requisição via query ou body com token
        if(!req.query.token && !req.body.token) {
            res.json({notallowed: true}); // para aqui
            return;
        }

        // verificar se o token é válido ↓
        let token = "";

        if(req.query.token) {
            token=req.query.token;
        }
        if(req.body.token) {
            token=req.body.token;
        }

        if(token == '') { // se o token é vazio 
            res.json({notallowed: true}); 
            console.log('token é vazio')
            // para aqui
            return;
        }

        // procurar o usuário baseado no token
        const user = await User.findOne({token});

        if(!user) { // se não achou o usuário
            res.json({notallowed: true});
            console.log('não achou o usuário')
            // para aqui
            return;
        }

        next();
    }
};