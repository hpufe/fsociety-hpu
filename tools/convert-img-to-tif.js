var denodeify = require('denodeify');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
var ora = require('ora');

var readdir = denodeify(fs.readdir);

// Config
var config = {
  src: path.join(__dirname, '../training/samples/'),
  dist: path.join(__dirname, '../training/samples-output/'),
  // Reduces the image contrast
  contrast: -100
};

var spinner = ora('Start conversion...').start();

// Convert it
readdir(config.src)
  .catch(err => {
    return Promise.reject(err);
  })
  .then(files => {
    var l = files.length;

    for (i = 0; i < l; i++) {
      // Reduces the speckles within the image.
      // Reduces the image contrast
      // Convert images to .tif
      gm(config.src + files[i])
        .despeckle()
        .contrast(config.contrast)
        .resize(240, 80)
        .write(config.dist + files[i].split('.')[0] + '.tif', err => {
          if (err) {
            console.log(err);
          }
        });

      if (i === l - 1) {
        spinner.succeed(
          'Successful conversion! Let the bullets fly for a while...'
        );
      }
    }
  })
  .catch(err => {
    console.log(err);
  });
