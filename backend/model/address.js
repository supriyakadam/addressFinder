var mongoose = require('mongoose')
var Schema = mongoose.Schema
var addressSchema = new Schema({
  country: {
    type: String,
    required:true
  },
  state: {
    type: String,
    required:true
  },
  city: {
    type: String,
    unique: true,
    required:true
  },
  zipcode: {
    type: String,
    unique: true,
    required:true
  }
});
var address = mongoose.model('address', addressSchema);
module.exports = address;