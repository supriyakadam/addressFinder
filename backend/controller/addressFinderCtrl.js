var addressModel = require('.././model/address.js');
var NodeGeocoder = require('node-geocoder');
var controller = {
    getAddress: function (data, callback) {
        var options = {
            provider: 'google',
            httpAdapter: 'https',
            apiKey: 'AIzaSyDJ38xo1UwkL4mvmMD-2VouAPkDGTS01ac',
            formatter: null
        };
        var geocoder = NodeGeocoder(options);
        geocoder.geocode({
            address: data.query.zipcode
        }, function (err, res) {
            //console.log("----------------",res.length,res[0].city,res[0].country,res[0].administrativeLevels)
            if (res.length==1 && res[0].administrativeLevels && res[0].country && res[0].city) {
                callback(err, {
                    country: res[0].country,
                    state: res[0].administrativeLevels.level1long,
                    city: res[0].city,
                })
            } else {
                callback(err,"Invalid zip");
            }
        });
    }
}
module.exports = controller;