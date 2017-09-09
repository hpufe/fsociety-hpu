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

function ocr(verCode) {
  return new Promise((resolve, reject) => {
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
          reject(err);
        } else {
          // Tesseract-ocr
          // Recognize verification code
          tesseract.process(config.dist, options, (err, data) => {
            if (err) {
              reject(err);
            } else {
              var ver = new RegExp('^[a-zA-Z0-9]{4}$');
              if (ver.test(data.trim())) {
                // console.log('ori:' + data);
                resolve(data.trim());
              } else {
                reject('Unrecognized!');
              }
            }
          });
        }
      });
  });
}

module.exports = ocr;
