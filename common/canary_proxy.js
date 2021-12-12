let { closeAll } = require("./utils");
var variate = require("./变量");
let {
  LinearLayout,
  TextView,
  ViewGroup,
  FrameLayout,
  httpCanary
} = variate;


// 打开canary抓包
function canaryOpen() {
  // log("开启抓包")
  /*
  app.launch(httpCanary)
  className("android.widget.ImageButton").waitFor()
 sleep(1000)
 // log(233)
 log(isOpen())
  if (isOpen()) {
      log("抓包已开启")
      return 1;
  }*/
  result = shell("settings put global http_proxy 127.0.0.1:8001",true)
  if(result.code == 0) {
    toast("代理设置成功")
    return 1;
  } else {
    toast("代理未设置成功")
    return 0;
  }
}

function closeCanary() {
  result = shell("settings put global http_proxy :0",true)
  if(result.code == 0) {
    toast("代理关闭成功")
    return 1;
  } else {
    toast("代理未关闭成功")
    return 0;
  }
}

function isOpen() {

    if(isHasItem()) {

        return 1;

    } else if(isHasItem() == 0){

        return 1;

    } else if(desc("清屏").findOne().click()) {

        text("清除").findOne(1000) != null ? text("清除").findOnce().click() : 0;

        sleep(1000)
        isHasItem();

    }

    return 1
}

function isHasItem() {

    if (textMatches(/.*点击右下角.*/).exists()) {
        return className("android.widget.ImageButton").depth(10).indexInParent(1).findOnce().click()

    } else if (textMatches(/.*没有结果.*/).exists()) {

        return 0

    } 

}
/*
  if(!requestScreenCapture()){
     toast("请求截图失败");
     exit
  }
  sleep(500)
  var x = 946;
  var y = 2132;
  //获取在点(x, y)处的颜色
  var c = images.pixel(captureScreen(), x, y);
  //显示该颜色
  var msg = "";
  msg += "在位置(" + x + ", " + y + ")处的颜色为" + colors.toString(c);
  //检测在点(x, y)处是否有颜色#389fdc (模糊比较)
  var isDetected = images.detectsColor(captureScreen(), "#389fdc", x, y);
  msg += "\n该位置是否匹配到颜色#389fdc: " + isDetected;
  toast(msg);
  return isDetected;
  */


// httpCanary查找
function httpCanaryFind(foundstr) {
  console.info("进入go...")
  let flag = 0
  // 点击更多选项
  if (desc("更多选项").findOne().click()) {
    className(LinearLayout).depth(3).waitFor() // 等待选项
    let find = className(LinearLayout).depth(3).find()[1]; // 搜索点击
    if (find.click()) {
      // 设置文本
      let editText = id("arg").className("android.widget.EditText").findOne(1000)
      if (editText == null) {
        return flag;
      }
      editText.setText(foundstr)
      // 点击搜索
      // sleep(500)
      text('搜索').waitFor()
      let found = text('搜索').find()[1];
      if (found.click()) {
        flag = 1;
        return flag;
      }
      return flag;
    }

  }

}

// 搜索结果链接筛选
function httpCanaryList(re, task) {
  console.info("进入list模块...")
  // 点击结果
  className(TextView).text('搜索结果').waitFor();
  let count = className(TextView).depth(9).find();
   if (count.size()) {
    let data = [];
    for (let i = 0; i < count.size(); i++) {
      sleep(500)
      //log(count[i].text())
      if (re.test(count[i].text())) {
        if (count[i].parent().parent().click()) {
          data.push(task())
        }
        back();
      }
    }
    return data;
  } else {
    closeAll();
  }
}

// httpCanary提取Referer
function httpCanarySearch(config) { // title：抓包内容界面选择， searchStr: title界面的关键词查找
  console.info("httpCanarySearch")
  let title = config.title || 0;
  let textView = config.textView || 0;
  let searchStr = config.searchStr || 0;
  log(title, textView, searchStr)
  
  if (!title) {
    let findStr = className(FrameLayout).findOne().findByText(searchStr).get(0).text();
    return findStr;
  } else {
    text(title).waitFor();
    if (desc(title).findOne().click()) {
      text("抓包内容").waitFor();
      if (textView) text(textView).click();
      let findStr = className(ViewGroup).findOne().findByText(searchStr).get(0).text();
      
      // log(findStr)
      return findStr;
    }
  }

}

// 抓包数据
function httpcanaryAll(findText, re, task) {
  // app.launch("com.guoshi.httpcanary.premium");

  if (httpCanaryFind(findText)) {
    return httpCanaryList(re, task);
  }
  return 0;
}

// oldHttpCanary查找发送cookie部分
function sendCookie() {
  console.info("进入sendCookie");
  console.show()
  let relative = className(Relartive).depth(11).findOne(1000);
  if (relative != null) relative.click();
  let cookieList = text('Cookie').findOne(1000);
  // log(cookieList)  
  let cookie = null;

  if (cookieList != null) {
    log("进入cookieList")
    let cookie_str = cookieList.parent().children()[1].text();
    let pt_key = cookie_str.match(/(?=pt_key).*?;/)[0];
    let pt_pin = cookie_str.match(/(?=pt_pin).*?;/)[0];
    cookie = pt_key + pt_pin;
  }
  //log(cookie)
  return cookie;
}

// oldHttpCanary 设置查找部分
function findList(choose) {
  let find = desc('搜索').findOne();
  if (find.click()) {
    text('Url关键词').waitFor()
    // 进入
    if (text('Url关键词').findOne().parent().click()) {
      // 设置搜索词
      if (className(EditText).findOne().setText(choose)) {
        while (back()) {
          log('返回')
          sleep(500);
          if (text('HttpCanary').exists()) {
            break;
          }
          
        }
        // list()
        return sendCookie()
      }
    }
  }else {
   closeAll()
  }
}


var canary = {
  canaryOpen: canaryOpen,
  httpcanaryAll: httpcanaryAll,
  httpCanarySearch: httpCanarySearch,
  httpCanaryList: httpCanaryList,
  findList: findList,
  closeCanary:closeCanary
}

module.exports = canary;