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
 * @param {string} url api接口
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
 * @param {string} url api接口
 * @param {string} location 查询天气的地址
 * @param {object} obj 待传入数据对象
 */
function getWeatherData (url, location, obj){
    $.ajax({
        url: `https://free-api.heweather.com/s6/${url}?parameters`,
        type: 'GET',
        data: {
            'key':'d435517aad8148dfa6d1fd29a52a47e7',
            'location' : location
        },
        dataType:'json',
        success:function(response){ 
            obj[url] = response['HeWeather6']['0']; 
        }
    })
}

/**
 * @description 获取新闻页相关信息
 * @param {string} url 请求地址
 * @param {function} success 请求成功的回调函数
 */
function getNewsData (url, success){
    $.ajax({
        url: url,
        type : 'GET',
        dataType : 'json',
        data : {
            showapi_sign : 'a61b674541a04194ad0cd2d88122fc2f',
            showapi_appid : '67286'
        },
        success : success
    })
}

/**
 * @description 加载历史上的今天模块
 */
function getHistoryData() {
    getNewsData('http://route.showapi.com/119-42', function(response) {
        $('#his_today_wrap').css('display','block');
        var hisData = response['showapi_res_body']['list'],
            htmlStr = '';
        $.each(hisData, function(idx, val) {
            if(idx < 10) {
                var imgStyle = val.img ? `background: url(${val.img}) center center;background-size: cover` : `background: url(../imgs/loading.gif) center center no-repeat`;
            htmlStr += `
            <div class="content">
                <div class="img_wrap" style="${imgStyle}"></div>
                <div class="msg_wrap">
                    <p class="title">${val.title}</p>
                    <span class="date">${val.year}/${val.month}/${val.day}</span>
                </div>
            </div>`
            } 
        });
        $('#his_today_wrap .content_wrap').html(htmlStr);
    })
}

/**
 * @description 加载星座运势模块
 */
function getStarData() {
    getNewsData('http://route.showapi.com/872-1?star=shizi', function(response){
        $('#star_wrap').css('display','block');
        var starData = response['showapi_res_body']['day'],
            detailData = [
            {
                'class' : 'love',
                'txt'   : starData.love_txt,
                'star'  : starData.love_star,
                'title' : '爱情'
            },
            {
                'class' : 'work',
                'txt'   : starData.work_txt,
                'star'  : starData.work_star,
                'title' : '工作'
            },
            {
                'class' : 'money',
                'txt'   : starData.money_txt,
                'star'  : starData.money_star,
                'title' : '金钱'
            },
        ];
        var htmlStr = `
        <div class="const">狮子座</div>
        <div class="general">${starData.general_txt}</div>
        <div class="detail_content">`;
        $.each(detailData, function(idx, val){
            var style = idx === 0 ? '' : 'style="border-left: 4px double #59606d;"'
            htmlStr += `
            <div class=${val.class} ${style}>${val.title}指数:${val.star}颗星
                ${val.title}运势:${val.txt}</div>`
        })
        htmlStr += '</div>'
        $('#star_wrap .content_wrap').html(htmlStr);
    })
}

/**
 * @description 加载每日一笑模块
 */
function getLaughData() {
    getNewsData('http://route.showapi.com/341-1', function(response){
        $('#laugh_wrap').css('display','block');
        var laughData = response['showapi_res_body']['contentlist'];
        var htmlStr = '';
        $.each(laughData, function(idx, val){
            if(idx < 10){
                htmlStr += `
                <div class="content_title">${val.title}</div>
                <div class="content_date">${val.ct.slice(0, val.ct.length - 5)}</div>
                <div class="content_txt">${val.text}</div>
                `
            }
        });
        $('#laugh_wrap .content_wrap').html(htmlStr);
    });
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
 * @description 获取中文星期数
 * @param {Number} day 数字星期数
 * @returns {String} 中文星期数
 */
function getCNWeakday (day) {
    return "周" + "日一二三四五六".charAt(day % 7);
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
        el.siblings('.tips').css('opacity', '0').attr('data-correct', '1');
        el.siblings('.wrong_tag').css('right', '10px');
    } else {
        el.siblings('.tips').css('opacity', '1').attr('data-correct', '0');
        el.siblings('.wrong_tag').css('right', '-25px');
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
 * @param {Number} condCode 查询日期距今天的间隔,忽略为实时天气代码
 * @returns string 天气图标类名
 */
function getWeatherIcon (idx){
    var iconName = 'icon-unknown',
        condCode = 0;
    if (!idx) {
        condCode = xmlData['weather']['now']['cond_code'];
    }
    else {
        condCode = isNowNight() ? xmlData['weather']['daily_forecast'][idx]['cond_code_n'] : xmlData['weather']['daily_forecast'][idx]['cond_code_d'];
    }
    WeatherIconRullArr.forEach(function(val, idx, arr){
        if (condCode.match(val['regx'])) iconName = val.icon;
    });
    return iconName;
}

/**
 * @description 获取空气质量图标
 * @param {object} obj 空气信息对象
 * @returns string 空气图标类名
 */
function getAirIcon (obj) {
    var rate = parseInt(obj['air_now_city'].aqi / 50);
    var iconArr = ['icon-laugh','icon-weixiao','icon-kaixin','icon-face','icon-unhappy','icon-angry'];
    return iconArr[rate];
}

/**
 * @description 获取当前登录用户信息
 */
function getCurUser() {
    return JSON.parse(sessionStorage.getItem('curUser'));
}

/**
 * @description 获取本地用户组信息
 */
function getUserInfo() {
    return JSON.parse(localStorage.getItem('user_info'));
}

/**
 * @description 获取用户定制信息
 */
function getUserCus() {
    return JSON.parse(localStorage.getItem('user_custom'));
}