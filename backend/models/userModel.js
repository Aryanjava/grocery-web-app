const mongoose  = require("mongoose");
const validator  = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          
    },
    role:{
        type:String,
        default:"user",

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){                                       // we are not using arrow function here because we are using this keyword
      
    if(!this.isModified("password")){
         next();
    }

     this.password = await bcrypt.hash(this.password,10)

});

// JWT Token

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// Compare Password 

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User",userSchema)


