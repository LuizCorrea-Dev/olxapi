const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
   name: String,
});

const modelName = 'State';

if(mongoose.connection && mongoose.connection.models[modelName]) { // se existir conexão e exister o model 
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}