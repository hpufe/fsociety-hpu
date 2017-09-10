var config = require('./config');
var ocr = require('./ocr');
var path = require('path');
var cheerio = require('cheerio');
var request = require('superagent');
require('superagent-charset')(request);

const agent = request.agent();

// Disable https
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Login vpn
agent
  .post(config.vpnLoginUrl)
  .set(config.vpnLoginHeader)
  .type('form')
  .send({
    svpn_name: config.vpnUser
  })
  .send({
    svpn_password: config.vpnPassword
  })
  .redirects()
  // Recognize URP verification code
  .then(() => {
    return agent.get(config.urpVerCode);
  })
  .then(data => {
    return ocr(data.body);
  })
  // Login URP
  .then(res => {
    return agent
      .post(config.urpLoginUrl)
      .set(config.urpLoginHeader)
      .type('form')
      .send({
        zjh1: '',
        tips: '',
        lx: '',
        evalue: '',
        eflag: '',
        fs: '',
        dzslh: ''
      })
      .send({
        zjh: config.urpUser,
        mm: config.urpPassword,
        v_yzm: res
      })
      .redirects();
  })
  .then(() => {
    return agent.get(config.urpStudentInfoUrl).charset('gbk');
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
