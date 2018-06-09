// --------------today---------------
function todayFuncs(location){
    //获取地理位置、天气、空气质量的基本信息
    setXmlData(location);
    var t = setInterval (function(){
        var isNotNull = true;
        $.each(xmlData,function(key, val){ 
            isNotNull = isNotNull && val;
        });
        if (isNotNull) {
            if (xmlData['weather']['status'] + xmlData['air/now']['status'] !== 'okok') {
                $('#error_page').queue(function(){
                                    $('#error_page').css('display', 'block');
                                    $('#error_page').dequeue();
                                })
                                .animate({top : 0}, 2000)
                                .delay(2000)
                                .animate({top : '-33%'}, 2000)
                                .queue(function(){
                                    $('#error_page').css('display', 'none');
                                })
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
    
}


//---------------news---------------
function newsFuncs() {

}

//---------------more---------------
function moreFuncs() {

}