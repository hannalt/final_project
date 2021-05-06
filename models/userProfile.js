const mongoose = require('mongoose');

//Schema add recovery questions and answers and imgs
const Schema = mongoose.Schema;
const UserProfileSchema = new Schema({
    username: String, 
    password: String,  
    question: String, 
    answer: String, 
})

//Model
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;