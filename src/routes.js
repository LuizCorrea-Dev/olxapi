const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');


// teste de api
    router.get('/ping', (req, res)=>{
        res.json({pong: true});
    });
// fim de teste

router.get('/states', UserController.getStates); // estados cadastrados

//processos de autenticação
router.post('/user/signin', AuthValidator.signin, AuthController.signin) ; // para fazer login
router.post('/user/signup', AuthValidator.signup, AuthController.signup) ; // para fazer cadastro
 
// Usuário - perfil e edição do perfil
router.get('/user/me', Auth.private, UserController.info); // *privado* informações do próprio usuário
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction); // *privado* trocar informações do próprio usuário

// informações do anuncio
router.get('/categories', AdsController.getCategories); // listar as categorias
router.post('/ad/add', Auth.private, AdsController.addAction ); // *privado* adicionar um anuncio
router.get('/ad/list', AdsController.getList); // lista de anuncios
router.get('/ad/item', AdsController.getItem); // pegar informações de um anuncio expecifico
router.post('/ad/:id', Auth.private, AdsController.editAction); // *privado* alterar informações do anuncio



module.exports = router;