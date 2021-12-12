let name = rawInput("请输入包名", "");
let data = shell("pm list users", true)
let users = data.result.match(/UserInfo\{.*/ig)
let path = shell("pm path " + name, true)
let options = [];

path = path.result.replace("package:", "")



users.forEach(user => {
    user = user.replace(/UserInfo{|}/, "");
    if (!/^0/.test(user)) {
      let status = /running/.test(user) ? "运行中" : "未启动";
      let username = user.match(/.*(?=:)/);
      options.push(username + "：" + status)
    }
  })
  
let i = dialogs.select("请选择分区", options);
if (i >= 0 && options[i] != "取消") {
    let choose = options[i];
    let id = choose.match(/\d+/) == null ? choose : choose.match(/\d+/)[0];
    let result = shell("pm install -r --user " + id + " " + path, true)
    
  if(result.code == 0){
    toast(result.result)
  } else {
    toast("安装失败")
  }
}
