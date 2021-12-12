console.show();
console.clear(); // 清除控制台
console.setPosition(400, 400); // 设置控制台位置
// console.show();

let { appName, LinearLayout, EditText, ViewFlipper, httpCanary } = require("./common/变量");
let { getTgUrl } = require("./common/tg");
// let { canaryOpen, closeCanary } = require("./common/canary");
let { closeAll, killApp } = require("./common/utils");
let { getShopName } = require("./common/http")
let mainJs = require('./main')

var shop_array = []; // 存放店铺名的数组
var isSkip = 0;

(() => {
  let appNow = app.getAppName(currentPackage())
  log(appNow)
  if (appNow == "HttpCanary") {
    mainJs();
  } else {
    main();
  }
})();

// 循环搜索店铺点关注
function main() {
  try {
    let re = /^\d.*豆|关注|^\d.*\d$|^\d.*跳转APP$|^\d豆$|京豆【|关注有礼|和上面一下|豆子不多，点点吧|共.*\d豆|好几个|关\d/i;
    let fmatArray = getTgUrl(re)
    log(fmatArray)
    if (fmatArray.length) {
      console.info("获取连接成功，开始点击链接")
      log("总共获取到" + fmatArray.length + "个店铺")
    //  log(fmatArray)
      shop_array = getShopName(fmatArray)
      log(shop_array)
    }

    if (shop_array.length) {
      // 打开一次软件即可

      console.info("获取到" + shop_array.length + "店铺，正在打开京东...")
      // 打开京东
      app.launch(appName)
      sleep(1000);
      // 选择其中一个
      click(51, 1816);

      text('首页').waitFor()
      // canaryOpen()
      // 循环开始关注店铺。
      // log(shop_array.length)
      for (var i = 0; i < shop_array.length; i++) {
        console.info('循环开始关注店铺。');
        // log(shop_array[i])
        if (shop_array[i] != null) {
          sleep(500)
          console.info("开始执行第" + (i + 1) + "个店铺：" + shop_array[i])
          if (openJd(shop_array[i])) {
            if(textMatches("拆开它").findOne(500) != null) {
              textMatches("拆开它").click()
            }
            isSkip = 1;
          }
        }
        // closeCanary()
      }
      if(isSkip) log("关注完成")
      console.error(isSkip)
      sleep(1000)
      //   if (isSkip) {
      //mainJs();
      // } 
      console.info("执行完毕, 脚本关闭...");
    } else {
      console.info("没有店铺信息，退出脚本");
    }
  }
  catch (error) {
    console.log(error.message);
    // throw error;
  } finally {
    killApp(appName);
    //killApp(httpCanary)
    // closeCanary()
    sleep(1000)
    closeAll()
  }

}

// 打开京东后续操作
function openJd(shopName) {
  try {
    sleep(500);
    // 点击HomeBar
    if (afterJd(shopName)) {
      if(text('进店').findOne(5000) == null) return 0
      click("进店", 0)
      console.info("进入店铺成功")
      // className(LinearLayout).depth(11).findByText('关注')

      if (text("关注店铺领奖励").exists()) {
        text("关注店铺领奖励").click();
        sleep(1000);
      } else {
        // log("不存在");
        // log(tv.find().size())
        otherWindow("关注店铺领奖励") // 处理点击前弹窗
        if (foundText("关注有礼")) { // 关注有礼存在则点击

          sleep(1500);
          // 弹窗处理
          otherWindow("收下好礼 先收先得")
          console.info("关注成功,开始返回");
          sleep(1000)
          back()
          // sleep(1000);
          return 1;
        } // 处理点击后弹窗
        else {
          log("不是有礼关注按钮")
          back();
          return 0;
        }
      }
    } else {
      console.error("不存在，查找下一个");
      return 0;
    }
  } catch (error) {
    console.error(error)
    throw error
  }

}

// 各个判断函数
// 首页bar点击
function HomeBar() {
  try {
    var bar = className(ViewFlipper).depth(9).findOne(1000) || className(LinearLayout).depth(10).findOne(1000);
    if (bar != null) {
      var b = bar.bounds();
      // sleep(2000);
      click(b.centerX(), b.centerY());
    } else {
      log('无搜索框')
    }
  } catch (error) {
    console.error(error)
  }
}

function afterJd(shopName) {
  let bar = text('首页').depth(8).exists()
  if (bar) HomeBar();
  if (Edit(shopName)) {
    return 1;
  }

}

// 输入文本输入框
function Edit(shopName) {
  try {
    //  EditText = 'android.widget.EditText'
    // LinearLayout = 'android.widget.LinearLayout';
    let input = className(EditText).findOne(1000) || descMatches("搜索框.*").findOne(1000); // 进入的输入框

    let s_input = className(LinearLayout).depth(10).drawingOrder(1).findOne(2000); // 返回的输入框

    // log(s_input.click())
    if (input != null) {
      setText(shopName)
      // 点击搜索进入
      if (text('搜索').exists() && text('搜索').findOnce().click()) return 1;
    }

    if (s_input != null) {
      if (s_input.click()) {
        Edit(shopName);
        return 1;
      }
    } else {
      toast('无输入框');
      return 0;
    }
  } catch (error) {
    console.error(error)
  }
}

// 其他弹窗处理
function otherWindow(msgs) {
  let strs = msgs.split(" ")
  // let msg = msgs.split(" ")
  for (let msg of strs) {
    // log(msg)
    let other = text(msg).findOne(1000)
    if (other != null) {
      text(msg).waitFor();
      sleep(1000);
      other.click();
      return 1;
    }
  }
  return 0
}

// 判断是否是指定消息的按钮
function foundText(msg) {
  let tv = className(LinearLayout).depth(11).drawingOrder(2); // 找到按钮
  tv.waitFor()  // 等待按钮出现
  let content = tv.findOne(1000).children()[0].contentDescription;  // 提取按钮信息
  let reg = new RegExp(msg)
  let res = 0;
  if (reg.test(content)) {
    // log("true")
    log("按钮存在，点击...");
    sleep(1500);
    if (tv.findOne().click()) {
      log("点击成功")
      res = 1;
    }
  }
  return res;
}




