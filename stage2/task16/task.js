var $ = function(id) {
    return document.getElementById(id);
}

var aqiData = {};
var errorMsgList=[];

function addAqiData() {
    var city = $('aqi-city-input').value.trim();
    var num = $('aqi-value-input').value.trim();
    if(!isChinese(city) && !isEnglish(city)){
    var errMsg = "请在城市一栏输入中英文字符";
    $('aqi-city-input').value="";
    errorMsgList.push(errMsg);

      }
  if(!isInteger(num)){
    var errMsg = "请在空气质量一栏输入整数";
    errorMsgList.push(errMsg);
    $('aqi-value-input').value="";
  }
   if(errorMsgList.length){
    var errorStr = errorMsgList.join(" & ");
    alert(errorStr);
    errorMsgList=[];
  }else{
    aqiData[city] = num;
  }
}
function isChinese(str){
  var reg = /[\u4e00-\u9fa5]/;//匹配任何在[]范围内的字符
  //利用split方法分割字符串，使它变成字符串数组
  var strArr = str.split("");
  for(var i=0; i<strArr.length;i++){
    if(!reg.test(strArr[i])){
      return false;
    }
  }
  return true;
}
//判断输入是否为英文字符的方法
function isEnglish(str){
  //小写字母
  var lowerReg = /[\u0061-\u007a]/,
      upperReg = /[\u0041-\u005a]/;
  var strArr = str.split("");
  for(var i=0; i<strArr.length;i++){
    if(!lowerReg.test(strArr[i]) && !upperReg.test(strArr[i])){
      return false;
    }
  }
  return true;
}
//判断是否为整数
function isInteger(num){
  if(num%1==0){//任何整数对1求余都为0
    return true;
  }
  return false;
}

function renderAqiList() {
    var table = $('aqi-table');
    var list = [];
    var text = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    list.push(text);
    for (var item in aqiData) {
        text = "<tr><td>" + item + "</td><td>" + aqiData[item] + "</td><td data-city=" + item + " style='cursor:pointer'>删除</td></tr>";
        list.push(text);
    }
    text = list.join("");
    table.innerHTML = item ? text : "";

}

function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

function delBtnHandle(e) {
    var city = e.target.dataset.city;

    if (city)
        delete aqiData[city];
    renderAqiList();
}

function init() {
    $('add-btn').onclick = addBtnHandle;
    $('aqi-table').onclick = delBtnHandle;
}
init();
