const mongoose = require('mongoose');
const config = require('../config/config.json');

module.exports = function() {
    mongoose.set('strictQuery', true);
    mongoose.connect(config.DATABASE_URL).then(() => {
        console.log("Sucessfully Connected To The Database");
    }).catch((error) => {
        console.log(error)
    });
}