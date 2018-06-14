//----------Common----------
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
        userInfo   = getUserInfo(),
        thisUser   = {};
    $.each($(sel), function(idx, val){ 
        //判断每个输入框是否填有内容
        if (!$(this).val()){
            isFinish = false;
        } else {
        var key = $(this).attr('class').slice(0, $(this).attr('class').indexOf(' '));
        if ( key !== 'conf_pwd' && key !== 'verf_code') thisUser[key] = $(this).val();
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
    if (isFinish && (isNotRepet || isCorrect)){
        if (thisUser.user_email){
            userInfo.push(thisUser);
            setUserInfo(userInfo);
        }
        var curUser = { 
            user_name : thisUser.user_name,
            status    : 1
        };
        setCurUser(curUser);
    }
    return {
        'isFinish' : isFinish,
        'isNotRepet' : isNotRepet,
        'isCorrect' : isCorrect,
        'userName' : thisUser.user_name
        };
}