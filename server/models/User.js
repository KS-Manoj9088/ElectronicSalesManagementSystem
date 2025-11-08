import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    addressLine1 : {
        type :String,
        required : true,
    },
    addressLine2 : {
        type : String,
    },
    city : {
        type : String,
        required : true,
    },
    state:{
        type:String,
        required : true,
    },
    pincode:{
        type:String,
        required : true,
    },
    isDefault:{
        type:Boolean,
        default : false,
    },
});

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please add a name'],
        trim : true,
    },
    email : {
        type : String,
        required : [true, 'Please add an email'],
        unique : true,
        lowercase : true,
        trim :true,
    },
    password : {
        type : String,
        required : [true, 'Please add a password'],
        minLength : 6,
        select : false,
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user',
    },
    addresses : [addressSchema],
    phone : {
        type : String,
        trim : true,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
},
{
    timestamps : true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;