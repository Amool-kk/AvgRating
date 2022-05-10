const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id:{
        type: String,
        required : true
    },
    moviesName :{
        type: String,
        required : true
    },
    rating:{
        type : String,
        required : true
    }
})

const movieData = mongoose.model('movieData',movieSchema);

module.exports = movieData;