/*
 * rpi-gpio API implementation
 */

// what pins are valid for control?
//var validOutputPins = [ 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 21, 22, 23, 24, 26 ];
//var validInputPins = [ 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 21, 22, 23, 24, 26 ];
var validOutputPins = [ 7 ];
var validInputPins = [ 7 ];

// setup gpio access (probably need root access for this)
var gpio = require('rpi-gpio');
var pin = null;

exports.readPin = function(req, res) {
  pin = parseInt(req.params.pin);
  if (validInputPins.indexOf(pin) == -1) {
    res.json({ 
      operation: 'readPin',
      pin: req.params.pin,
      result: 'error',
      error: 'Invalid pin'
    });
    return;
  }
  
  var value = 99; // temporary - get this from rpi-gpio
  
  res.json({ 
    operation: 'readPin', 
    pin: pin,
    result: 'success',
    value: 99
  });
};

exports.writePin = function(req, res) {
  pin = parseInt(req.params.pin);
  if (validOutputPins.indexOf(pin) == -1) {
    res.json({
      operation: 'writePin',
      pin: req.params.pin,
      value: req.params.value,
      result: 'error',
      error: 'Invalid pin'
    });
    return;
  }
  
  var value = parseInt(req.params.value);
  if (value != 0 && value != 1)
  {
    res.json({
      operation: 'writePin',
      pin: req.params.pin,
      value: value,
      result: 'error',
      error: 'Invalid value'
    });
    return;
  }
  
  if (value == 1) {
	gpio.setup(pin, gpio.DIR_OUT, pinHigh);
  } else {
	gpio.setup(pin, gpio.DIR_OUT, pinLow);
  }
  
  res.json({ 
    operation: 'writePin', 
    pin: pin,
    value: value,
    result: 'success'
  });
};

// pin control functions
function pinHigh() {
  gpio.write(pin, true, function(err) {
    if (err) throw err;
    console.log('Pin ' + pin + ' output set to High');
  });
}

function pinLow() {
  gpio.write(pin, false, function(err) {
    if (err) throw err;
    console.log('Pin ' + pin + ' output set to Low');
  });
}


