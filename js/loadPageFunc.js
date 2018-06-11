// --------------today---------------
function todayFuncs(location){
    //获取地理位置、天气、空气质量的基本信息
    setXmlData(location);
    var t = setInterval (function(){
        var isNotNull = true;
        $.each(xmlData,function(key, val){ 
            isNotNull = isNotNull && val;
        });
        if (isNotNull) {
            if (xmlData['weather']['status'] + xmlData['air/now']['status'] !== 'okok') {
                //错误信息提示框展示动画
                $('#error_page').queue(function(){
                                    $('#error_page').css('display', 'block');
                                    $('#error_page').dequeue();
                                })
                                .animate({top : 0}, 2000)
                                .delay(2000)
                                .animate({top : '-33%'}, 2000)
                                .queue(function(){
                                    $('#error_page').css('display', 'none');
                                })
                todayFuncs();
            } else {
                loadTodayView();
            }
            clearInterval(t);
            t = null;
        }
    },300);
}


// ------------collection------------
function collectionFuncs() { 
    $('#header').css('background', '#c6f1e7');
    $('#header #title i').css('display', 'none'); 
    $('#header .city').text('我的');
    $('#header .province').text('COLLECTION');
    $('#header .icon-jia').attr('class', 'iconfont icon-bi');
    loadWeakWeatherView('.col_weakday_info');
    $('#weakday_wrap').append('<div class="col_weather_info"></div>');
    loadWeakWeatherView('.col_weather_info');

}


//---------------news---------------
function newsFuncs() {

}

//---------------more---------------
function moreFuncs() {

}


//---------------others---------------
/**
 * @description 加载today页面
 */
function loadTodayView (){
    var todayInfo  = xmlData['weather']['daily_forecast'][0];
    $('#title').find('.city').text(`${xmlData['location/ip'][2]}市`);   
    $('#title').find('.province').text(`${xmlData['location/ip'][1]}省`);
    $('.today-weather').text(`${todayInfo['tmp_min']}-${todayInfo['tmp_max']}℃`);
    loadMainView();
    loadWeakWeatherView('#today_weakWeatherView');
    loadDetailView();
}

/**
 * @description 加载today页面中的正文模块
 */
function loadMainView () {
    var d = new Date(),
        todayInfo = xmlData['weather']['daily_forecast'][0],
        nowInfo = xmlData['weather']['now'],
        aqiNowInfo = xmlData['air/now']['air_now_city'],
        curIndex = 0;
    
    var curHtml = [{
        '.weather_img' : `<img src="${getWeatherImgUrl(xmlData['weather']['daily_forecast'][0])}" alt="">`,
        '.time_info' : `今天·${getCNWeakday(d.getDay())}`,
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
 * @description 加载today页面中的一周天气简报模块
 * @param {string} sel 展示模块的父级选择器
 */
function loadWeakWeatherView(sel) {
    var nowDate = new Date(),
        time    = nowDate.getTime() / 1000 / 3600 / 24,
        highArr = [],
        lowArr  = [];
    getLocalPage('./pages/weak-weather.html', function(response){
        $(sel).html(response);
        //定义滑动动画
        xScrollAnimate('.weak_weather_content');
        $.each($('.weakday'), function(idx, val){
            if (idx === 0) $(this).text('今天');
            else $(this).text(getCNWeakday((parseInt(nowDate.getDay()) + idx)));
        })
        $.each($('.date'), function(idx, val){
            var tmpDate = (new Date((time + idx) * 24 * 3600 * 1000)).toLocaleDateString().split('/');
            $(this).text(`${tmpDate[1]}·${tmpDate[2]}`);
        })
        $.each($(sel).find('.iconfont'), function(idx, val) {
            var iconClass = getWeatherIcon(idx % 3);
            $(this).addClass(iconClass);
        })
        $.each($('.high_tmp'), function(idx, val) {
            $(this).text(`${xmlData['weather']['daily_forecast'][idx % 3]['tmp_max']}°`);
        })
        $.each($('.low_tmp'), function(idx, val) {
            $(this).text(`${xmlData['weather']['daily_forecast'][idx % 3]['tmp_min']}°`);
        })
        $.each($('.high_idot'), function(idx, val) {
            var height = xmlData['weather']['daily_forecast'][idx % 3]['tmp_max'] * 2;
            highArr.push([15 + 39 * idx, 100 - height]);
            $(this).css('bottom', height + '%');
        })
        $.each($('.low_idot'), function(idx, val) {
            var height = xmlData['weather']['daily_forecast'][idx % 3]['tmp_min'] * 2;
            lowArr.push([15 + 39 * idx, 100 - height]);
            $(this).css('bottom', height + '%');
        })
        loadCanvas('.weather_canvas', highArr);
        loadCanvas('.weather_canvas', lowArr);
});

    
    
}


/**
 * @description 加载today页面中的detail模块
 */
function loadDetailView () {
    var htmlStr = $('#today_detailview').html(),
        weatherData = xmlData['weather'],
        airData = xmlData['air/now'];

    htmlStr =   setHtmlString (weatherData['update']['loc'].slice(11),
                                `${getWeatherIcon()}`,
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
                                `${getWeatherIcon(1)}`,
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
                                `${getWeatherIcon(2)}`,
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
            $('.tl_btn').children().click(function() {
                $('#login_page').css('left', '100%');
                setTimeout(function(){$('#login_page').html(null)}, 500);
            });
        });
}

/**
 * @description 加载搜索页面
 */
function loadSearchPage () {
    var tmpStr = '',
        hotCity = [];
    $.each(hotCityList, function(idx, val){
        tmpStr += searchCityInfo(val)[0];
        if (idx !== hotCityList.length - 1) { tmpStr += '|'};
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
                    setCityBtn(searchCity.slice(0, 37), '.choose .btn_wrap');
                }
            });
            setCityBtn([xmlData['locData'].join()], '.locate .btn_wrap');
            setCityBtn(hotCity, '.hot .btn_wrap');
        })
}

/**
 * @description 通过canvas标签绘制折线图
 * @param {String} sel canvas对象选择器
 * @param {array} arr 路径数组
 */
function loadCanvas(sel, arr){
    //获得画布
    var canvas  = document.querySelector(sel);
    if (canvas){
        var ctx = canvas.getContext("2d");//获得画笔
        ctx.beginPath();
        ctx.moveTo(0, arr[0][1] - 5);
        arr.forEach(function(val, idx, arr){
            ctx.lineTo(val[0], val[1]);
        })
        ctx.lineTo(300, arr[0][1] + 5);
        ctx.stroke();
    }
}