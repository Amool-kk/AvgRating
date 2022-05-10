const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    tokens : [{
        tokenid:{
            type:String,
            required:true
        }
    }]
})

userSchema.methods.genrateToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.KEY)
        this.tokens = this.tokens.concat({tokenid:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(`error in genrate token is : ${error}`)
    }
}

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})

const userDb = mongoose.model('userDb',userSchema)

module.exports = userDb