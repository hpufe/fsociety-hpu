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
  // Get urp index
  .then(() => {
    return agent.get('https://vpn.hpu.edu.cn/web/0/http/1/218.196.240.97/validateCodeAction.do?random=0.5239535101287284');
  })
  // .then(() => {
  //   return agent
  //     .post(config.urpLoginUrl)
  //     .set(config.urpLoginHeader)
  //     .type('form')
  //     .send({
  //       zjh1: '',
  //       tips: '',
  //       lx: '',
  //       evalue: '',
  //       eflag: '',
  //       fs: '',
  //       dzslh: ''
  //     })
  //     .send({
  //       zjh: ,
  //       mm: ,
  //       v_yzm
  //     })
  //     .redirects()
  // })
  .then(data => {
    console.log('res:' + ocr(data.body));
  });

