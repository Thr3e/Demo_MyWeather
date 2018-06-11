
/**
 * @description 获取DOM对象 
 * @param sel String DOM选择器
 * @param isAll boolean 是否选择所有元素（忽略为不选择）
 * @return DOM对象
 */
function getEL(sel, isAll) {
    if (isAll) return document.querySelectorAll(sel);
    else return document.querySelector(sel);
}

/**
 * @description 对象属性继承 
 * @param child Object 子对象
 * @param parent Objective 父对象
 * 
 */
function extend(child, parent) {
    var f = function () {};
    f.prototype = parent.prototyoe;
    child.prototype = new f();
    child.prototype.constructor = child;
    child.uber = parent.prototype;
}

/**
 * 
 * @description  回到顶部 
 * @param duration Number 持续时间（默认.3s）
 * @param interval Number 帧时间（默认15ms）
 * @param isShow Boolean 是否隐藏按钮 如要设置按钮隐藏，请在css中设置scroll_btn_hide类的样式
 * @param showHeight String 按钮显示高度(默认显示器的40%)
 * @return  DOM对象
 */
function scrollBackTop(duration, interval, isShow, showHeight) {
    var el,
        offset = 0;
    //获取偏移量
    window.onscroll = function () {
        offset = document.body.scrollTop || document.documentElement.scrollTop;
        //是否隐藏按钮
        if (isShow){
            var thisHeight = showHeight || window.screen.availHeight * 0.4
            if (offset > thisHeight) {
                el.classList.remove('scroll_btn_hide');
            }else {
                el.classList.add('scroll_btn_hide');
            }
        }
    }
    el.onclick = function () {
        //设置参数默认值
        var thisInterval = interval || 15,
            thisDuration = duration || 300;
        var frames = thisDuration / thisInterval, // 总时间/帧时间=帧数
            speed  = Math.ceil(offset / frames); //每一帧位移的距离
        var t = setInterval(function () {
            if (offset > 0){
                document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
            } else {
                clearInterval(t);
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        }, thisInterval);
    }
    return el;

}

/**
 * 
 * @description  获取随机验证码
 * @param length Number 验证码长度
 * @return       String 随机字符
 */
function getVerificationCode(length) {
    // 定义随机源
    var str = "";
    str += "QWERTYUIOPASDFGHJKLZXCVBNM";
    str += "1234567890";
    str += "qwertyuiopasdfghjklzxcvbnm";
    // 根据长度截取字符
    var resStr = "";
    for(var i = 0; i < length; i++) {
        // 获取随机下标
        var index = Math.floor(Math.random() * str.length);
        resStr += str.slice(index, index + 1);
    }
    return resStr;
}


/**
 * 
 * @description  生成底部提示框
 * @param {'string'} sel 调用提示框的元素选择器
 * @param {'string'} msg 提示信息字符串
 */
function thr3eTipTag (sel, msg){
    var isAnimate = false;
        parentEl = document.querySelector(sel);
    if (parentEl){
        //控制tag标签同时只出现一个
        parentEl.childNodes.forEach(function(val, idx, arr){
            isAnimate =  (val.id === 'thr3e_tip_tag') || isAnimate;
        });
        if (isAnimate) return;
        //获取父元素原本内容
        parentHtml = parentEl.innerHTML;
        //拼接增加tag标签
        var newTag = document.createElement('div');
        newTag.id = "thr3e_tip_tag";
        newTag.style.bottom = "-30px";
        newTag.textContent = msg;
        parentEl.appendChild(newTag);
        //帧动画
        var tiptag   = document.querySelector('#thr3e_tip_tag'), 
            offset   = (parseInt(parentEl.offsetHeight) - parseInt(tiptag.style.bottom)) * 0.1,//总距离
            interval = 15,//帧时间
            duration = 1000,//总时间
            frames   = duration / interval,//帧数
            speed    = Math.ceil(offset / frames),//帧速度
            curTop   = parseInt(tiptag.style.bottom),//起始额位置
            tarTop   = curTop + offset;//目标位置
        //展示tag
        var showT = setInterval(function(){
            curTop   = parseInt(tiptag.style.bottom);
            if (curTop < tarTop) {
                tiptag.style.bottom = curTop + speed + 'px';
            } else {
                clearInterval(showT);
                t= null;
                tiptag.style.bottom = tarTop + 'px';
            }
        },interval);
        //隐藏tag
        setTimeout(function() {
            var hideT = setInterval(function(){
                curTop   = parseInt(tiptag.style.bottom);
                tarTop = -30;
                if (curTop > tarTop) {
                    tiptag.style.bottom = curTop - speed + 'px';
                } else {
                    clearInterval(hideT);
                    t= null;
                    tiptag.style.bottom = tarTop + 'px';
                    parentEl.removeChild(tiptag);
                }
            },interval);
        }, 2400);
    }
}