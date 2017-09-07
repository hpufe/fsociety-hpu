var denodeify = require('denodeify');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
var ora = require('ora' );

var readdir = denodeify(fs.readdir);

// Config
var config = {
  src: '../training/samples/',
  dist: '../training/samples-output/',
  // Reduces the image contrast
  contrast: -100
}

var spinner = ora('Start conversion...').start();

// Convert it
readdir(path.join(__dirname, config.src))
  .catch(err => {
    return Promise.reject(err);
  })
  .then(files => {
    var l = files.length;

    for (i = 0; i < l; i++) {
      // Reduces the speckles within the image.
      // Reduces the image contrast
      // Convert images to .tif
      gm(path.join(__dirname, config.src, files[i]))
        .despeckle()
        .contrast(config.contrast)
        .write(
          path.join(
            __dirname,
            config.dist,
            files[i].split('.')[0] + '.tif'
          ),
          err => {
            if (err) {
              console.log(err);
            }
          }
        );

      if(i === l - 1) {
        spinner.succeed('Successful conversion! Let the bullets fly for a while...')
      }
    }
  })
  .catch(err => {
    console.log(err);
  })