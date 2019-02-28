var mongoose = require('mongoose')
var Schema = mongoose.Schema
  var addressSchema = new Schema({
    country:
    {
      type:String,
      unique:true},
    state:{
      type:String,
      unique:true
    },
    city:{
      type:String,
      unique:true
    },
    zipcode:{type:String,
      unique:true}
});
var address = mongoose.model('address', addressSchema);
module.exports = address;
