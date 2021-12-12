while (true) {
  let data = shell("pm list users", true)
  let users = data.result.match(/UserInfo\{.*/ig)

  let userInfo = []
  let options = ["全部开启", "全部关闭"];
  let power = 0;
  // console.show();
  users.forEach(user => {
    user = user.replace(/UserInfo{|}/, "");
    if (!/^0/.test(user)) {
      let status = /running/.test(user) ? "运行中" : "未启动";
      let username = user.match(/.*(?=:)/);

      userInfo.push(username + "：" + status)
      options.push(username + "：" + status)
    }
  })
  options.push("取消")
  options.push("确认")
  // alert(userInfo)
  let i = dialogs.select("请选择分区", options);
  if (i >= 0 && options[i] != "取消") {
    let choose = options[i];

    let id = choose.match(/\d+/) == null ? choose : choose.match(/\d+/)[0];
    let result = 1;
    // console.log(choose);
    switch (choose) {
      case "全部开启":
        userInfo.forEach(user => {
          // alert(user.match(/\d+/))
          result = shell("am start-user " + user.match(/\d+/), true);
        })
        choose = "执行全部开启完毕"
        power = 1;
        break;
      case "全部关闭":
        userInfo.forEach(user => {
          // alert(user.match(/\d+/))
          result = shell("am stop-user -f " + user.match(/\d+/), true);
        })
        choose = "执行全部关闭完毕"
        power = 2;
        break;
      case "确认":
        power = 1
        break;
      default:
        if (/运行中/.test(choose)) {
          // console.log(choose);
          result = shell("am stop-user -f " + id, true);
          choose = choose + " => 关闭成功"
          
        } else {
          // console.log(choose);
          // console.log(id);
          result = shell("am start-user " + id, true);
          choose = choose + " => 开启成功"
         // toast(choose)
        }
    }

    if (result.code == 0 && power == 0) {
      toast(choose);
      sleep(1000)
    } else if(power == 1){
      sleep(500)
      Power();
      sleep(1000)
      device.wakeUpIfNeeded();
      break;
    } else if(power = 2){
     // alert(choose)
      toast(choose);break;
    } else {
      toast("操作失败，请检查")
      break;
    }
  } else {
    toast("你取消了操作")
    break;
  }
}