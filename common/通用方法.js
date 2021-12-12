
// 判断是否在京东首页
function HomeBar() {
  var bar = className(ViewFlipper).depth(9).findOne(2000);
  if (bar != null) {
    var b = bar.bounds();
    sleep(2000);
    click(b.centerX(), b.centerY());
  } else {
    log('无搜索框')
  }
}

// 点击搜索活动内容
function Edit(shopName) {
  var input = className(EditText).findOne(2000);
  if (input != null) {
    sleep(1000);
    input.setText(shopName)
    // 点击搜索进入
    id('a9b').text('搜索').findOnce().click();
    sleep(2000);
  } else {
    sleep(1000)
    afterInput(shopName)
    log('无输入框')
  }
}

// 输入之后，或者重新搜索部分函数
function afterInput(shopName) {
  var afterInput = className(Hor).depth(9).findOne(2000);
  if (afterInput != null) {
    let b = afterInput.bounds();
    click(b.centerX(), b.centerY())
    // afterInput.click()
    Edit(shopName)
  } else {
    log('无搜索框');
  }
}

// 关闭应用
function killApp(packageName) {
  shell('am force-stop ' + packageName, true);
};

// 发送消息给bot
function sendMessage(msg) {
  // url
  let url = 'https://jd2.dudu48021.workers.dev/bot1540229015:AAHPL_uCyTQuggkJHBQVC7jALwrU_SKELOY/sendMessage?chat_id=1204688751&text='+msg;
  try {
    let res = http.get(url);
    console.log(res.body.json().ok);
  }catch {
    console.error("发送到bot失败");
  }
}

// 其他弹窗处理
function otherWindow(msg) {
  let other = text(msg).findOne(3000)
  if(other!=null) {
    other.click();
  }
}

// 判断是否是指定消息的按钮
function foundText(msg) {
  let tv = className(LinearLayout).depth(11).drawingOrder(2); // 找到按钮
  tv.waitFor()  // 等待按钮出现
  let content = tv.findOne(1000).children()[0].contentDescription;  // 提取按钮信息
  let reg =new RegExp(msg)
  let res = 0;
  if (reg.test(content)) {
    // log("true")
    log("按钮存在，点击...");
    sleep(1000);
    if(tv.findOne().click()) {
      log("点击成功")
      res = 1;
    }
  }
  return res;
}
//  执行完成后，执行其他脚本
function otherScript(filename) {
  // 关闭前一个脚本的弹窗
  console.hide();
  var scriptsPath = "/sdcard/脚本/";
  if (!files.exists(scriptsPath)) {
    scriptsPath = "/sdcard/Scripts/";
  }
  // 查找文件
  var scriptFiles = files.listDir(scriptsPath, function (name) {
    return name.endsWith(".js");
  });
  // log(scriptFiles[1])

  let re = new RegExp(filename); // 筛选文件
  let chooseFile = null   // 保存文件名
  // 循环找到文件
  for (var i = 0; i < scriptFiles.length; i++) {
    // log(scriptFiles[i])
     if (re.test(scriptFiles[i])) {
       console.log(scriptFiles[i]);
       chooseFile = scriptFiles[i]
     }
  }
  // 判断文件是否存在
  if (chooseFile != null) {  // 存在即运行
    var path = files.join(scriptsPath, chooseFile);
    log("开始运行："+path)
    engines.execScriptFile(path);
  }else { // 不存在即退出
    log("文件不存在")
    sleep(1000);
    console.hide()
    exit()
  }

}

// 发送请求
function getReq(url, cookie) {
  //  log("jhhhh")
  var headers = {
    'Accept-Language': 'zh-cn,zh;q=0.5',
    'User-Agent': 'jdapp;android;9.5.2;10;2363332383167383-6653730323835326;network/wifi;model/Mi 10;addressid/138626975;aid/26328a78f570285b;oaid/3300b0a282a02788;osVer/29;appBuild/87971;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; Mi 10 Build/QKQ1.200419.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36 Edg/91.0.4472.77',
    'Cookie': cookie
  }
  try {
    var r = http.get(url, {
      // headers: headers
    });
    sleep(1000);
    var req = r;
    // log(req);
    return req;
  } catch (e) {
    // console.error(e);
    return "请求出错！"
  }
}

// 获得不可点击的组件的坐标
function getBounds(unit) {
  let bounds = unit.bounds();
  return click(bounds.centerX(), bounds.centerY())
}

// 点击无法点击的组件
function getBounds(unit) {
  let bounds = unit.bounds();
  return click(bounds.centerX(), bounds.centerY())
}

