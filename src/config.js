var RsaNode = require('rsa-node');

// RSA encrypt
const KEY =
  'D41F1B452440585C5D1F853C7CBCB2908CFF324B43A42D7D77D2BB28BD64E2D098079B477D23990E935386FF73CCF865E0D84CE64793306C4083EADECFE36BCC89873EC2BA37D6CA943CB03BA5B4369EE7E31C3539DEA67FF8BF4A5CEE64EB3FD0639E78044B12C7B1D07E86EB7BCF033F78947E0ADE5653B9A88B33AFEB53BD';
const EXP = 65537;

var rsa = new RsaNode(KEY, EXP);
var vpnUser = '311509040120';
// Encrypt vpnPassword
var vpnPassword = rsa.encrypt('211219');

// Config
var config = {
  // VPN
  vpnLoginUrl:
    'https://vpn.hpu.edu.cn/por/login_psw.csp?sfrnd=2346912324982305&encrypt=1',

  vpnLoginInfo: 'svpn_name=' + vpnUser + '&svpn_password=' + vpnPassword,
  vpnUser: vpnUser,
  vpnPassword: vpnPassword,

  vpnLoginHeader: {
    Host: 'vpn.hpu.edu.cn',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0',
    Referer:
      'https://vpn.hpu.edu.cn/por/login_psw.csp?rnd=0.4288785251262913#http%3A%2F%2Fvpn.hpu.edu.cn%2F',
    Cookie:
      'language=en_US; TWFID=1683ff4c80034a2e; collection=%7Bauto_login_count%3A0%7D; VpnLine=http%3A%2F%2Fvpn.hpu.edu.cn%2F; g_LoginPage=login_psw; VisitTimes=0; haveLogin=0'
  },

  // URP
  // urpIndex: 'https://vpn.hpu.edu.cn/web/1/http/0/218.196.240.97/',

  urpLoginUrl:
    'https://vpn.hpu.edu.cn/web/1/http/1/218.196.240.97/loginAction.do',
  urpVerCode:
    'https://vpn.hpu.edu.cn/web/0/http/1/218.196.240.97/validateCodeAction.do?random=0.5239535101287284',

  // URP login info
  urpUser: '311509040120',
  urpPassword: '311509040120',

  urpStudentInfoUrl:
    'https://vpn.hpu.edu.cn/web/1/http/1/218.196.240.97/xjInfoAction.do?oper=xjxx',

  urpLoginHeader: {
    Host: 'vpn.hpu.edu.cn',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    Referer: 'https://vpn.hpu.edu.cn/web/1/http/0/218.196.240.97/',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0'
  }
};

module.exports = config;
