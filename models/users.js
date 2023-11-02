const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');
const AVATAAR_PATH = path.join('/uploads/users/avataars');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required:true
    },
    avataar:{
        type: String
    }

},{
    timestamps:true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

//statics methods
userSchema.statics.uploadedAvataar= multer({storage:storage}).single('avataar');
userSchema.statics.avataarPath=AVATAAR_PATH;



const User = mongoose.model('User',userSchema);
module.exports = User;