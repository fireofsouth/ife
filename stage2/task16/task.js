var $ = function(id) {
    return document.getElementById(id);
}

var aqiData = {};


function addAqiData() {
    var city = $('aqi-city-input').value.trim();
    var num = $('aqi-value-input').value;
    if (city != "" && num != "")
        aqiData[city] = parseInt(num);
    else
        return;
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
