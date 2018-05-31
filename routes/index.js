var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
  res.render('index.ejs');

});

router.get('/temperature', function(req, res, next){
  res.render('temperature.ejs', { temperature1: "23 °C", temperature2: "19 °C", temperature3: "21 °C",
pos1:"6.235302, -75.578655", pos2:"6.223331, -75.580342", pos3:"6.270373, -75.565268",disp1:"D001",disp2:"D025",disp3:"D010" });
});

router.get('/humidity', function(req, res, next){
  res.render('humidity.ejs', { humedad1: "70 %", humedad2: "64 %", humedad3: "56 %",
pos1:"6.235302, -75.578655", pos2:"6.223331, -75.580342", pos3:"6.270373, -75.565268",disp1:"D001",disp2:"D025",disp3:"D010" });
});

router.get('/records', function(req, res, next){
  res.render('records.ejs');

});

router.post('/records', function(req, res, next){
  var newContact = req.body;

});

router.delete('/records', function(req, res, next){
});

module.exports = router
