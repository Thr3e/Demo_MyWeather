$(function () {
    var links = [
        './pages/today.html',
        './pages/collection.html',
        './pages/news.html',
        './pages/more.html'
    ];
    var curIndex;
    $('.page-ctrl-btn').on('click', function (e) {
        var index = $(this).index() / 2;
        if (index === curIndex) return;
        curIndex = index;
        $.ajax({
            url: links[curIndex],
            type: 'GET',
            success: function (response) {
                $('#content').html(response);
            }
        })
        switch (curIndex) {
            case 0 : todayFuncs();break;
            case 1 : collectionFuncs();break;
            case 2 : newsFuncs();break;
            case 3 : moreFuncs();break;
        }
    }).first().trigger('click');
});