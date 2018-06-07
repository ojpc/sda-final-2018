var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var io = require('../io');
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect( "mongodb://admin:admin2018@ds247170.mlab.com:47170/sdafinal", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");
});
router.get('/', function(req, res, next){
  res.render('index.ejs');

});

router.get('/temperature', function(req, res, next){
  res.render('temperature.ejs', {});
});

router.post('/temperature', function(req, res, next){
  var data=req.body;
  io.emit('esp8266', data);
  res.send(req.body)
});

router.post('/saverecord', function(req, res, next){
  console.log(req.body)
  var newRecord={
    "temp":req.body.temp,
    "hum":req.body.hum,
    "pos":req.body.pos,
    "id":req.body.id,
    "timestamp":req.body.timestamp
  }
  db.collection('records').insertOne(newRecord, function(err, doc) {
  if (err) {
    handleError(res, err.message, "Failed to create new contact.");
  } else {
    res.status(201).json(doc.ops[0]);
  }
});
});

router.get('/humidity', function(req, res, next){
  res.render('humidity.ejs', {});
});

router.post('/humidity', function(req, res, next){
  var data=req.body;
  io.emit('esp8266', data);
  res.send(req.body)
});

router.get('/records', function(req, res, next){
  res.render('records.ejs');
});

router.post('/getrecords', function(req, res, next){
  var resultArray = [];
    var cursor = db.collection('records').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      res.send(resultArray);
    });

});
module.exports = router
