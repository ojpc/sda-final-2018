var Board = require('firmata');
var arduino = new Board('/dev/ttyACM0');
var io = require('./io');
arduino.on('ready', function(){
  console.log("Arduino connected");
  arduino.setSamplingInterval(10000);
  arduino.digitalRead(8, function(value) {
    //io.emit('read', value);
  });
})

module.exports = arduino;
