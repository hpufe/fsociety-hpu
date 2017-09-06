// var querystring = require('querystring');
// var cheerio = require('cheerio');
// var superagent = require('superagent');
// var charset = require('superagent-charset');
// charset(superagent);

// Run
// exports.run = function(options) {
//   options = options || {};

// var headers = {
//   Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//   'User-Agent':
//     'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; InfoPath.3)',
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'Accept-Encoding': 'gzip, deflate, br',
//   'Accept-Language': 'en-US,en;q=0.8,zh;q=0.6',
//   Referer: 'https://vpn.hpu.edu.cn'
// };
// // var testUrl = "https://vpn.hpu.edu.cn/web/1/http/1/218.196.240.97/logout.do";
// var testUrl = "https://vpn.hpu.edu.cn/web/1/http/1/218.196.240.97/loginAction.do";
// console.log("starting...");

// // Disabled https
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// superagent
//   .get(testUrl)
//   .set(headers)
//   .set(
//     'Cookie',
//     'TWFID=7b043bd900069467; language=en_US; collection=%7Bpage_state%3A%27started%27%2Cneed_ist_cscm%3A%27-1%27%2CscacheUseable%3A0%2CAppCount%3A0%7D; VpnLine=http%3A%2F%2Fvpn.hpu.edu.cn%2F; g_LoginPage=login_psw; VisitTimes=0; haveLogin=1; ENABLE_RANDCODE=0; webonly=1; allowlogin=1; LoginMode=2; websvr_cookie=1504599540000436'
//   )
//   .redirects()
//   .end((err, res) => {
//     console.log('headers:\n' + res.headers);
//     console.log('text:\n' + res.text);
//   });

//   return Promise.resolve();
// };

var Tesseract = require('tesseract.js'),
image = require('path').resolve(__dirname, 't1.png');

Tesseract.recognize(image)
  .progress(function (p) {
    console.log('progress', p)
  })
  .then(function (result) {
    console.log(result)
  })
  .catch(err => console.error(err))