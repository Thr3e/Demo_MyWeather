// --------------today---------------
var WeatherData = {},
    AirData     = {};
function todayFuncs(){
    getLocationData ('location/ip', function (response) {
        var locInfo = response['address'].split('|'); 
        $('#title').find('.city').text(locInfo[2] + '市');   
        $('#title').find('.province').text(locInfo[1] + '省');
        getWeatherData ('weather', locInfo[2], function (response) {
            WeatherData = response['HeWeather6']['0'];
            console.log(WeatherData);
            var todayInfo = WeatherData['daily_forecast'][0];
            loadMainview (WeatherData);
            $('.today-weather').text(todayInfo['tmp_min'] + '-' + todayInfo['tmp_max'] + '℃');
        });
        getWeatherData ('air/now', locInfo[2], function (response) {
            AirData = response['HeWeather6']['0'];
            setTimeout(loadDetailview, 1000);
            console.log(AirData);
            var aqi = parseInt(AirData['air_now_city']['aqi']);
            $('.quality_info').text(aqi + ' 空气质量' + AirData['air_now_city']['qlty']);
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


// ------------collection------------
function collectionFuncs() {  
    
}


//---------------news---------------
function newsFuncs() {

}

//---------------more---------------
function moreFuncs() {

}