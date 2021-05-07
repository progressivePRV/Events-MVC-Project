const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    firstName:{
        type: String,
        required : [true,'first name cannot be empty']
    },
    lastName:{
        type: String,
        required : [true,'last name cannot be empty']
    },
    email:{
        type: String,
        required: [true, 'email cannot be empty'],
        validate: {
            validator: function(v) {
              return  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email ID!`
        },
        unique: true
    },
    password:{
        type:String,
        required: [true, 'password cannot be empty'],
        minLength: [8, 'Password should have at least 8 charcters']
    }
});

// replace  plaintext password with hashed password before saving the document in the db.
userSchema.pre('save',function(next){
    let user = this;
    if (!user.isModified('password') || user.password.length<8 )
        return next();
    bcrypt.hash(user.password,10)
    .then(hash=>{
        user.password = hash;
        next();
    })
    .catch(err => next(err));
});

// implement a method to compare login password and stored hash
userSchema.methods.comparePassword = function(loginPassword){
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model ('User',userSchema);