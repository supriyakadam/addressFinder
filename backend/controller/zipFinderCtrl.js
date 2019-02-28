
var addressModel = require('.././model/address.js');
var controller = {
    getCountries: function (data, callback) {
        addressModel.aggregate([{
            $group: {
                _id: '$country'
            }
        }]).exec(callback)
    },
    getStatesFromCountry: function (data, callback) {
        addressModel.aggregate([{
                $match: {
                    country: data.query.country
                }
            },
            {
                $group: {
                    _id: '$state'
                }
            }
        ]).exec(callback)
    },
    getCitiesFromState: function (data, callback) {
        addressModel.find({
            state: data.query.state
        }, "city").exec(callback)
    },
    getZipCodeFromAddress: function (data, callback) {
        addressModel.findOne({
            country: data.query.country,
            state: data.query.state,
            city: data.query.city
        }, "zipcode").exec(callback);
    }

}
module.exports = controller;