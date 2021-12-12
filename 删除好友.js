// root

// 跳转京东好有页面
// log(desc("管理").depth(12).find().size())
app.startActivity({
    packageName: "com.jingdong.app.mall", 
    className: "com.jd.lib.jdfriend.view.activity.FriendListActivity", 
    root: true
});
console.show()
// var friends = className("android.widget.TextView").depth(10).drawingOrder(3).find()

// log(friends.size())
for (var i = 0; ;) {
  // var friends = className("android.view.ViewGroup").depth(9).drawingOrder(2).find()
  var friend = className("android.view.ViewGroup").depth(9).drawingOrder(2).findOne(3000)
  // log(className("android.view.ViewGroup").depth(9).exists())
  if (friend == null) {
    break
  }
  var image = className("android.widget.ImageView").depth(2).findOne(500)
  if (image != null) {
    // log("存在")
  } else {
    // log("不存在");
    // log("进入，开始删除...")
    if (friend.click()) {
      let manage = desc("管理").depth(12).findOne(3000)
      if (desc("管理").depth(12).exists() && manage != null) {
        // log("存在")
        click(manage.bounds().centerX(), manage.bounds().centerY());
  
        className("android.widget.Button").depth(4).findOne().click()
  
        className("android.widget.Button").depth(5).id("bq").text("删除").findOne().click()
        console.info("删除" + i + "个好友")
        i++;
      } else {
        log("不存在")
        sleep(1000)
        back()
      }
    }
  }
  // sleep(2500)
}


console.hide()
toast("删除完成，结束");
exit()
console.hide()
toast("删除完成，结束");
exit()