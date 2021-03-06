const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema =  new mongoose.Schema({
 
    FirstName:{
        type: String,
       
    },
    LastName:{
        type: String,
       
    },
    Username:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required:true,
    },
    Rooms: [{
        id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
        }
    }],
},{ getters: true });

UserSchema.virtual('FullName').get(function(){
        return `${this.FirstName} ${this.LastName}`;
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('Password'))
     return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.Password, salt, function(err, hash) {
            if (err) 
               return next(err);

            // override the cleartext password with the hashed one
            user.Password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.Password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
