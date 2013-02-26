/*
 * rpi-gpio API implementation
 */

 // what pins are valid for control?
var validOutputPins = [ 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 21, 22, 23, 24, 26 ];
var validInputPins = [ 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 18, 19, 21, 22, 23, 24, 26 ];

exports.readPin = function(req, res) {
  if (validInputPins.indexOf(parseInt(req.params.pin)) == -1) {
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
    pin: req.params.pin,
    result: 'success',
    value: 99
  });
};

exports.writePin = function(req, res) {
  if (validOutputPins.indexOf(parseInt(req.params.pin)) == -1) {
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
  
  // twiddle the gpio with rpi-gpio
  
  res.json({ 
    operation: 'writePin', 
    pin: req.params.pin,
    value: value,
    result: 'success'
  });
};
