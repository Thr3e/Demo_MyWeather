function getFullLocalHour (time) {
    return time.slice(0, 1) === '下' ? parseInt(time.slice(2, time.length - 3)) + 12 + time.slice(time.length - 6, time.length - 3) : time.slice(2, time.length - 3);
}

function getLocationData (url){
    $.ajax({
        url: 'http://api.map.baidu.com/' + url,
        type: 'GET',
        data: {
            'ak' : '7ZlcHGoo1hUOedvlmVfKk6TNAG7vyBtG',
            'coor' : 'gcj02'
        },
        dataType:'jsonp',
        success:function(response){ xmlData[url] = response['address'].split('|'); }
    })
}

function getWeatherData (url, location){
    $.ajax({
        url: `https://free-api.heweather.com/s6/${url}?parameters`,
        type: 'GET',
        data: {
            'key':'d435517aad8148dfa6d1fd29a52a47e7',
            'location' : location
        },
        dataType:'json',
        success:function(response){ xmlData[url] = response['HeWeather6']['0']; }
    })
}

function setXmlData (location){
    jQuery.each(xmlData,function(key, val){ xmlData[key] = null; });
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

function loadTodayView (){
    var todayInfo  = xmlData['weather']['daily_forecast'][0],
    aqiNowInfo = xmlData['air/now']['air_now_city'];
    $('#title').find('.city').text(`${xmlData['location/ip'][2]}市`);   
    $('#title').find('.province').text(`${xmlData['location/ip'][1]}省`);
    $('.today-weather').text(`${todayInfo['tmp_min']}-${todayInfo['tmp_max']}℃`);
    $('.quality_info').text(`${aqiNowInfo.aqi}&nbsp空气质量${aqiNowInfo.qlty}`);
    $('.quality_info').css({'background': `${colorArr[parseInt(aqiNowInfo.aqi / 50)]}`});

    loadMainview(xmlData['weather']);
    loadDetailview(xmlData['weather'], xmlData['air/now']);
}

function loadMainview (dataInfo) {
    var d = new Date(),
        todayInfo = dataInfo['daily_forecast'][0],
        nowInfo = dataInfo['now'],
        curIndex = 0;
    
    var curHtml = [{
        'icon' : getWeatherImgUrl(dataInfo['daily_forecast'][0]),
        'time' : "今天·周" + "日一二三四五六".charAt(d.getDay()),
        'weather' : todayInfo['tmp_min'] + '-' + todayInfo['tmp_max'] + '℃',
        'text' : isNowNight() ? todayInfo['cond_txt_n'] : todayInfo['cond_txt_d']
    },{
        'icon' : getWeatherImgUrl(dataInfo['now']),
        'time' : "现在·" + getFullLocalHour(d.toLocaleTimeString()),
        'weather' : nowInfo['tmp'] + '℃',
        'text' : nowInfo['cond_txt']
    }];
    
    $('.weather_img').html(`<img src="${curHtml[curIndex]['icon']}" alt="">`);
    $('.time_info').text(curHtml[curIndex]['time']);
    $('.degree_info').text(curHtml[curIndex]['weather']);
    $('.weather_info').text(curHtml[curIndex]['text']);
    var t = setInterval(function(){
        if (curIndex === 0) curIndex = 1;
        else curIndex = 0;
        $('.weather_img').html(`<img src="${curHtml[curIndex]['icon']}" alt="">`);
        $('.time_info').text(curHtml[curIndex]['time']);
        $('.degree_info').text(curHtml[curIndex]['weather']);
        $('.weather_info').text(curHtml[curIndex]['text']);
    },4000);
}

function loadDetailview (weatherData, airData) {
    var htmlStr = $('#today_detailview').html();

    htmlStr +=   joinHtmlString (weatherData['update']['loc'].slice(11),
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
    htmlStr +=  joinHtmlString  ("",
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
    htmlStr +=  joinHtmlString  ("",
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
    htmlStr +=  joinHtmlString  ("",
                                'icon-hangche',
                                `今日限行尾号:&nbsp${getLimitNum(new Date().getDay())}`,
                                `明日现行尾号:&nbsp${getLimitNum(new Date().getDay() + 1)}`
                                );
    htmlStr += joinHtmlString   ('明天',
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
    htmlStr += joinHtmlString   ('后天',
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

function joinHtmlString(title, attr, content, detail) {
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

function getLimitNum (day) {
    day %= 7;
    return (day === 0) || (day === 6) ? "不限行" : `${day} & ${day === 5 ? 0 : day + 5}`;
}

function verifyUserInfo(el, regx){
    if (el.val() && el.val().match(regx)){
        el.siblings('.tips').css('opacity', '0');
        el.siblings('.wrong_tag').css('right', '50px');
    } else {
        el.siblings('.tips').css('opacity', '1');
        el.siblings('.wrong_tag').css('right', '13px');
    }
}

function clearTips (){
    $('.tips').css('opacity', '0');
    $('.wrong_tag').css('right', '50px');
}

function regFunc (){
    $('.user_ipt').trigger('blur');
    $('.topleft_btn').children().attr({ class : 'iconfont icon-zhuce' })
}

function logFunc (){
    console.log(1);
    // TODO:
}

function loadLoginPage(){
    $('#login_page').css('left', '0');
    setLogPage();
    $('.log_btn').click(logFunc);
    $('.reg_btn').click(regFunc);
}

function setLogPage (){
    clearTips();
    $('.login_wrap').css('height', '100px');
    $('.logo').css({'width':'256px', 'height':'256px', 'margin':'72px auto'});
    $('.log_btn').css('display', 'block');
    $('.reg_btn').css('display', 'none');
    $('.tr_btn').children().click(setRegPage);
    $('.tl_btn').children().click(function() {
        $('#login_page').css('left', '100%');
        setLogPage();
    });
}

function setRegPage (){
    $('.login_wrap').css('height', '450px');
    $('.logo').css({'width':'50px', 'height':'50px', 'margin':'0 auto'});
    $('.user_name').on('blur', function(){verifyUserInfo($(this), /^\w{6,20}$/)});
    $('.user_pwd').on('blur', function(){verifyUserInfo($(this), /^[A-Z].{5,}$/)});
    $('.conf_pwd').on('blur', function(){verifyUserInfo($(this), $('.user_pwd').val())});
    $('.user_email').on('blur', function(){verifyUserInfo($(this), /^.?@\w+\.\w+$/)});
    $('.user_tel').on('blur', function(){verifyUserInfo($(this), /^1\d{10}$/)});
    $('.verf_code').on('blur', function(){verifyUserInfo($(this), $('.verif_text').text())});
    $('.log_btn').css('display', 'none');
    $('.reg_btn').css('display', 'block');
    $('.verif_text').text(getVerificationCode(4)).click(function(){
        $(this).text(getVerificationCode(4));
    }); 
    $(this).click(setLogPage);
}

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

function isNowNight () {
    var d = new Date().toLocaleTimeString();
    return (d.match(/下午/) && parseInt(d.slice(2)) > 7) || (d.match(/上午/) && (parseInt(d.slice(2)) < 7) || parseInt(d.slice(2)) === 12);
}

function getWeatherIcon (obj){
    var iconName = 'icon-unknown'
    WeatherIconRullArr.forEach(function(val, idx, arr){
        if (obj.match(val['regx'])) iconName = val.icon;
    });
    return iconName;
}

function getAirIcon (obj) {
    var rate = parseInt(obj['air_now_city'].aqi / 50);
    var iconArr = ['icon-laugh','icon-weixiao','icon-kaixin','icon-face','icon-unhappy','icon-angry'];
    return iconArr[rate];
}

function loadSearchPage () {
    $('#search_page').css('left','0');
    $('.search_back_icon').click(function(){$('#search_page').css('left', '-70%')});
    var curCity = [],
        chooseCity = [],
        hotCity = ['重庆','香港','上海','北京','深圳','武汉','成都','杭州','澳门','苏州'];
    getLocationData ('location/ip', function (response) {
        curCity.push(response['address'].split('|')[2]); 
        setCityBtn(curCity, '.locate .btn_wrap');
    });
    City_Info.forEach(function(val, idx, arr){
        chooseCity.push(val['province'].slice(0,val['province'].indexOf(',')));
    })
    setCityBtn(chooseCity, '.choose .btn_wrap');
    setCityBtn(hotCity, '.hot .btn_wrap');
    $('.locate .city_btn, .hot .city_btn').click(function(){
        var location = $(this).text();
        getWeatherData ('weather', location, function (response) {
            var wthData = response['HeWeather6']['0'],
                todayInfo = wthData['daily_forecast'][0];
            loadMainview (wthData);
            $('.today-weather').text(todayInfo['tmp_min'] + '-' + todayInfo['tmp_max'] + '℃');
        });
        getWeatherData ('air/now', location, function (response) {
            // airData = response['HeWeather6']['0'];
            // setTimeout(loadDetailview, 1000);
            // console.log(AirData);
            // var aqi = parseInt(AirData['air_now_city']['aqi']);
            // $('.quality_info').text(aqi + ' 空气质量' + AirData['air_now_city']['qlty']);
            // $('.quality_info').css({'background': `${colorArr[parseInt(aqi / 50)]}`});
        });
        $('#search_page').css('left', '-70%');
    })

}

function setCityBtn(arr, sel) {
    var htmlStr = '';
    arr.forEach(function(val, idx, arr) {
        htmlStr += `<div class="city_btn">${val}</div>`;
    })
    $(sel).html(htmlStr);
}