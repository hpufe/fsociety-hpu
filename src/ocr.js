var path = require('path');
var fs = require('fs');
var gm = require('gm');
var tesseract = require('node-tesseract');

var config = {
  dist: path.join(__dirname, 'gm.jpeg'),
  contrast: -100,
  resize: {
    w: 240,
    h: 80
  }
};

var options = {
  l: 'hpu',
  psm: 7,
  binary: 'tesseract'
};

var res = '';

function ocr(verCode) {
  // Process pictures
  // Reduces the speckles within the image.
  // Reduces the image contrast
  // Resize the pictures
  gm(verCode)
    .despeckle()
    .contrast(config.contrast)
    .resize(config.resize.w, config.resize.h)
    .write(config.dist, err => {
      if (err) {
        console.log(err);
      } else {
        // Tesseract-ocr
        // Recognize verification code
        tesseract.process(config.dist, options, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            var ver = new RegExp('^[a-zA-Z0-9]{4}$');
            if (ver.test(data.trim())) {
              res = data;
              console.log('ori:' + data);
            } else {
              console.log('Unrecognized!');
            }
          }
        });
      }
    });

  // TODO: Need refactoring
  // Make bullets faster
  setTimeout(() => {
    console.log(res);
  }, 100);
}

module.exports = ocr;
