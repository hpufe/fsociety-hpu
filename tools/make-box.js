var denodeify = require('denodeify');
var path = require('path');
var fs = require('fs');
var ora = require('ora');

var access = denodeify(fs.access);
var exec = denodeify(require('child_process').exec, (err, stdout, stderr) => {
  return [err, stdout];
});

const c_make_box =
  'tesseract ' +
  path.join(__dirname, '../training/samples-output/hpu.font.exp0.tif') +
  ' ' +
  path.join(__dirname, '../training/samples-output/hpu.font.exp0') +
  ' batch.nochop makebox';

const c_mv_tif =
  'mv ' +
  path.join(__dirname, '../training/samples-output/hpu.font.exp0.tif') +
  ' ' +
  path.join(__dirname, '../training/training-it/hpu.font.exp0.tif');

const c_mv_box =
  'mv ' +
  path.join(__dirname, '../training/samples-output/hpu.font.exp0.box') +
  ' ' +
  path.join(__dirname, '../training/training-it/hpu.font.exp0.box');

exec(c_make_box)
  .then(() =>
    access(
      path.join(__dirname, '../training/samples-output/hpu.font.exp0.box'),
      fs.constants.F_OK
    )
  )
  .then(() => exec(c_mv_tif))
  .then(() => exec(c_mv_box))
  .catch(err => console.log(err));
