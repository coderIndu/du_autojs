function request(url) {
  log(url)
  try {
    var r = http.get(url, {
      // headers: headers
    });
    sleep(1000);
    var req = r.body.string();
    return req;
  } catch (e) {
    console.log(e);
    return "请求出错！"
  }
}

// cookie网络请求函数
function getReq(url, cookie) {
  var headers = {
    'Accept-Language': 'zh-cn,zh;q=0.5',
    'User-Agent': 'jdapp;android;9.5.2;10;2363332383167383-6653730323835326;network/wifi;model/Mi 10;addressid/138626975;aid/26328a78f570285b;oaid/3300b0a282a02788;osVer/29;appBuild/87971;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; Mi 10 Build/QKQ1.200419.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36 Edg/91.0.4472.77',
    'Cookie': cookie
  }
  try {
    var r = http.get(url, {
      headers: headers
    });
    return r;
  } catch (e) {
    console.error(e);
    return "请求出错！"
  }
}

// 获取店铺名
function getShopName(arr) {
  return new Promise(resolve => {
    let shopNames = [];
    try {

      arr.forEach(url => {
      // threads.start(function () {
   //       log(u
        if(url.indexOf("shopId") == -1) {
          let str = getReq(url, "").body.string();
         
           url = str.match(/(?=hrl=\').*?(?=';)/)[0].replace("hrl='", "");
        //  log(url)
        let sss = getReq(url);
  
        url = sss.headers.location;
    
        url = decodeURIComponent(url).match(/https.*?(?=\")/)[0]
        }
               // log(url)
         let shopId = url.match(/(shopId|venderId).*?(?=&)/);
       //  log(shopId)
        if(shopId != null) {
          shopId = shopId[0]
          let getShopApi = 'https://shop.m.jd.com/mshop/QueryShopMemberInfoJson?' + shopId
          let shopName = getReq(url).body.string().replace(/[\r\n\s]/g, "").match(/<title>[\s\S]*?<\/title>/g)[0].replace(/<title>|<\/title>/g, "");
          //let shopInfo = JSON.parse(getReq(getShopApi).body.string())
          log(shopName)
          shopNames.push(shopName);
         }
          // sum.setAndNotify(shopNames);
        })
       // td.join()
     // })
   /*   let count = 0;
  while (true) {
      log(shopNames.length, arr.length)
        if (shopNames.length == arr.length || count >= 4) {
          
          resolve(shopNames)
          break
        }
        sleep(1000);
        count++;
      }*/
     resolve(shopNames)
    } catch (error) {
      log(error)
    }
  })._result
}

let doHttp = {
  request: request,
  getReq: getReq,
  getShopName: getShopName,
}

module.exports = doHttp;