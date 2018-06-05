
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
 * @description 正则表达式匹配
 * @param String 被匹配的输入框选择器
 * @param String 正则表达式规则
 * @return 匹配结果，如未匹配成功返回null
 */

 function verifyUserInfo(sel, regx){
     debugger;
     var el = document.querySelector(sel);
     if (el.value && el.value.match(regx)){
         console.log(sel + "right");
     } else if (el.value) {
         el.nextElementSibling.style.opacity = '1';
        el.nextElementSibling.nextElementSibling.style.display = 'block';
     }
 }