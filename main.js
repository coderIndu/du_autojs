// var sendAll = require('send.js');
auto.waitFor() // 判断是否开启了无障碍
console.clear(); // 清除控制台
console.setPosition(400, 400); // 设置控制台位置
console.show();


// 启动app
let { httpCanary, LinearLayout, ImageView, Relartive, TextView } = require("./common/变量");
let { getReq, request } = require("./common/http");
let { canaryOpen, httpCanaryFind, httpCanarySearch, httpcanaryAll } = require("./common/canary");
let { closeAll, killApp, sendMessage } = require("./common/utils")
var cookie_url = "https://s.dudu2.xyz/cookie"

var urlList = []; // 存放提取出来的所有的url

function main() {
  // log(go())
  try {

    app.launch(httpCanary);
    className(ImageView).desc("更多选项").waitFor()

    let findText = "functionId=drawShopGift";
    let re = /drawShopGift/
    let urlConfig = {
      title: "总览",
      textView: null,
      searchStr: findText
    }
    let bodyConfig = {
      title: "请求",
      textView: "Text",
      searchStr: "body"
    }
    urlList = httpcanaryAll(findText, re, function () {
      let url = httpCanarySearch(urlConfig);
      let body = httpCanarySearch(bodyConfig);
      let data = url + "&" + body;
      return data
    })


  } catch (error) {
    console.log(error);
  } finally {
    if (urlList.length) {
      let cookies = getCookies();
      // log(urlList)
      sendAll(urlList, cookies)
    } else {
      closeAll()
    }
  }
}

// 发起网络请求
function getCookies() {
  //log("请求cookie",cookie_url)

  var data = request(cookie_url)
  // log(data.body.string());return
  var cookies = data.split("\n");
  // log(cookies)
  let formatCookies = [];
  let re = /pt_key.*pt_pin(.*?\;)/
  cookies.forEach(element => {
    if (re.test(element)) {
      formatCookies.push(element.match(re)[0])
    }
  });
  formatCookies.shift();
  return formatCookies;
}

// 发送函数
function sendAll(urlList, cookies) {
  return new Promise(resolve => {
    try {
      let msg = "";
      let times = cookies.length - 1;
      for (let i = 0; i < times; i++) {
        msg += "cookie" + (i + 1) + ":";
       // log(msg)
        urlList.forEach(url => {
          let data = getReq(url, cookies[i]).body.json();
          if (data.hasOwnProperty("result")) {
            data = data.result.followDesc
          } else {
            data = data.msg
          }
          msg += data;
          //console.info(data);
         
        })
        msg += "\n"
      }
      console.log(msg);
      sendMessage(msg)
      killApp(httpCanary)
    } catch (error) {
      console.log(error);
    } finally {
      resolve();
    }
  })
}


module.exports = main;












































































