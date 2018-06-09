//TODO:调整icon
//----------BOOL----------

/**
 * @description 判断当前是否是晚上（20点至次日6点）
 * @returns Boolean true:是晚上
 */
function isNowNight () {
    var d = new Date().toLocaleTimeString();
    return (d.match(/下午/) && parseInt(d.slice(2)) > 7) || (d.match(/上午/) && (parseInt(d.slice(2)) < 7) || parseInt(d.slice(2)) === 12);
}

//----------LOAD----------

/**
 * @description 加载today页面
 */
function loadTodayView (){
    var todayInfo  = xmlData['weather']['daily_forecast'][0];
    $('#title').find('.city').text(`${xmlData['location/ip'][2]}市`);   
    $('#title').find('.province').text(`${xmlData['location/ip'][1]}省`);
    $('.today-weather').text(`${todayInfo['tmp_min']}-${todayInfo['tmp_max']}℃`);
    loadMainView();
    loadDetailView();
}

/**
 * @description 加载today页面中的mainView
 */
function loadMainView () {
    var d = new Date(),
        todayInfo = xmlData['weather']['daily_forecast'][0],
        nowInfo = xmlData['weather']['now'],
        aqiNowInfo = xmlData['air/now']['air_now_city'],
        curIndex = 0;
    
    var curHtml = [{
        '.weather_img' : `<img src="${getWeatherImgUrl(xmlData['weather']['daily_forecast'][0])}" alt="">`,
        '.time_info' : "今天·周" + "日一二三四五六".charAt(d.getDay()),
        '.degree_info' : todayInfo['tmp_min'] + '-' + todayInfo['tmp_max'] + '℃',
        '.weather_info' : isNowNight() ? todayInfo['cond_txt_n'] : todayInfo['cond_txt_d']
    },{
        '.weather_img' : `<img src="${getWeatherImgUrl(xmlData['weather']['now'])}" alt="">`,
        '.time_info' : "现在·" + getFullLocalHour(d.toLocaleTimeString()),
        '.degree_info' : nowInfo['tmp'] + '℃',
        '.weather_info' : nowInfo['cond_txt']
    }];

    $.each(curHtml[curIndex], function(key, val){ $(key).html(val); });
    $('.quality_info').text(`${aqiNowInfo.aqi} 空气质量${aqiNowInfo.qlty}`).css({'background': `${colorArr[parseInt(aqiNowInfo.aqi / 50)]}`});
    if (weatherFlashInterval) clearInterval(weatherFlashInterval);
    weatherFlashInterval = setInterval(function(){
        if (curIndex === 0) curIndex = 1;
        else curIndex = 0;
        $.each(curHtml[curIndex], function(key, val){ $(key).html(val); });
    },4000);
}

/**
 * @description 加载today页面中的detailview
 */
function loadDetailView () {
    var htmlStr = $('#today_detailview').html(),
        weatherData = xmlData['weather'],
        airData = xmlData['air/now'];

    htmlStr =   setHtmlString (weatherData['update']['loc'].slice(11),
                                `${getWeatherIcon(weatherData['now']['cond_code'])}`,
                                `${weatherData['now']['cond_txt']}&nbsp${weatherData['now']['tmp']}℃`,
                                `<table><tr>
                                    <td>
                                        降雨量&nbsp${weatherData['now']['pcpn']}
                                    </td>
                                    <td>
                                        湿度&nbsp${weatherData['now']['hum']}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ${weatherData['now']['wind_dir']}&nbsp${weatherData['now']['wind_sc']}级
                                    </td>
                                    <td>
                                        体感温度&nbsp${weatherData['now']['fl']}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        能见度&nbsp${weatherData['now']['vis']}
                                    </td>
                                    <td>
                                        夜间天气&nbsp${weatherData['daily_forecast'][2]['cond_txt_n']}
                                    </td>
                                </tr></table>`
                                );
    htmlStr +=  setHtmlString  ("",
                                `${getAirIcon(airData)}`,
                                `空气指数:&nbsp${airData['air_now_city']['aqi']}&nbsp${airData['air_now_city']['qlty']}`,
                                `<table><tr>
                                    <td>PM2.5&nbsp${airData['air_now_city']['pm25']}</td>
                                    <td>PM10&nbsp${airData['air_now_city']['pm10']}</td>
                                    <td>SO2&nbsp${airData['air_now_city']['so2']}</td>
                                </tr>
                                <tr>
                                    <td>NO2&nbsp${airData['air_now_city']['no2']}</td>
                                    <td>CO&nbsp${airData['air_now_city']['co']}</td>
                                    <td>O3&nbsp${airData['air_now_city']['o3']}</td>
                                </tr></table>`
                                );                            
    htmlStr +=  setHtmlString  ("",
                                'icon-aixin',
                                `生活指数`,
                                `<table><tr>
                                    <td>舒适度&nbsp${weatherData['lifestyle'][0]['brf']}</td>
                                    <td>穿衣&nbsp${weatherData['lifestyle'][1]['brf']}</td>
                                </tr>
                                <tr>
                                    <td>紫外线&nbsp${weatherData['lifestyle'][5]['brf']}</td>
                                    <td>感冒&nbsp${weatherData['lifestyle'][2]['brf']}</td>
                                </tr>
                                <tr>
                                    <td>运动&nbsp${weatherData['lifestyle'][3]['brf']}</td>
                                    <td>交通&nbsp${weatherData['lifestyle'][4]['brf']}</td>
                                </tr></table>`
                                );
    htmlStr +=  setHtmlString  ("",
                                'icon-hangche',
                                `今日限行尾号:&nbsp${getLimitNum(new Date().getDay())}`,
                                `明日现行尾号:&nbsp${getLimitNum(new Date().getDay() + 1)}`
                                );
    htmlStr += setHtmlString   ('明天',
                                `${getWeatherIcon(weatherData['daily_forecast'][1]['cond_code_d'])}`,
                                `${weatherData['daily_forecast'][1]['cond_txt_d']}&nbsp${weatherData['daily_forecast'][1]['tmp_min'] + '-' + weatherData['daily_forecast'][1]['tmp_max'] + '℃'}`,
                                `<table><tr>
                                    <td>夜间天气&nbsp${weatherData['daily_forecast'][1]['cond_txt_n']}</td>
                                    <td>${weatherData['daily_forecast'][1]['wind_dir']}&nbsp${weatherData['daily_forecast'][1]['wind_sc']}级</td>
                                </tr>
                                <tr>
                                    <td>降水概率&nbsp${weatherData['daily_forecast'][1]['pop']}</td>
                                    <td>湿度&nbsp${weatherData['daily_forecast'][1]['hum']}</td>
                                </tr></table>`
                                );
    htmlStr += setHtmlString   ('后天',
                                `${getWeatherIcon(weatherData['daily_forecast'][2]['cond_code_d'])}`,
                                `${weatherData['daily_forecast'][2]['cond_txt_d']}&nbsp${weatherData['daily_forecast'][2]['tmp_min'] + '-' + weatherData['daily_forecast'][2]['tmp_max'] + '℃'}`,
                                `<table><tr>
                                    <td>夜间天气&nbsp${weatherData['daily_forecast'][2]['cond_txt_n']}</td>
                                    <td>${weatherData['daily_forecast'][2]['wind_dir']}&nbsp${weatherData['daily_forecast'][2]['wind_sc']}级</td>
                                </tr>
                                <tr>
                                    <td>降水概率&nbsp${weatherData['daily_forecast'][2]['pop']}</td>
                                    <td>湿度&nbsp${weatherData['daily_forecast'][2]['hum']}</td>
                                </tr></table>`
                                );
    $('#today_detailview').html(htmlStr);
}

/**
 * @description 加载登录页面
 */
function loadLoginPage(){
    getLocalPage('./pages/log-reg.html',function (response){
            $('#login_page').html(response).css('left', '0');
            setLogPage();
            $('.log_btn').click(setLogFunc);
            $('.reg_btn').click(setRegFunc);
        });
}

/**
 * @description 加载搜索页面
 */
function loadSearchPage () {
    var tmpStr = '',
        hotCity = ['长沙','香港','丽江','北京','深圳','武汉','成都','杭州','澳门','苏州'];
    $.each(hotCity, function(idx, val){
        tmpStr += searchCityInfo(val)[0];
        if (idx !== hotCity.length - 1) { tmpStr += '|'};
    });
    hotCity = tmpStr.split('|');
    getLocalPage('./pages/search.html', function (response){ 
            $('#search_page').html(response).css('left','0'); 
            $('.search_back_icon').click(function(){
                $('#search_page').css('left', '-70%');
            });
            $('.search_ipt').bind('input propertychange', function(){
                $('.choose').css('display', 'block');
                var searchCity = searchCityInfo($(this).val());
                if (searchCity && searchCity !== []){
                    setCityBtn(searchCity, '.choose .btn_wrap');
                }
            });
            setCityBtn([xmlData['locData'].join()], '.locate .btn_wrap');
            setCityBtn(hotCity, '.hot .btn_wrap');
        })
}

//----------SET-----------

/**
 * @description 获取地址、天气、空气质量信息并赋值给xmlData
 * @param {string} location 需要查询的地址，忽略则取用当前IP所在地址
 */
function setXmlData (location){
    $.each(xmlData,function(key, val){ if(key !== 'locData')xmlData[key] = null; });
    if (location) xmlData['location/ip'] = location; 
    else getLocationData('location/ip');

    var t = setInterval(function(){
        if (xmlData['location/ip']) {
            getWeatherData('air/now', xmlData['location/ip'][2]);
            getWeatherData('weather', xmlData['location/ip'][2]);
            clearInterval(t);
            t = null;
        }
    },300);
}

/**
 * 
 * @description 拼接detailview板块的各个子版块信息
 * @param {string} title  子版块主标题
 * @param {string} attr   子版块副标题的icon图表类名
 * @param {string} content 子版块副标题
 * @param {string} detail 子版块主要内容
 */
function setHtmlString(title, attr, content, detail) {
    return `
    <div class="detailContent">
        <div class="title">
                ${title}
            </div>
            <div class="content">
                <div class="cont_title">
                    ${content}
                    <i class="iconfont ${attr}"></i>
                </div>
                <div class="detail">
                    ${detail}
                </div>
            </div>
        </div>
    `;
}

/**
 * @description 设置登录页相关功能
 */
function setLogPage (){
    setTipsClear();
    $('.login_wrap').css('height', '100px');
    $('.logo').css({'width':'256px', 'height':'256px', 'margin':'72px auto'});
    $('.log_btn').css('display', 'block');
    $('.reg_btn').css('display', 'none');
    $('.tr_btn').children().click(setRegPage);
    $('.tl_btn').children().click(function() {
        $('#login_page').css('left', '100%');
        setTimeout(function(){$('#login_page').html(null)}, 500);
    });
}

/**
 * @description 设置注册页相关功能
 */
function setRegPage (){
    $('.login_wrap').css('height', '450px');
    $('.logo').css({'width':'50px', 'height':'50px', 'margin':'0 auto'});
    $.each(reg_rule, function(idx, val) {
        $(val.sel).on('blur', function(){getUserInfoVerify($(this), val.regx)})
    ;})
    $('.log_btn').css('display', 'none');
    $('.reg_btn').css('display', 'block');
    $('.verif_text').text(getVerificationCode(4)).click(function(){
        $(this).text(getVerificationCode(4));
    }); 
    $(this).click(setLogPage);
}

/**
 * @description 将城市信息加载到sel页面上
 * @param {Array} arr 城市信息数组
 * @param {String} sel 待加载页面选择器
 */
function setCityBtn(arr, sel) {
    var htmlStr = '';
    arr.forEach(function(val, idx, arr) {
        htmlStr += `<div class="city_btn" data-locInfo=${val}>${val.slice(val.lastIndexOf(',') + 1)}</div>`;
    })
    $(sel).html(htmlStr);
    setTimeout(function() {
        $('.city_btn').click(function() {
            todayFuncs($(this).attr('data-locInfo').split(','));
            $('.search_back_icon').click();
        })
    }, 200);
}

/**
 * @description 清除注册页面错误提示信息
 */
function setTipsClear (){
    $('.tips').css('opacity', '0');
    $('.wrong_tag').css('right', '50px');
}

//TODO:
/**
 * @description 注册按钮功能逻辑
 */
function setRegFunc (){
    $('.user_ipt').trigger('blur');
}

/**
 * @description 登录按钮功能逻辑
 */
function setLogFunc (){
    console.log(1);
}

//----------GET-----------
/**
 * @description 获取动态页面信息
 * @param {string} url 页面地址
 * @param {Function} success 回调函数
 */
function getLocalPage (url, success) {
    $.ajax({
        url : url,
        type : 'GET',
        success : success
    })
}

/**
 * @description 调用百度地图api获取当前地址，并赋值给xmlDdta对象
 * @param {*} url api接口
 */
function getLocationData (url){
    $.ajax({
        url: 'http://api.map.baidu.com/' + url,
        type: 'GET',
        data: {
            'ak' : '7ZlcHGoo1hUOedvlmVfKk6TNAG7vyBtG',
            'coor' : 'gcj02'
        },
        dataType:'jsonp',
        success:function(response){ 
            var tmpArr = response['address'].split('|');
            tmpArr.splice(3);
            xmlData[url] = tmpArr;
            xmlData['locData'] = tmpArr; 
        }
    })
}

/**
 * @description 调用和风天气api获取当前天气或空气质量，并赋值给xmlDdta对象
 * @param {*} url api接口
 */
function getWeatherData (url, location){
    $.ajax({
        url: `https://free-api.heweather.com/s6/${url}?parameters`,
        type: 'GET',
        data: {
            'key':'d435517aad8148dfa6d1fd29a52a47e7',
            'location' : location
        },
        dataType:'json',
        success:function(response){ 
            xmlData[url] = response['HeWeather6']['0']; 
        }
    })
}

/**
 * @description 获得当日限号
 * @param {Number} day 星期数
 * @returns 当日限号号数
 */
function getLimitNum (day) {
    day %= 7;
    return (day === 0) || (day === 6) ? "不限行" : `${day} & ${day === 5 ? 0 : day + 5}`;
}

/**
 * @description 获取24小时制时间
 * @param {Date} time 时间
 * @returns 24小时制时间
 */
function getFullLocalHour (time) {
    return time.slice(0, 1) === '下' ? parseInt(time.slice(2, time.length - 3)) + 12 + time.slice(time.length - 6, time.length - 3) : time.slice(2, time.length - 3);
}

/**
 * @description 监测用户输入信息是否合法
 * @param {Document} el input输入框对象
 * @param {RegExp} regx 正则表达式
 */
function getUserInfoVerify(el, regx){
    if (typeof(regx) === 'string'){
        if (regx.match(/text/)){
            regx = new RegExp(eval(regx), 'i');
        }else {
            regx = new RegExp(eval(regx));
        }
    } 
    if (el.val() && el.val().match(regx)){
        el.siblings('.tips').css('opacity', '0');
        el.siblings('.wrong_tag').css('right', '50px');
    } else {
        el.siblings('.tips').css('opacity', '1');
        el.siblings('.wrong_tag').css('right', '13px');
    }
}

/**
 * @description 通过天气代码获取对应图片url
 * @param {Object} obj 天气信息对象
 * @returns string 图片url 
 */
function getWeatherImgUrl (obj) {
    var endStr = '.png',
        tmpArr = ['100', '103', '104', '300', '301', '406', '407'];
    tmpArr.forEach(function(val, idx, arr){
        if ((obj['cond_code_n'] === val || obj['cond_code'] === val) && isNowNight()) {
            endStr = 'n.png';
        }
    });
    if (obj['cond_code']){
        return `./imgs/weather-icon/${obj['cond_code']}${endStr}`;
    }else if (obj['cond_code_n']){
        var condCode = isNowNight() ? obj['cond_code_n'] : obj['cond_code_d'];
        return `./imgs/weather-icon/${condCode}${endStr}`;
    } else {
        throw ('参数错误');
    }
}

/**
 * @description 获取天气图标
 * @param {Object} obj 天气信息对象
 * @returns string 天气图标类名
 */
function getWeatherIcon (obj){
    var iconName = 'icon-unknown'
    WeatherIconRullArr.forEach(function(val, idx, arr){
        if (obj.match(val['regx'])) iconName = val.icon;
    });
    return iconName;
}

/**
 * @description 获取空气质量图标
 * @param {Object} obj 空气信息对象
 * @returns string 空气图标类名
 */
function getAirIcon (obj) {
    var rate = parseInt(obj['air_now_city'].aqi / 50);
    var iconArr = ['icon-laugh','icon-weixiao','icon-kaixin','icon-face','icon-unhappy','icon-angry'];
    return iconArr[rate];
}

//----------Others----------
/**
 * @description 地址搜索
 */
function searchCityInfo(cityName){
    if (!cityName) return;
    var regx = new RegExp(cityName),
        tmpStr = ',',
        cityList = [];
    $.each(City_Info, function(idx, val) {
        var province = val.province.slice(0, val.province.indexOf(','));
        $.each(val.citys, function(idx, item){
            if ((province === cityName) && idx < 38){
                cityList.push(`,${val.province.slice(0, item.indexOf(','))},${item.slice(0, item.indexOf(','))}`);
            } else {
                if (regx.test(item)) cityList.push(`,${province},${item.slice(0, item.indexOf(','))}`);
            }
        });
    });
    return cityList;
}