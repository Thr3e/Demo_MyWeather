// --------------today---------------
function todayFuncs(location){
    //获取地理位置、天气、空气质量的基本信息
    setXmlData(location);
    var t = setInterval (function(){
        //等待数据获取
        var isNotNull = true;
        $.each(xmlData,function(key, val){ 
            isNotNull = isNotNull && val;
        });
        if (isNotNull) {
            //若数据获取失败，则加载定位天气以及弹出错误提示
            if (xmlData['weather']['status'] + xmlData['air/now']['status'] !== 'okok') {
                //错误信息提示框展示动画
                loadErrorTag();
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
    //重载头部样式及内容
    reloadHeader(1);
    //设置页面内头部内容
    loadWeakWeatherView('.col_weakday_info', '.title_wrap');
    $('.now_date .day').text(DateInfo.day);
    $('.now_date .month').text(DateInfo.month);
    $('.now_date .weak').text(DateInfo.weakday);
    //加载内容模块
    loadCollectDetailView();
}


//---------------news---------------
function newsFuncs() {
    reloadHeader(2);
    //获取用户登录状态
    var curUser = getCurUser();
    if(!curUser){
        getHistoryData();
        getStarData();
        getLaughData();
    }else {
        //如果用户已登录，则加载自定义模块
        var userCus = getUserCus(),
            tmpArr = [];
        userCus.forEach(function(val, idx, arr){
            if (val.user_name === curUser.user_name) {
                tmpArr = val.contents;
            }
        })
        tmpArr.forEach(function(val, idx, arr){
            eval(val + '()');
        })
    }
}

//---------------more---------------
function moreFuncs() {
    reloadHeader(3);
    $('.func_wrap').slideUp('fast');
    $('.set_title').click(function(){            
        //调用jq封装的动画实现子菜单的显隐
        $(this).siblings('.func_wrap').slideToggle();
        //切换i标签的图样
        $(this).children().toggleClass('icon-xia icon-queren');
        setRewritePwdFunc();
        getCustomNewsPage();
    });
}


//---------------others---------------
/**
 * @description 加载today页面
 */
function loadTodayView (){
    var todayInfo  = xmlData['weather']['daily_forecast'][0];
    reloadHeader(0)
    $('.today-weather').text(`${todayInfo['tmp_min']}-${todayInfo['tmp_max']}℃`);
    loadMainView();
    loadWeakWeatherView('#today_weakWeatherView');
    loadDetailView();
}

/**
 * @description 加载today页面中的正文模块
 */
function loadMainView () {
    var todayInfo = xmlData['weather']['daily_forecast'][0],
        nowInfo = xmlData['weather']['now'],
        aqiNowInfo = xmlData['air/now']['air_now_city'],
        curIndex = 0;
    var curHtml = [{
        '.weather_img' : `<img src="${getWeatherImgUrl(xmlData['weather']['daily_forecast'][0])}" alt="">`,
        '.time_info' : '今天·' + DateInfo.weakday,
        '.degree_info' : todayInfo['tmp_min'] + '-' + todayInfo['tmp_max'] + '℃',
        '.weather_info' : isNowNight() ? todayInfo['cond_txt_n'] : todayInfo['cond_txt_d']
    },{
        '.weather_img' : `<img src="${getWeatherImgUrl(xmlData['weather']['now'])}" alt="">`,
        '.time_info' : "现在·" + getFullLocalHour(DateInfo.time),
        '.degree_info' : nowInfo['tmp'] + '℃',
        '.weather_info' : nowInfo['cond_txt']
    }];

    $.each(curHtml[curIndex], function(key, val){ $(key).html(val); });
    $('.quality_info').text(`${aqiNowInfo.aqi} 空气质量${aqiNowInfo.qlty}`).css({'background': `${colorArr[parseInt(aqiNowInfo.aqi / 50)]}`});
    if (weatherFlashInterval) clearInterval(weatherFlashInterval);
    weatherFlashInterval = setInterval(function(){
        curIndex = Number(!curIndex);
        $.each(curHtml[curIndex], function(key, val){ $(key).html(val); });
    },4000);
}

function loadLocateAirView(sel, obj, idx){
    var htmlStr = `
        <div class="locate_air">
            <h3 class="locate">${obj['location/ip'][2]}市</h3>
            <div class="air">${obj['air/now']['air_now_city']['aqi']}&nbsp${obj['air/now']['air_now_city']['qlty']}</div>
        </div>
    `
    $(sel).append(htmlStr);
    $('.locate_air_wrap .air').eq(idx).css('background', colorArr[parseInt(obj['air/now']['air_now_city']['aqi'] / 50)]);
}

/**
 * @description 加载today页面中的一周天气简报模块
 * @param {string} sel 展示模块的父级选择器
 * @param {string} children 加载某特定模块的选择器
 * @param {object} obj 加载某特定地区的数据obj
 */
function loadWeakWeatherView(sel,children, obj) {
    var nowDate = new Date(),
        time    = nowDate.getTime() / 1000 / 3600 / 24,
        highArr = [],
        lowArr  = [],
        curObj  = obj ? obj : xmlData;
    getLocalPage('./pages/weak-weather.html', function(response){
        if (children) $(sel).append($(response).children(children));
        else $(sel).html(response);
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
            $(this).text(`${curObj['weather']['daily_forecast'][idx % 3]['tmp_max']}°`);
        })
        $.each($('.low_tmp'), function(idx, val) {
            $(this).text(`${curObj['weather']['daily_forecast'][idx % 3]['tmp_min']}°`);
        })
        $.each($('.high_idot'), function(idx, val) {
            var height = curObj['weather']['daily_forecast'][idx % 3]['tmp_max'] * 2;
            highArr.push([15 + 39 * idx, 100 - height]);
            $(this).css('bottom', height + '%');
        })
        $.each($('.low_idot'), function(idx, val) {
            var height = curObj['weather']['daily_forecast'][idx % 3]['tmp_min'] * 2;
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
    var htmlStr     = $('#today_detailview').html(),
        weatherData = xmlData['weather'],
        nowWeather  = weatherData['now'],
        lifeData    = weatherData['lifestyle'],
        dayliData   = weatherData['daily_forecast'],
        airData     = xmlData['air/now'],
        nowAir      = airData['air_now_city'],
        todayDetail = [`降雨量&nbsp${nowWeather['pcpn']}`,
                       `湿度&nbsp${nowWeather['hum']}`,
                       `${nowWeather['wind_dir']}&nbsp${nowWeather['wind_sc']}级`,
                       `体感温度&nbsp${nowWeather['fl']}`,
                       `能见度&nbsp${nowWeather['vis']}`],
        tmrDetail   = [`夜间天气&nbsp${dayliData[1]['cond_txt_n']}`,
                       `${dayliData[1]['wind_dir']}&nbsp${dayliData[1]['wind_sc']}级`,
                       `降水概率&nbsp${dayliData[1]['pop']}`,
                       `湿度&nbsp${dayliData[1]['hum']}`],
        dadDetail   = [`夜间天气&nbsp${dayliData[2]['cond_txt_n']}`,
                       `${dayliData[2]['wind_dir']}&nbsp${dayliData[2]['wind_sc']}级`,
                       `降水概率&nbsp${dayliData[2]['pop']}`,
                       `湿度&nbsp${dayliData[2]['hum']}`],
        airDetail   = [`PM2.5&nbsp${nowAir['pm25']}`,
                       `PM10&nbsp${nowAir['pm10']}`,
                       `SO2&nbsp${nowAir['so2']}`,
                       `NO2&nbsp${nowAir['no2']}`,
                       `CO&nbsp${nowAir['co']}`,
                       `O3&nbsp${nowAir['o3']}`],
        lifeDetail  = [`舒适度&nbsp${lifeData[0]['brf']}`,
                       `穿衣&nbsp${lifeData[1]['brf']}`,
                       `紫外线&nbsp${lifeData[5]['brf']}`,
                       `感冒&nbsp${lifeData[2]['brf']}`,
                       `运动&nbsp${lifeData[3]['brf']}`,
                       `交通&nbsp${lifeData[4]['brf']}`];
    htmlStr =   setHtmlString (
        weatherData['update']['loc'].slice(11),
        `${getWeatherIcon()}`,
        `${nowWeather['cond_txt']}&nbsp${nowWeather['tmp']}℃`,
        todayDetail, 2);
    htmlStr +=  setHtmlString  (
        "",`${getAirIcon(airData)}`,
        `空气指数:&nbsp${nowAir['aqi']}&nbsp${nowAir['qlty']}`,
        airDetail, 3);                         
    htmlStr +=  setHtmlString  ("",'icon-aixin',`生活指数`,lifeDetail, 2);
    htmlStr +=  setHtmlString  (
        "",'icon-hangche',
        `今日限行尾号:&nbsp${getLimitNum(new Date().getDay())}`,
        [`明日现行尾号:&nbsp${getLimitNum(new Date().getDay() + 1)}`], 1);
    htmlStr += setHtmlString (
        '明天',`${getWeatherIcon(1)}`,
        `${dayliData[1]['cond_txt_d']}&nbsp${dayliData[1]['tmp_min'] + '-' + dayliData[1]['tmp_max'] + '℃'}`,
        tmrDetail, 2);
    htmlStr += setHtmlString (
        '后天',`${getWeatherIcon(2)}`,
        `${dayliData[2]['cond_txt_d']}&nbsp${dayliData[2]['tmp_min'] + '-' + dayliData[2]['tmp_max'] + '℃'}`,
        dadDetail, 2);
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

/**
 * @description 重加载头部样式
 * @param {Number} page 标签页页码 
 */
function reloadHeader(page){
    
    headerStyle[0]['city'] = `${xmlData['location/ip'][2]}市`;
    headerStyle[0]['province'] = `${xmlData['location/ip'][1]}省`;

    $('#header').css('background', `${headerStyle[page].backg}`);
    $('#header #title i').css('opacity', `${headerStyle[page].titleI}`); 
    $('#header .city').text(`${headerStyle[page].city}`);
    $('#header .province').text(`${headerStyle[page].province}`);
    $('#header .topleft_btn i').attr('class', `iconfont icon-${headerStyle[page].topleft_btn}`);
}

/**
 * @description 收藏页样式内容设计
 */
function loadCollectDetailView(){
    $('#weakday_wrap').append('<div class="col_weather_info"></div>');
    var curUser = getCurUser(),
        curLoc = [],
        loc_wtr_info = [];
    if (curUser) {
        var userCus = getUserCus();
        userCus.forEach(function(val, idx, arr) {
            if (val.user_name === curUser.user_name) {
                curLoc = val.colLocate;
            }
        })
        var i = 0,
            len = curLoc.length,
            isRequest = false,
            tmpInfo = {};
        var t = setInterval(function(){
            if (i < len){
                if(!isRequest){
                    tmpInfo = {
                        'location/ip' : null,
                        'weather'     : null,
                        'air/now'     : null 
                    };
                    getWeatherData('air/now', curLoc[i][2], tmpInfo);
                    getWeatherData('weather', curLoc[i][2], tmpInfo);
                    isRequest = true;
                }
                if(tmpInfo['weather'] && tmpInfo['air/now']){
                    tmpInfo['location/ip'] = curLoc[i];
                    loadLocateAirView('.locate_air_wrap', tmpInfo, i);
                    loadWeakWeatherView('.col_weather_info', '.day_weather_wrap', tmpInfo);
                    isRequest = false;
                    tmpInfo = null;
                    i++;
                }
            }else {
                clearInterval(t);
                t = null;
            }
        },200);
    }else{
        thr3eTipTag('#content', '登录以后能看到更多地区的天气哦~');
    }
}

/**
 * @description 加载错误信息
 */
function loadErrorTag() {
    $('#error_page').queue(function(){
        $('#error_page').css('display', 'block').dequeue();
    })
    .animate({top : 0}, 2000)
    .delay(2000)
    .animate({top : '-240px'}, 2000)
    .queue(function(){
        $('#error_page').css('display', 'none');
    })
}