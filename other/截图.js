let path = "screencap /storage/emulated/0/DCIM/自截图/"+ Math.round(Math.random()*100) +".png"
let data = shell(path, true);
if(data.code == 0) {
  toast("截图完成，路径:" + path)
}
