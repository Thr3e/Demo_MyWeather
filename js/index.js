$(function () {
    var curIndex;
    $('.page-ctrl-btn').on('click', function (e) {
        var index = $(this).index() / 2;
        //判断点击页是否和当前页相同，避免重复点击
        if (index === curIndex) return;
        curIndex = index;
        $.ajax({
            url: page_links[curIndex].link,
            type: 'GET',
            success: function (response) {
                $('#content').html(response);
                //通过字符串调用函数
                eval(page_links[curIndex].func + '()');
            }
        })
    // });
    }).first().trigger('click');
    $('.topright_btn').children().click(loadLoginPage);
    $('.topleft_btn').children().click(loadSearchPage);
});