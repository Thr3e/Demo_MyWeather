// 
function todayFuncs(){
    getLocationData ('location/ip', function (response) {
        var locInfo = response['address'].split('|'); 
        $('#title').find('.city').text(locInfo[2] + '市');   
        $('#title').find('.province').text(locInfo[1] + '省');
        getWeatherData ('weather', locInfo[2], function (response) {
            console.log(response);
            var dataInfo = response['HeWeather6']['0'],
                todayInfo = dataInfo['daily_forecast'][0];
            loadMainview (dataInfo);
            loadDetailview (dataInfo);
            $('.today-weather').text(todayInfo['tmp_min'] + '-' + todayInfo['tmp_max'] + '℃');
        });
        getWeatherData ('air/now', locInfo[2], function (response) {
            console.log(response['HeWeather6']['0']);
            var aqi = parseInt(response['HeWeather6']['0']['air_now_city']['aqi']);
            $('.quality_info').text(aqi + ' 空气质量' + response['HeWeather6']['0']['air_now_city']['qlty']);
            switch (parseInt(aqi / 50)) {
                case 0 : $('.quality_info').css({'background': '#ffcc00'});break;
                case 1 : $('.quality_info').css({'background': '#ff8800'});break;
                case 2 : $('.quality_info').css({'background': '#ff4400'});break;
                case 3 : $('.quality_info').css({'background': '#ff0000'});break;
                case 4 : $('.quality_info').css({'background': '#bb0000'});break;
                case 5 : $('.quality_info').css({'background': '#770000'});break;
            }
        }) 
    })
}
function getLocationData (url, success){
    $.ajax({
        url: 'http://api.map.baidu.com/' + url,
        type: 'GET',
        data: {
            'ak' : '7ZlcHGoo1hUOedvlmVfKk6TNAG7vyBtG',
            'coor' : 'gcj02'
        },
        dataType:'jsonp',
        success:success
    })
}

function getWeatherData (url, location, success){
    $.ajax({
        url: 'https://free-api.heweather.com/s6/' + url + '?parameters',
        type: 'GET',
        data: {
            'key':'d435517aad8148dfa6d1fd29a52a47e7',
            'location' : location
        },
        dataType:'json',
        success:success
    })
}

function loadMainview (dataInfo) {
    var d = new Date(),
        time = d.toLocaleTimeString(),
        todaInfo = dataInfo['daily_forecast'][0],
        nowInfo = dataInfo['now'];
    var curIndex = 0;
    if (time.slice(0, 1) === '下'){
        time = parseInt(time.slice(2, time.length - 3)) + 12 + time.slice(time.length - 3);
    }
    var curHtml = [{
        'time' : "今天·周" + "日一二三四五六".charAt(d.getDay()),
        'weather' : todaInfo['tmp_min'] + '-' + todaInfo['tmp_max'] + '℃'
    },{
        'time' : "现在·" + time,
        'weather' : nowInfo['tmp'] + '℃'
    }];
    
    $('.time_info').text(curHtml[curIndex]['time']);
    $('.degree_info').text(curHtml[curIndex]['weather']);
    var t = setInterval(function(){
        if (curIndex === 0) curIndex = 1;
        else curIndex = 0;
        $('.time_info').text(curHtml[curIndex]['time']);
        $('.degree_info').text(curHtml[curIndex]['weather']);
    },4000);

    $('.weather_info').text(nowInfo['cond_text']);
}

function loadDetailview (dataInfo) {
    var htmlStr = '';
    var updateTime = dataInfo['update']['loc'].slice(11),
        curWeather = dataInfo['now']['tmp'],
        curText    = dataInfo['now']['cond_text'];
    
    htmlStr += '<div class="detailContent"><div class="titles">' + updateTime + '</div><div class="contents">' + curText + curWeather + '℃' + '</div></div>';

    $('.today_detailview').html(htmlStr);


}


// 
function collectionFuncs() {  
    $('.topleft_btn').children().attr({ class : 'iconfont icon-zhuce' }).click(function(e) {
        $('.log_btn').html('注     册').click(verifyInput);
        $('.logo').css({'transition':'all .25s linear', 'width':'50px', 'height':'50px', 'margin':'0 auto'});
        $('.login_wrap').css('height', '320px');
        $('.verif_text').text(getVerificationCode(4)).click(function(){
            $(this).text(getVerificationCode(4));
        });
    });
}

function verifyInput (){
    $('.user_ipt').blur();
    verifyUserInfo('.user_name', /^\w{6,20}$/);
    verifyUserInfo('.user_pwd', /^.{6,20}$/);
    verifyUserInfo('.conf_pwd', $('.user_pwd').val());
    verifyUserInfo('.user_email', /^.?@\w+\.\w+$/);
    verifyUserInfo('.user_tel', /^1\d{10}$/);
}
//
function newsFuncs() {

}

//
function moreFuncs() {

}