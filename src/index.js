var config = require('./config');
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
  .then(() => {
    return agent.get(config.urpIndex).charset('gbk');
  })
  .then(data => console.log(data.text));
