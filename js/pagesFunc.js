// --------------today---------------
function todayFuncs(){
    setXmlData();
    var t = setInterval (function(){
        var isNotNull = true;
        jQuery.each(xmlData,function(key, val){ 
            isNotNull = isNotNull && val;
        });
        if (isNotNull) {
            loadTodayView();
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