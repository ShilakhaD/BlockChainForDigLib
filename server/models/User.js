const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
});

// UserSchema.methods.generateHash = function(password){
//   bcrypt.hash(password, 10, function(err, hash) {
//     if(err){
//       return err
//     }
//     return hash
//   });
  
// }


UserSchema.methods.validPassword = function(password){
  // bcrypt.compare(password, password, function(err, res) {
  //   if(res) {
  //     console.log("Passwords match")    
  //   } else {

  //     console.log("do not match", password, password)
  //   } 
  // });
  if (password == this.password){
    return true
  }
  else{
    return false
  }
}

module.exports = mongoose.model('User', UserSchema);
