const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    timestamp : Date,
    temperature : Number,
    weather_description : String,
    city : String,
    country : String
  
})

UserSchema.pre('save', async function(next) {
    const user = this;
    const saltRounds = 10; 

    if (user.isModified('weather_description')) {
        try {
            const hashedWeather_des = await bcrypt.hash(user.weather_description, saltRounds);
            user.weather_description = hashedWeather_des;
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        return next();
    }
});


const User = mongoose.model('data',UserSchema)
module.exports = User
