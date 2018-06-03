(function () {

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
        $('.page_css').attr('href', links[curIndex].replace('html', 'css').replace('pages', 'css'));
        $.ajax({
            url: links[curIndex],
            type: 'GET',
            success: function (response) {
                $('#content').html(response);
            }
        })
    }).first().trigger('click');

})();