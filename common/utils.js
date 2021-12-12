

// 点击无法点击的组件
function getBounds(unit) {
  let bounds = unit.bounds();
  return click(bounds.centerX(), bounds.centerY())
}

function getLongClick(unit) {
  let bounds = unit.bounds();
  return longClick(bounds.centerX(), bounds.centerY())
}
// 关闭
function closeAll() {
  log("finally")
  toast("已完成,退出脚本");
  sleep(1000)
  // killApp(appName)
  console.hide()
  exit();
}

// 关闭应用
function killApp(packageName) {
  shell('am force-stop ' + packageName, true);
};

// 发送按钮信息给机器人
function sendMessage(msg, buttonMsg) {
  try {
    let url = "http://209.141.57.187:8081/bot1540229015:AAHPL_uCyTQuggkJHBQVC7jALwrU_SKELOY/";
    let data = {
      method: "sendMessage",
      chat_id: "1204688751",
      text: msg,
    }

    if(buttonMsg) {
      data.reply_markup = {
        inline_keyboard: [
          [
            { text: buttonMsg, callback_data: 0 },
          ],
        ]
      }
    }

    let res = http.postJson(url, data);
    console.log(res.body.json().ok);
    // return res.body.json().ok;
  } catch (e) {
    console.error("发送到bot失败");
  }
}

// 打开其他脚本
function otherScript(filename) {
  // 关闭前一个脚本的弹窗
  //  console.hide();
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
    log("开始运行：" + path)
    engines.execScriptFile(path);
  } else { // 不存在即退出
    log("文件不存在")
    sleep(1000);
    console.hide()
    exit()
  }

}

let utils = {
  getLongClick:getLongClick,
  getBounds: getBounds,
  closeAll: closeAll,
  killApp: killApp,
  sendMessage: sendMessage,
  otherScript: otherScript
}
module.exports = utils;