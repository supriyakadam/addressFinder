var express = require('express');
var router = express.Router();
var zipFinderCtrl = require('.././controller/zipFinderCtrl.js');
router.get('/getAddress', function (req, res) {
    zipFinderCtrl.getAddress(req,res.callback);
});

router.get('/getCountries', function (req, res) {
    zipFinderCtrl.getCountries(req.body,res.callback);
});

router.get('/getStates', function (req, res) {
      zipFinderCtrl.getStatesFromCountry(req,res.callback);
});

router.get('/getCities', function (req, res) {
    zipFinderCtrl.getCitiesFromState(req,res.callback);
});

router.get('/getZipCode', function (req, res) {
    zipFinderCtrl.getZipCodeFromAddress(req,res.callback);
});

module.exports = router;