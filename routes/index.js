var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var $ = require("jquery");
var url = "mongodb://admin:admin2018@ds247170.mlab.com:47170/sdafinal";
var io = require('../io');

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

router.get('/humidity', function(req, res, next){
  res.render('humidity.ejs', {});
});

router.post('/humidity', function(req, res, next){
  var data=req.body;
  io.emit('esp8266', data);
  res.send(req.body)
});

router.get('/records', function(req, res, next){
  var resultArray = [];

  mongo.connect(url, function(err, db) {

    assert.equal(null, err);
    var cursor = db.collection('records').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {

      db.close();
      console.log(resultArray)
      res.render('records.ejs');
  $(document).ready(function() {

  getData();

  function getData() {
    $.ajax({
      url: 'https://jsfiddle.net/echo/jsonp/',
      method: 'GET',
      data: {
        array: a1
      },
      dataType: "jsonp",
      error: function(xhr, status, error) {
        console.log(status, error);
      },
      success: function(json) {
        console.log(json);
        var tr;
        $.each(a1, function(k, v) {
          tr = $("<tr></tr>");
          tr.append("<td>" + v.name + "</td>");
          tr.append("<td>" + v.category + "</td>");
          tr.append("<td>" + v.amount + "</td>");
          tr.append("<td>" + v.location + "</td>");
          tr.append("<td>" + v.date + "</td>");
          $("#invList").append(tr);
        });
      }
    });
  }
});

    });

 });
});

router.post('/records-save', function(req, res, next){
  var newContact = req.body;
  if (!req.body.name) {
  handleError(res, "Invalid user input", "Must provide a name.", 400);
}

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
  if (err) {
    handleError(res, err.message, "Failed to create new contact.");
  } else {
    res.status(201).json(doc.ops[0]);
  }
});

});

router.delete('/records', function(req, res, next){
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = router
