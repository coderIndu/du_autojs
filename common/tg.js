var path = files.cwd();
var { getBounds, getLongClick } = require('./utils.js');
var { getUrl } = require("./jd")
var ViewGroup = "android.view.ViewGroup";



// 获取链接比如关注收藏关键词等
function getTgUrl(re) {
  console.info("获取链接中...")
  let fmatArray = []
  var tgCli = className(ViewGroup).depth(9).drawingOrder(1).findOne(1000) || className(ViewGroup).depth(10).drawingOrder(1).findOne(500);
  
  if (tgCli != null) {
    var all = tgCli.desc().toString().split('\n');
  } else {
    return [];
  }
  
  urlArray = getUrl(all, re);
  for (var i = 0; i < urlArray.length; i++) {
    if (urlArray[i] != "") {
      fmatArray.push(urlArray[i]);
    }

  }
 // console.log(fmatArray);
  return fmatArray;
}

// 查找tg内容
function tg_copy() {
  let s = className("android.view.ViewGroup").find()
//let s = descMatches(/.*车.*/).find()
  let descArray = []
  s.forEach(ele => {
     let descStr = ele.desc()
     if(/\d.*车|豆车&|豆🚗|组队|分京豆|豪🚗/.test(descStr)) {
       descArray.push(ele)
     }
  })
  let tgCli = descArray[descArray.length - 1]
  console.info("获取链接中...")
  if (tgCli != null) {
    // var all = tgCli.desc().toString().split('\n');
    sleep(500)
    if(getLongClick(tgCli)) {
      log(tgCli.desc())
     // setClip(tgCli.desc())
      //setClip(tgCli.desc())
      desc("复制").waitFor()
      // sleep(1000)
      desc("复制").findOne().click()
      return tgCli.desc();
    }
  } else {
    return 0;
  }
}
var tg = {
  getTgUrl: getTgUrl,
  tg_copy: tg_copy
};
module.exports = tg

