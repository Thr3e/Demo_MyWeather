$(function () {

    $.ajax({
        url: 'https://free-api.heweather.com/s6/weather/forecast?parameters',
        type: 'GET',
        data: {
            'key':'d435517aad8148dfa6d1fd29a52a47e7',
            'location' : '成都'
        },
        dataType:'json',
        success:function (response) {
            loadFootSpan (response['HeWeather6']['0']['daily_forecast'][0]);
        }
    })

});

function loadFootSpan (dataArr) {
    var footSpan = getEL ('.today-weather');
    footSpan.textContent = dataArr['tmp_min'] + '-' + dataArr['tmp_max'] + '℃';
}