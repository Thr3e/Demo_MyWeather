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
            getWeatherData('air/now', xmlData['location/ip'][2], xmlData);
            getWeatherData('weather', xmlData['location/ip'][2], xmlData);
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
    $.each(reg_rule, function(idx, val) {
        $(val.sel).on('blur', function(){
            getUserInfoVerify($(this), val.regx);
        })
    ;})
}

/**
 * @description 设置注册页相关功能
 */
function setRegPage (){
    $('.login_wrap').css('height', '450px');
    $('.logo').css({'width':'50px', 'height':'50px', 'margin':'0 auto'});
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

//TODO:
/**
 * @description 清除注册页面错误提示信息
 */
function setTipsClear (){
    $('.tips').css('opacity', '0');
    $('.wrong_tag').css('right', '10px');
}

/**
 * @description 注册按钮功能逻辑
 */
function setRegFunc (){
    var verifyObj = checkUserInfo('.user_ipt');
    //更新验证码
    $('.verif_text').text(getVerificationCode(4));
    //判断注册信息
    if(verifyObj.isFinish && verifyObj.isNotRepet) {
        thr3eTipTag('#login_page', `${verifyObj.userName},注册成功`);
        setTimeout(function() { $('.tl_btn').children().click() }, 3500);
        sessionStorage.setItem('login_user_name', verifyObj.userName);
    }else if(!verifyObj.isFinish){
        thr3eTipTag('#login_page', '请输入完整的注册信息');
    }else if(!verifyObj.isNotRepet) {
        thr3eTipTag('#login_page', '该账号已被注册，请重新输入');
        $.each($('.user_ipt'), function(idx, el){ $(this).val(''); })
    }
    
}

/**
 * @description 登录按钮功能逻辑
 */
function setLogFunc (){
    var verifyObj = checkUserInfo('.user_name, .user_pwd');
    if(verifyObj.isFinish && verifyObj.isCorrect) {
        thr3eTipTag('#login_page', `${verifyObj.userName},欢迎回来`);
        setTimeout(function() { $('.tl_btn').children().click() }, 3500);
        sessionStorage.setItem('login_user_name', verifyObj.userName);
    }else if(!verifyObj.isFinish){
        thr3eTipTag('#login_page', '请输入账号密码');
    }else if(!verifyObj.isCorrect) {
        thr3eTipTag('#login_page', '请输入正确的账号密码');
        $.each($('.user_ipt'), function(idx, el){ $(this).val(''); })
    }
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

//----------Others----------
/**
 * @description 判断当前是否是晚上（20点至次日6点）
 * @returns Boolean true:是晚上
 */
function isNowNight () {
    var d = new Date().toLocaleTimeString();
    return (d.match(/下午/) && parseInt(d.slice(2)) > 7) || (d.match(/上午/) && (parseInt(d.slice(2)) < 7) || parseInt(d.slice(2)) === 12);
}

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


/**
 * @description 为元素设置页面内横向滑动动画
 * @param {string} sel 元素选择器
 */
function xScrollAnimate (sel) {
    //初始化变量
    var deltaX=0,//每次移动的变化量
        prevX,//上一次移动完手指坐标信息
        maxX = 0,//右划边界
        minX = parseInt($('body').css('width')) - parseInt($(sel).css('width'));//左滑边界

    $(sel).on("touchstart",function(e){
        var touch = e.originalEvent.touches[0];
        //初始化坐标信息
        prevX = touch.pageX;
    });
    $(sel).on('touchmove',function(e){
        e.preventDefault();
        var touch = e.originalEvent.touches[0];
        //计算偏移量
        deltaX = touch.pageX - prevX + parseInt($(this).css('left'));
        //记录本次坐标信息
        prevX = touch.pageX;
        //位移
        $(this).css('left', `${deltaX}px`);
    })
    $(sel).on('touchend',function(e){
        e.preventDefault();
        //判断位移是否超出边界
        if (parseInt($(this).css('left')) > maxX) $(this).css('left', `${maxX}px`);
        if (parseInt($(this).css('left')) < minX) $(this).css('left', `${minX}px`);
    })
}
/**
 * @description 登录注册页面输入判断
 * @param {String} sel 输入框元素选择器 
 */
function checkUserInfo(sel) {
    $(sel).blur();
    var isFinish   = true,
        isNotRepet = true,
        isCorrect  = false,
        userInfo   = JSON.parse(localStorage.getItem('user_info')),
        thisUser   = {};
    $.each($(sel), function(idx, val){ 
        //判断每个输入框是否填有内容
        if (!$(this).val()){
            isFinish = false;
        } else {
        var key = $(this).attr('class').slice(0, $(this).attr('class').indexOf(' '));
        thisUser[key] = $(this).val();
        }
    });
    if (!userInfo) userInfo = [];
    $.each(userInfo, function(idx, val) {
        if (val.user_name === thisUser.user_name){
            isNotRepet = false;
            if (val.user_pwd === thisUser.user_pwd){
                isCorrect = true;
            }
        }
    });
    //注册成功
    if (isFinish && isNotRepet && thisUser.user_email){
        userInfo.push(thisUser);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
    }

    return {
        'isFinish' : isFinish,
        'isNotRepet' : isNotRepet,
        'isCorrect' : isCorrect,
        'userName' : thisUser.user_name
        };
}