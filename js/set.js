//----------SET-----------
/**
 * @description 获取地址、天气、空气质量信息并赋值给xmlData
 * @param {string} location 需要查询的地址，忽略则取用当前IP所在地址
 */
function setXmlData (location){
    $.each(xmlData,function(key, val){ if(key !== 'locData')xmlData[key] = null; });
    xmlData['location/ip'] = location;
    var t = setInterval(function(){
        if (xmlData['location/ip']) {
            getWeatherData('air/now', xmlData['location/ip'][2], xmlData);
            getWeatherData('weather', xmlData['location/ip'][2], xmlData);
            clearInterval(t);
            t = null;
        } else {
            getLocationData('location/ip');
        }
    },300);
}

/**
 * 
 * @description 拼接detailview板块的各个子版块信息
 * @param {string} title  子版块主标题
 * @param {string} attr   子版块副标题的icon图表类名
 * @param {string} content 子版块副标题
 * @param {Array} detail 子版块主要内容
 * @param {Number} line 子版块列数
 */
function setHtmlString(title, attr, content, detail, line) {
    var detailHtml = '<table>';
    for (var i = 0, len = detail.length; i < Math.ceil(len / line); i++) {
        detailHtml += '<tr>';
        for (var j = 0; j < line; j++){
            detailHtml += `<td>${detail[j + i * line] || ''}</td>`;
        }
        detailHtml += '</tr>';
    }
    detailHtml += '</table>'

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
                ${detailHtml}
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
    var t = setTimeout(function() {
        thr3eTipTag('#login_page', '没有账号？点击右上角注册');
    }, 6000);
    $('.user_ipt').focus(function(){
        if (t){
            clearTimeout(t);
            t = null;
        }
    })
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
            var curBtn = $(this);
            todayFuncs(curBtn.attr('data-locInfo').split(','));
            $('.search_back_icon').click();
            var curUser = getCurUser();
            if(curUser){
                var localCus = JSON.parse(localStorage.getItem('user_custom')) ? JSON.parse(localStorage.getItem('user_custom')) : [],
                    isRepet = false;
                localCus.forEach(function(val, idx, arr) {
                    if (val.user_name === curUser.user_name) {
                        var tmpArr = curBtn.attr('data-locInfo').split(',');
                        val['colLocate'].forEach(function(val, idx, arr){
                            //数组无法直接通过===进行对比！！！！！坑
                            if (JSON.stringify(val) === JSON.stringify(tmpArr)) isRepet = true;
                        });
                        if (!isRepet) val['colLocate'].push(tmpArr);
                    }
                })
                setUserCustom(localCus);
            }
        })
    }, 200);
}

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
        var localCus = localStorage.getItem('user_custom') ? JSON.parse(localStorage.getItem('user_custom')) : [],
            curUserCustom = {
            user_name : verifyObj.userName,
            contents  : ['getHistoryData', 'getStarData', 'getLaughData'],
            colLocate : []
        }
        localCus.push(curUserCustom);
        setUserCustom(localCus);
        thr3eTipTag('#login_page', `${verifyObj.userName},注册成功`);
        setTimeout(function() { $('.tl_btn').children().click() }, 3500);
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
    }else if(!verifyObj.isFinish){
        thr3eTipTag('#login_page', '请输入账号密码');
    }else if(!verifyObj.isCorrect) {
        thr3eTipTag('#login_page', '请输入正确的账号密码');
        $.each($('.user_ipt'), function(idx, el){ $(this).val(''); })
    }
}

/**
 * @description 修改密码功能逻辑
 */
function setRewritePwdFunc(){
    $('#setting_wrap .unlog').click(function(){
        $('.topright_btn > i').click();
        $('.set_title')[0].click();
    })
    var curUser = getCurUser();
    if (curUser){
        $('#setting_wrap .unlog').addClass('hide');
        $('#setting_wrap .change_pwd').removeClass('hide');
        $('#setting_wrap .user_name').text(curUser.user_name);
        $('#setting_wrap .set_pwd i').click(function(){
            //修改密码主要逻辑
            if($(this).hasClass('icon-queren')){
                var userInfo = getUserInfo(),
                    curIdx = 0;
                $.each(userInfo, function(idx, val){
                    if ((val.user_name === curUser.user_name) && ($('#setting_wrap .last_pws').val() === val.user_pwd)){
                        curIdx = idx;
                        return false;
                    }
                });
                if ($('#setting_wrap .new_pws').val() === $('#setting_wrap .conf_pws').val()){
                    userInfo[curIdx].user_pwd = $('#setting_wrap .new_pws').val();
                    setUserInfo(userInfo);
                    thr3eTipTag('#content', '修改成功');
                    $('.set_pwd input').val('');
                }else{
                    thr3eTipTag('#content', '两次密码不一致');
                }

            }
        })
    }else{
        $('#setting_wrap .change_pwd').addClass('hide');
        $('#setting_wrap .unlog').removeClass('hide');
    }
}

/**
 * @description 自定义新闻页内容
 */
function getCustomNewsPage() { 
    $('.check_icon').click(function() {
        if ($(this).attr('data-checked') === 'f') $(this).attr('data-checked', 't').css('background', '#fff');
        else $(this).attr('data-checked', 'f').css('background', '#59606d');
    })
    $('#setting_wrap .set_newspage .icon-queren').click(function(){
       var tmpArr = [];
       $.each($('[data-checked="t"]'), function(idx, val){
           tmpArr.push($(val).attr('data-msg'));
       });
       var curUser = getCurUser();
       if (curUser) {
           var userCus = JSON.parse(localStorage.getItem('user_custom'));
           userCus.forEach(function(val, idx, arr){
                if (val.user_name === curUser.user_name) val.contents = tmpArr;
           })
           setUserCustom(userCus);
           thr3eTipTag('#setting_wrap', '已保存');
       } else{
           sessionStorage.setItem('news_page', JSON.stringify(tmpArr));
           thr3eTipTag('#setting_wrap', '登录可以保存你的设置哦~');
       }

    });
}

/**
 * @description 存入当前登录用户信息
 */
function setCurUser(obj) {
    sessionStorage.setItem('curUser', JSON.stringify(obj));
}

/**
 * @description 存入用户组信息
 */
function setUserInfo(obj) {
    localStorage.setItem('user_info', JSON.stringify(obj));
}

/**
 * @description 存入当前登录用户信息
 */
function setUserCustom(obj) {
    localStorage.setItem('user_custom', JSON.stringify(obj));
}