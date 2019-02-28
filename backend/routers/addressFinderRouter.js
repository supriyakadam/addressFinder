var express = require('express');
var router = express.Router();
var addressFinderCtrl = require('.././controller/addressFinderCtrl.js');
router.get('/getAddress', function (req, res) {
    addressFinderCtrl.getAddress(req,res.callback);
});
module.exports = router;