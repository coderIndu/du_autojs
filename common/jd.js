// 获取指定消息url
function getUrl(all, re) {
  // let re = ;
  // let re = /he/i
  let re_url = /^https/i;
  let url_ary = [];
  for (i = 0; i < all.length; i++) {
    let a1 = re.test(all[i]);
    // console.log(a1);
    let j = i;
    if (a1) {
      for (j; j < all.length; j++) {
        let a2 = all[j + 1];
        // log("开始内循环")
        if (re_url.test(a2) || a2 == "") {
          url_ary.push(all[j + 1]);
        } else {
          break;
        }
      }
    }
    // log(j);
    i = j;
  }
  // log(url_ary)
  return url_ary;
}
let jds = {
  getUrl: getUrl
}
module.exports = jds;