$(function () {
    if (THRBrowserRedirect() === 'pc'){
        //判断用户设备机型，如果不是移动端则弹出警告
        $('body').append('<div id="wrong_tag">抱歉！本页面暂时只支持手机端查看</div>');
        return;
    }else{
        var curIndex;
        $('.page-ctrl-btn').on('click', function (e) {
            var index = $(this).index() / 2;
            //判断点击页是否和当前页相同，避免重复点击
            if (index === curIndex) return;
            curIndex = index;
            getLocalPage(page_links[curIndex].link, function (response) {
                    $('#content').html(response);
                    //通过字符串调用函数
                    eval(page_links[curIndex].func + '()');
                });
        // });
        }).first().trigger('click');
        $('.topright_btn').children().click(loadLoginPage);
        $('.topleft_btn').children().click(loadSearchPage);
    }
});