var path = require('path');
var fs = require('fs');
var gm = require('gm');
var tesseract = require('node-tesseract');

var options = {
  l: 'hpu',
  psm: 7,
  binary: 'tesseract'
};

// gm
gm(path.join(__dirname, '../training/samples/10.jpeg'))
  .despeckle()
  .contrast(-100)
  .write(path.join(__dirname, 'gm.jpeg'), err => {
    if (err) {
      console.log(err);
    }
  });

// tesseract
tesseract.process(path.join(__dirname, 'gm.jpeg'), options, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('The output:' + data.trim());
  }
});