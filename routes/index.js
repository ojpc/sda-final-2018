var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
  res.render('index.ejs');

});

router.get('/temperature', function(req, res, next){
  res.render('temperature.ejs', { temperature: "23 °C" });
});

router.get('/humidity', function(req, res, next){
  res.render('humidity.ejs', { humidity: "70 %" });
});

router.get('/records', function(req, res, next){
  res.render('records.ejs');
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
   if (err) {
     handleError(res, err.message, "Failed to get contacts.");
   } else {
     res.status(200).json(docs);
   }
 });
});

router.post('/records', function(req, res, next){
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
});

module.exports = router
