var express = require('express');
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    loginHistory: [{
        ip: String,
        date: Date,
        browser: String,
        device: String,
    }],
    banned: Boolean,
    token: String,
});
const User = mongoose.model('User', userSchema);
var dbResponse = 200;
const DATABASE_URL = 'mongodb://localhost:27017/mongoDB'
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
    dbResponse = 200;
});
mongoose.connection.on('error', error => {
    dbResponse = error;
});
userSchema.methods.resetPassword = async function (email) {
    let user = await this.findOne({
        email: email,
    });
    if (!user) {
        return -1;
    }
    return user;
};
userSchema.methods.changePassword = function (err, newPassword) {
    if (err) { return err; }
    bcrypt.hash(newPassword, saltRounds, function(err, hash) {
        if (err) { return err; }
        this.updateOne({password: hash});
    })
};
userSchema.methods.changeUsername = function (err, newUsername) {
    if (err) { return err; }
    this.username = username;
};
userSchema.statics.findByEmail = function(email) {
    this.findOne({ email: new RegExp(email, 'i')});
    this.save();
};
userSchema.statics.addUser = function (user) {
    this.add
}
function findUser(email, password) {
    let user = User.find({
        email: email,
        password: password,
    })
}
bcrypt.hash('lala', saltRounds, function(err, hash) {
    console.log(hash);
})
module.exports = {
    userSchema,
    mongoose,
    User,
    dbResponse,
};