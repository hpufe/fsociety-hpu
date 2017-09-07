var denodeify = require('denodeify');
var path = require('path');
var ora = require('ora' );

// var exec = denodeify(require('child_process').exec);
var exec = require('child_process').exec;

const c_make_box = 'tesseract ' + path.join(__dirname, '../training/samples-output/hpu.font.exp0.tif') + ' ' + path.join(__dirname, '../training/samples-output/hpu.font.exp0') + ' batch.nochop makebox';

const c_mv_tif = 'mv ' + path.join(__dirname, '../training/samples-output/hpu.font.exp0.tif') + ' ' + path.join(__dirname, '../training/training-it/hpu.font.exp0.tif');

const c_mv_box = 'mv ' + path.join(__dirname, '../training/samples-output/hpu.font.exp0.box') + ' ' + path.join(__dirname, '../training/training-it/hpu.font.exp0.box');

exec(c_make_box, (err, stdout, stderr) => {
  if(err) {
    console.log(err);
  } else {

    console.log(stdout);
    exec(c_mv_tif, (err, stdout, stderr) => {
      if(err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    })
    exec(c_mv_box, (err, stdout, stderr) => {
      if(err) {
        console.log(err);
      } else {
        console.log(stdout);
      }
    })
  }
})


  // .then((stdout, stderr) => {
  //   console.log(stdout)
  //   console.log(stderr)
  // })
  // .catch(err => console.log(err))

console.log(c_make_box);

