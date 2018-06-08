var WeatherIconRullArr = [
    {
        'regx' : /100/,
        'icon' : 'icon-qing'
    },
    {
        'regx' : /10[1-3]/,
        'icon' : 'icon-duoyun'
    },
    {
        'regx' : /104/,
        'icon' : 'icon-yin'
    },
    {
        'regx' : /20[0-4]/,
        'icon' : 'icon-feng'
    },
    {
        'regx' : /20[5-7]/,
        'icon' : 'icon-dafeng'
    },
    {
        'regx' : /2(08|09|1[0-3])/,
        'icon' : 'icon-longjuanfeng'
    },
    {
        'regx' : /300/,
        'icon' : 'icon-zhenyu'
    },
    {
        'regx' : /31[0-3]/,
        'icon' : 'icon-baoyu'
    },
    {
        'regx' : /30[2-4]/,
        'icon' : 'icon-leizhenyu'
    },
    {
        'regx' : /30(5|[8-9])/,
        'icon' : 'icon-xiaoyu'
    },
    {
        'regx' : /3(06|1[4-5])/,
        'icon' : 'icon-zhongyu'
    },
    {
        'regx' : /3(07|1[6-8]|99)/,
        'icon' : 'icon-dayu'
    },
    {
        'regx' : /4(0[0-1]|99)/,
        'icon' : 'icon-xiaoxue'
    },
    {
        'regx' : /40[2-3]/,
        'icon' : 'icon-daxue'
    },
    {
        'regx' : /40[4-6]/,
        'icon' : 'icon-yujiaxue'
    },
    {
        'regx' : /5(0(0|1|9)|1(0|4|5))/,
        'icon' : 'icon-wu'
    },
    {
        'regx' : /5(02|1[1-3])/,
        'icon' : 'icon-wumai'
    },
    {
        'regx' : /504/,
        'icon' : 'icon-fuchen'
    },
    {
        'regx' : /50[7-8]/,
        'icon' : 'icon-shachenbao'
    }
];


var colorArr = ['#fc0', '#f80', '#f40', '#f00', '#b00', '#700'];

var xmlData = {
    'location/ip' : null,
    'weather'      : null,
    'air/now'      : null 
};