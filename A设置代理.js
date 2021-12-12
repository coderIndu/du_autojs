let options = ["设置代理", "关闭代理", "取消"];

let i = dialogs.select("请选择分区", options);
let result = 1;
  if (i >= 0 && options[i] != "取消") {
    if(options[i] == "设置代理"){
      result = shell("settings put global http_proxy 127.0.0.1:8001",true)
      msg = "设置代理成功"
    } else {
      result = shell("settings put global http_proxy :0",true)
      msg = "关闭代理成功"
    }
    if(result.code == 0) {
      toast(msg)
    } else {
      toast("命令执行错误")
    }
  }else {
   toast("你取消了操作")
  }