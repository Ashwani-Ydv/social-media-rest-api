const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const userSchema = new Schema({
  // userId:{
  //   type:Schema.Types.ObjectId,
  //   required:true,
  //   ref:"users"
  // },
  name: {
    type: String,
    required: true
  },
  post:{
    type: String,
    required: true
  },
  profile:{
    type: String,
    required: true 
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },

  


})
module.exports = mongoose.model('User', userSchema)



