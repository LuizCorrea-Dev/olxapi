const Category = require('../models/Category');


module.exports = {

    // listar as categorias
    getCategories: async (req,res) => { 
        const cats = await Category.find(); // pegar todas a catagorias

        let categories = [];
        
        for(let i in cats) {
            categories.push({
                ...cats[i]._doc,// copiar cats
                //url do avatar da categoria
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png` // adiciona a imagem do avatar e slug
            });
        }

        res.json({categories}); // retorna
    },

    // adicionar um anuncio
    addAction: async (req,res) => { 

    },

    // lista de anuncios
    getList: async (req,res) => { 

    },

    // pegar informações de um anuncio 
    getItem: async (req,res) => { 

    },

    // alterar informações do anuncio
    editAction: async (req,res) => { 

    },


};