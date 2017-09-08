var denodeify = require('denodeify');
var path = require('path');
var fs = require('fs');
var ora = require('ora');

var access = denodeify(fs.access);
var exec = denodeify(require('child_process').exec, (err, stdout, stderr) => {
  return [err, stdout];
});

// Config
var config = {
  src: path.join(__dirname, '../training/samples-output/'),
  dist: path.join(__dirname, '../training/training-it/'),
  name: 'hpu.font.exp0'
};

// Commanders
var c_make_box =
  'tesseract ' +
  config.src +
  config.name +
  '.tif' +
  ' ' +
  config.src +
  config.name +
  ' batch.nochop makebox';

var c_mv_tif =
  'mv ' +
  config.src +
  config.name +
  '.tif' +
  ' ' +
  config.dist +
  config.name +
  '.tif';

var c_mv_box =
  'mv ' +
  config.src +
  config.name +
  '.box' +
  ' ' +
  config.dist +
  config.name +
  '.box';

var spinner = ora('Start making box...').start();

// Making box
exec(c_make_box)
  .then(() => access(config.src + config.name + '.box', fs.constants.F_OK))
  .then(() => exec(c_mv_tif))
  .then(() => exec(c_mv_box))
  .then(() => spinner.succeed('Making box successfully!'))
  .catch(err => console.log(err));
