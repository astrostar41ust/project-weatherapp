const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    timestamp: Date,
    temperature: Number,
    city: String,
    country: String,
    wind: String,
    percentOfclouds: String,
    humidity: String,
    nickName: String,
    pressure: String,
    degreeOfwind: String
})

UserSchema.pre('save', async function(next) {
    const user = this;
    const saltRounds = 10; 

    if (user.isModified('nickName')) {
        try {
            const hashednickName = await bcrypt.hash(user.nickName, saltRounds);
            user.nickName = hashednickName;
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