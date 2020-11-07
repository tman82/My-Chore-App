const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Chore = new Schema({
    choreImage: String,
    choreTitle: String,
    chorePerson: String,
    choreCompleted: String
});


module.exports = mongoose.model('Chore', Chore);