auto.waitFor() // 判断是否开启了无障碍
console.clear(); // 清除控制台
console.setPosition(0, 400); // 设置控制台位置
console.show();
// let {} = requie("./http")
let { getReq, request } = require("./http");
let {sendMessage} = require("./utils")
let cookie_url = "http://s.dudu2.xyz/cookie"
let urls = [
  'https://api.m.jd.com/client.action?functionId=drawShopGift&clientVersion=10.1.4&build=90060&client=android&d_brand=Xiaomi&d_model=Mi10&osVersion=10&screen=2120*1080&partner=cymqj01&oaid=839b0b9ef672e572&openudid=bff06c595ae32ed4&eid=eidAf2708122basaLGnEksJBTx26H5pPlVgCMyxpxg5ph74TtnA0J6xh2u/R3rBif+bC8TZ5nGqlWSS5qXHZaBb+ovS6kaEOyGkrnl9bqjxZNRLnoPM1&sdkVersion=29&lang=zh_CN&uuid=bff06c595ae32ed4&aid=bff06c595ae32ed4&area=18_1501_1504_52593&networkType=wifi&wifiBssid=unknown&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ6%2FwMKOOWk7KXYMxoGWhUADo8KzIHewxrSg8scykPKFtoTEqijk9wO6IinU0SUpcawHXBlr8cSXkwoY0MZNLovx7IgbE2qjvuH9iFuUi%2FnT4cR4kb7GqIpv3a5OCPYJusz1gTmjEQS8hyIm6p6VC5Y74fl32wj5bZFW4vRjrzOxEPQe6QSD6dnQ%3D%3D&uemps=0-0&harmonyOs=0&st=1631534561187&sign=8b4fd6b409bb7203e63b7acbf592bf24&sv=110&body=%7B%22activityId%22%3A10412790%2C%22follow%22%3Afalse%2C%22shopId%22%3A%22782072%22%2C%22sourceRpc%22%3A%22shop_app_home_window%22%2C%22venderId%22%3A%22786257%22%7D&',
  'https://api.m.jd.com/client.action?functionId=drawShopGift&clientVersion=10.1.4&build=90060&client=android&d_brand=Xiaomi&d_model=Mi10&osVersion=10&screen=2120*1080&partner=cymqj01&oaid=839b0b9ef672e572&openudid=bff06c595ae32ed4&eid=eidAf2708122basaLGnEksJBTx26H5pPlVgCMyxpxg5ph74TtnA0J6xh2u/R3rBif+bC8TZ5nGqlWSS5qXHZaBb+ovS6kaEOyGkrnl9bqjxZNRLnoPM1&sdkVersion=29&lang=zh_CN&uuid=bff06c595ae32ed4&aid=bff06c595ae32ed4&area=18_1501_1504_52593&networkType=wifi&wifiBssid=unknown&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ6%2FwMKOOWk7KXYMxoGWhUADo8KzIHewxrSg8scykPKFtoTEqijk9wO6IinU0SUpcawHXBlr8cSXkwoY0MZNLovx7IgbE2qjvuH9iFuUi%2FnT4cR4kb7GqIpv3a5OCPYJusz1gTmjEQS8hyIm6p6VC5Y74fl32wj5bZFW4vRjrzOxEPQe6QSD6dnQ%3D%3D&uemps=0-0&harmonyOs=0&st=1631534576443&sign=0a9ab2df7c6a1cbecb9059cf498c6e17&sv=111&body=%7B%22activityId%22%3A10507222%2C%22follow%22%3Afalse%2C%22shopId%22%3A%2210293201%22%2C%22sourceRpc%22%3A%22shop_app_home_window%22%2C%22venderId%22%3A%2210504684%22%7D&',
  'https://api.m.jd.com/client.action?functionId=drawShopGift&clientVersion=10.1.4&build=90060&client=android&d_brand=Xiaomi&d_model=Mi10&osVersion=10&screen=2120*1080&partner=cymqj01&oaid=839b0b9ef672e572&openudid=bff06c595ae32ed4&eid=eidAf2708122basaLGnEksJBTx26H5pPlVgCMyxpxg5ph74TtnA0J6xh2u/R3rBif+bC8TZ5nGqlWSS5qXHZaBb+ovS6kaEOyGkrnl9bqjxZNRLnoPM1&sdkVersion=29&lang=zh_CN&uuid=bff06c595ae32ed4&aid=bff06c595ae32ed4&area=18_1501_1504_52593&networkType=wifi&wifiBssid=unknown&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ6%2FwMKOOWk7KXYMxoGWhUADo8KzIHewxrSg8scykPKFtoTEqijk9wO6IinU0SUpcawHXBlr8cSXkwoY0MZNLovx7IgbE2qjvuH9iFuUi%2FnT4cR4kb7GqIpv3a5OCPYJusz1gTmjEQS8hyIm6p6VC5Y74fl32wj5bZFW4vRjrzOxEPQe6QSD6dnQ%3D%3D&uemps=0-0&harmonyOs=0&st=1631534579578&sign=32f509c0f85b30eddf3f975ecb9c763a&sv=120&body=%7B%22activityId%22%3A10507222%2C%22follow%22%3Afalse%2C%22shopId%22%3A%2210293201%22%2C%22sourceRpc%22%3A%22shop_app_home_window%22%2C%22venderId%22%3A%2210504684%22%7D&'
]

function sendMessage(msg, buttonMsg) {
  try {
    let url = "https://jd2.dudu48021.workers.dev/bot1540229015:AAHPL_uCyTQuggkJHBQVC7jALwrU_SKELOY/";
    let data = {
      method: "sendMessage",
      chat_id: "1204688751",
      text: msg,
    }

    if (buttonMsg) {
      data.reply_markup = {
        inline_keyboard: [
          [
            { text: buttonMsg, callback_data: 0 },
          ],
        ]
      }
    }
    // console.log(data);
    let res = http.postJson(url, data);
    console.log(res.body.json().ok);
    // return res.body.json().ok;
  } catch (e) {
    console.error("发送到bot失败");
  }
}

function sendAll(urlList, cookies) {
  return new Promise(resolve => {
    let storage = storages.create("msgs");
    let msgs = [];
    let times = cookies.length - 1;
    try {
      for (let i = 0; i < times; i++) {
        let msg = i+1;
        threads.start(function () {
          urlList.forEach(url => {
            let data = getReq(url, cookies[i]).body.json();

            if (data.hasOwnProperty("result")) {
              //log(data)
              data = data.result.followDesc
            } else {
              // log(req+"msg")
              data = data.msg
            }
            msgs.push(data);
            storage.put(msg, data);
          })
        })
      }
      
     
    } catch (error) {
      console.log(error);
    } finally {
      let count = 0
      while (true) {
        
        console.log(msgs.length, times * urlList.length, count);
        
        if (msgs.length == times * urlList.length || count >= 4) {
          resolve(storage);
          let str = ""
          for (let i = 0; i < cookies.length - 1; i++) {
            str += "账号"+(i+1)+":" + storage.get(i+1) + "\n";
            storage.put("sendMsg", str);
          }
          console.log(storage.get("sendMsg"));
           // 发送消息给bot
          sendMessage(storage.get("sendMsg"))
          closeAll()
          break;
        }
        sleep(500) 
        count++;
      }
    } 
  }) 

 
  // sendMessage(msgs.toString());
  //killApp(httpCanary);
  // 
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
let cookies = getCookies();
// console.log(cookies);
sendAll(urls, cookies);

// // var storage = storages.create("cookie");
// for (var i = 0; i < 12; i++) {
//   threads.start(function () {
//     console.log("233");
//   })
// }


