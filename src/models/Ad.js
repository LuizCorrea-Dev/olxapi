const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
   idUser: String,
   state: String,
   category: String,
   images: [Object],
   dateCreated: Date,
   title: String,
   price: Number,
   priceNegotiable: Boolean,
   description: String,
   views: Number,
   status: String
});

const modelName = 'Ad';

if(mongoose.connection && mongoose.connection.models[modelName]) { // se existir conexão e exister o model 
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}