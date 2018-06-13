//中国城市信息
var City_Info = [
    {
        'province' : "黑龙江,3113",
        'citys' : ["阿城,120","安达,88","巴彦,93","拜泉,68","宝清,101","北安,56","宾县,121","勃利,128","大庆,83","大兴安岭,35","东宁,636","抚远,3449","方正,124","富锦,78","富裕,64","甘南,63","哈尔滨,116","海林,631","海伦,69","鹤岗,73","黑河,38","呼兰,119","呼玛,31","呼中,29","虎林,131","桦川,97","桦南,98","鸡东,133","鸡西,129","集贤,99","佳木斯,95","嘉荫,59","克东,58","克山,57","兰西,90","林甸,66","林口,130","龙江,62","萝北,74","密山,132","明水,37","漠河,26","牡丹江,633","木兰,122","穆棱,632","讷河,53","嫩江,45","宁安,635","七台河,127","齐齐哈尔,65","青冈,85","饶河,3451","庆安,91","尚志,126","双城,118","双鸭山,100","绥滨,77","绥芬河,634","绥化,87","绥棱,70","孙吴,46","塔河,28","泰来,84","汤原,94","铁力,92","通河,123","同江,75","望奎,86","乌伊岭,60","五常,629","五大连池,55","五营,71","新林,30","逊克,47","延寿,125","伊春,72","依安,67","依兰,96","肇东,89","肇源,117","肇州,115","友谊,3568"]
    },
    { 
        'province' : "吉林,3114",
        'citys' : ["安图,658","白城,107","白山,737","长白,740","长春,650","长岭,622","大安,111","德惠,625","东丰,683","东岗,690","敦化,657","扶余,623","公主岭,648","和龙,692","桦甸,687","珲春,695","辉南,688","吉林,655","集安,739","蛟河,656","靖宇,689","九台,626","梨树,646","辽源,682","临江,738","柳河,686","龙井,694","梅河口,685","农安,624","磐石,684","前郭,114","乾安,113","舒兰,628","双辽,645","双阳,652","四平,649","松原,112","洮南,109","通化,735","通化县,734","通榆,620","图们,697","汪清,660","延吉,696","伊通,651","永吉,654","榆树,627","镇赉,110","东辽,3566","抚松,3567"]
    },
    { 
        'province' : "辽宁,3115",
        'citys' : ["鞍山,724","朝阳,3468","北票,709","本溪,728","本溪县,731","昌图,674","长海,822","东港,3467","大连,864","大石桥,778","大洼,774","丹东,784","灯塔,730","法库,676","凤城,783","抚顺,733","阜新,673","盖州,777","海城,776","黑山,720","葫芦岛,771","桓仁,736","建昌,770","建平县,712","金州,819","锦州,722","喀左,714","开原,680","康平,675","宽甸,782","辽阳,729","辽阳县,727","辽中,717","凌海,715","凌源,713","旅顺,863","盘山,3469","盘锦,723","普兰店,820","清原,681","沈阳,726","绥中,772","台安,721","铁岭,678","瓦房店,818","西丰,679","新民,718","兴城,773","岫岩,781","义县,719","营口,775","章党,732","彰武,672","庄河,823","新宾,3565"]
    },
    { 
        'province' : "内蒙古,3116",
        'citys' : ["阿巴嘎旗,325","阿尔山,61","阿拉善右旗,254","阿拉善左旗,411","阿鲁科尔沁旗,641","阿荣旗,54","敖汉旗,668","八里罕,704","巴林右旗,638","巴林左旗,617","巴雅尔吐胡硕,105","巴彦诺尔贡,248","白云鄂博,334","包头,352","宝过图,669","博克图,50","察哈尔右翼后旗,342","察哈尔右翼前旗,364","察哈尔右翼中旗,341","陈巴尔虎旗,40","赤峰,666","达尔罕茂明安联合旗,336","达拉特旗,354","大佘太,335","磴口,348","东乌珠穆沁旗,104","多伦,663","额尔古纳,32","额济纳旗,239","鄂尔多斯,385","鄂伦春旗,36","鄂托克旗,383","鄂托克前旗,461","鄂温克旗,41","二连浩特,322","丰镇,366","岗子,665","高力板,618","根河,33","固阳,337","拐子湖,242","呼伦贝尔,3479","海拉尔,43","海力素,327","杭锦后旗,349","杭锦旗,384","浩尔吐,615","和林格尔,359","河南,462","呼和浩特,355","呼和浩特市郊区,357","胡尔勒,79","化德,344","吉兰太,375","集宁,363","喀喇沁旗,703","开鲁,643","科尔沁右翼中旗,108","科尔沁左翼后旗,670","科尔沁左翼中旗,621","克什克腾旗,640","库伦旗,671","凉城,361","林西,639","临河,378","满都拉,324","满洲里,39","莫力达瓦旗,52","那仁宝力格,323","奈曼旗,667","宁城,707","清水河,3470","青龙山,642","商都,343","舍伯吐,619","四子王旗,338","苏尼特右旗,328","苏尼特左旗,326","索伦,81","太仆寺旗,700","通辽,644","头道湖,256","突泉,106","图里河,34","土默特右旗,353","土默特左旗,356","托克托,358","翁牛特旗,664","乌海,377","乌拉盖,103","乌拉特后旗,331","乌拉特前旗,351","乌拉特中旗,332","乌兰浩特,82","乌审旗,420","乌审召,387","五原,333","武川,340","西乌珠穆沁旗,614","希拉穆仁,339","锡林高勒,376","锡林浩特,637","镶黄旗,330","小二沟,44","新巴尔虎右旗,48","新巴尔虎左旗,49","兴和,365","牙克石,42","伊金霍洛旗,386","伊克乌素,382","扎赉特旗,80","扎兰屯,51","扎鲁特旗,616","正兰旗,662","正镶白旗,661","中泉子,253","朱日和,329","准格尔旗,388","卓资,360","霍林郭勒,3564"]
    },
    { 
        'province' : "河北,3117",
        'citys' : ["安国,832","安平,837","安新,833","北戴河,3445","霸州,798","柏乡,12","保定,830","泊头,846","沧州,844","昌黎,816","大名,919","成安,611","承德,755","任县,525","承德县,760","赤城,744","崇礼,699","磁县,538","大厂,791","大城,841","定州,451","东光,878","肥乡,595","丰南,812","丰宁,701","丰润,811","馆陶,924","峰峰,535","抚宁,817","阜城,875","阜平,445","高碑店,789","高阳,831","高邑,17","藁城,452","沽源,698","固安,793","故城,872","广平,540","广宗,856","海兴,855","邯郸,533","河间,842","衡水,867","怀安,371","怀来,745","黄骅,852","鸡泽,860","临西,916","冀州,869","晋洲,444","井陉,448","景县,876","巨鹿,25","康保,345","宽城,762","涞源,409","廊坊,796","乐亭,815","蠡县,848","临城,19","临漳,483","灵寿,438","隆化,705","隆尧,20","卢龙,767","栾城,16","滦南,766","滦平,753","滦县,810","满城,839","孟村,861","内邱,23","南宫,870","南和,532","南皮,884","宁晋,22","邱县,934","平泉,706","平山,449","平乡,857","迁安,768","迁西,764","秦皇岛,769","青龙,765","青县,843","清河,871","曲阳,440","曲周,534","饶阳,834","任丘,838","容城,787","三河,800","沙河,8","尚义,346","涉县,528","深泽,849","深州,836","石家庄,453","顺平,408","肃宁,853","威县,915","唐海,814","唐山,813","唐县,447","万全,374","望都,835","围场,702","蔚县,406","魏县,537","文安,840","无极,454","吴桥,882","武安,531","武强,865","武邑,868","献县,845","香河,801","辛集,866","新河,858","新乐,450","兴隆,757","行唐,443","邢台,24","雄县,859","徐水,829","宣化,373","盐山,854","阳原,372","易县,790","永年,536","永清,799","玉田,802","元氏,18","赞皇,21","枣强,873","张北,347","张家口,743","赵县,11","正定,446","涿鹿,747","涿州,786","遵化,759","涞水,3441","鹿泉,3557","清苑,3558","定兴,3559","博野,3560","沧县,3561"]
    },
    { 
        'province' : "河南,3118",
        'citys' : ["宝丰,1431","安阳,539","长葛,1387","博爱,594","长垣,613","郸城,1887","夏邑,1864","登封,1383","邓州,1479","范县,971","方城,1429","扶沟,1397","巩义,1381","光山,1494","封丘,598","固始,1928","淮阳,1442","郏县,1430","淮滨,1926","潢川,1927","鹤壁,605","开封,1391","滑县,610","兰考,1392","辉县,600","获嘉,603","济源,593","临颍,1433","灵宝,1363","焦作,597","卢氏,1370","鲁山,1424","浚县,607","栾川,1378","罗山,1493","洛宁,1369","洛阳,1374","漯河,1436","孟津,1372","孟州,1373","泌阳,1483","林州,530","内乡,1422","鹿邑,1888","南乐,969","南阳,1428","南召,1426","民权,1853","平舆,1487","濮阳,968","宁陵,1857","杞县,1395","内黄,608","平顶山,3446","清丰,970","确山,1489","汝南,1447","汝阳,1379","汝州,1376","三门峡,1358","淇县,590","商水,1448","上蔡,1444","沁阳,588","社旗,1437","渑池,1367","商城,1968","商丘,1854","嵩县,1421","遂平,1439","台前,931","太康,1398","沈丘,1890","唐河,1478","通许,1441","桐柏,1484","睢县,1850","汤阴,606","尉氏,1393","温县,1380","舞钢,1427","舞阳,1435","西华,1443","西平,1438","西峡,1420","息县,1491","淅川,1474","卫辉,609","襄城,1432","项城,1446","新安,1371","新蔡,1488","新密,1385","新县,1535","新野,1477","新郑,1386","信阳,1492","许昌,1389","武陟,602","鄢陵,1394","偃师,1377","叶县,1434","伊川,1375","新乡,601","宜阳,1368","修武,599","荥阳,1382","延津,612","禹州,1388","永城,1894","虞城,1855","镇平,1425","正阳,1490","郑州,1384","中牟,1390","原阳,604","周口,1445","柘城,1856","驻马店,1486","陕县,3555"]
    },
    { 
        'province' : "山东,3119",
        'citys' : ["安丘,3487","博山,939","苍山,1873","曹县,1851","昌乐,951","昌邑,952","长岛,903","长清,930","成山头,912","成武,1852","滨州,896","茌平,928","博兴,898","单县,1859","定陶,977","东阿,929","东明,976","东平,979","肥城,933","费县,994","德州,879","东营,897","福山,908","高密,956","高唐,925","冠县,920","海阳,965","菏泽,974","高青,892","桓台,947","河口,3489","广饶,899","即墨,962","济南,937","济宁,983","济阳,935","嘉祥,989","胶南,1001","胶州,958","金乡,985","莒南,999","莒县,997","巨野,982","鄄城,972","垦利,901","莱芜,942","莱西,959","莱阳,960","莱州,902","崂山,961","惠民,888","梁山,978","聊城,921","临清,917","临朐,949","临沂,998","临淄,948","龙口,905","临沭,1874","蒙阴,991","乐陵,889","利津,894","牟平,910","临邑,877","陵县,880","宁阳,981","蓬莱,904","平度,953","平邑,992","平阴,932","栖霞,907","齐河,927","青岛,963","青州,945","宁津,881","曲阜,986","日照,1002","荣成,914","平原,883","乳山,964","庆云,891","石岛,967","寿光,946","商河,887","泗水,988","泰安,941","滕州,993","威海,911","潍坊,954","台儿庄,1869","文登,913","汶上,980","五莲,1000","郯城,1875","夏津,918","微山,1865","无棣,885","新泰,990","武城,874","烟台,909","兖州,984","阳谷,922","沂南,996","沂水,995","沂源,950","薛城,1866","鱼台,975","禹城,926","阳信,886","峄城,1867","郓城,973","招远,906","枣庄,1868","周村,943","诸城,957","沾化,893","章丘,890","淄博,944","淄川,938","邹城,987","邹平,936","莘县,3554"]
    },
    { 
        'province' : "山西,31110",
        'citys' : ["安泽,519","保德,425","长治,524","长子,516","大宁,502","大同,368","大同县,369","代县,399","定襄,434","繁峙,403","方山,474","汾西,510","汾阳,479","浮山,584","高平,589","古县,517","广灵,405","和顺,15","河津,576","河曲,390","洪洞,511","侯马,581","壶关,527","怀仁,400","浑源,401","霍州,513","吉县,504","稷山,573","绛县,583","交城,487","交口,505","介休,508","晋城,592","晋中,488","静乐,430","岢岚,426","岚县,429","柳林,3492","离石,476","黎城,520","临汾,512","临县,424","临猗,577","灵邱,407","灵石,507","陵川,596","娄烦,431","潞城,522","吕梁,469","平陆,1366","宁武,397","平遥,3490","偏关,391","蒲县,3491","平定,442","平鲁,394","平顺,529","芮城,1360","祁县,480","沁水,587","沁县,515","沁源,518","清徐,484","曲沃,579","山阴,396","神池,395","石楼,473","寿阳,7","朔州,398","太谷,485","太原,482","尖草坪区,435","太原古交区,475","小店区,437","天镇,370","屯留,521","万荣,575","夏县,1365","文水,481","闻喜,585","五台山,404","五寨,427","武乡,514","昔阳,10","隰县,500","乡宁,572","襄汾,506","襄垣,526","孝义,478","忻州,433","新绛,582","兴县,428","永济,1359","阳城,591","阳高,367","阳曲,436","阳泉,9","翼城,580","应县,402","永和,499","右玉,362","盂县,441","榆次,486","榆社,14","垣曲,586","原平,432","运城,578","中阳,477","左权,13","左云,393","泽州,3562","五台县,3563","五台县豆村,439"]
    },
    { 
        'province' : "江苏,31111",
        'citys' : ["宝应,1919","滨海,1886","常熟,2000","常州,1994","大丰,1923","丹阳,1992","东海,1877","东台,1957","丰县,1860","阜宁,1914","赣榆,1879","高淳,1990","高邮,1947","灌南,1885","灌云,1884","海安,1959","海门,2007","洪泽,1911","淮安,1916","淮阴县,1913","建湖,1917","江都,1950","江宁,1984","江浦,1943","江阴,1999","姜堰,1956","金湖,1918","金坛,1993","靖江,1961","句容,1995","昆山,2003","溧水,1991","溧阳,1996","连云港,1881","涟水,1912","六合,1941","南京,1944","南通,1962","沛县,1861","邳州,1870","启东,1967","如东,1963","如皋,1960","射阳,1920","沭阳,1878","泗洪,1909","泗阳,1908","苏州,2004","宿迁,1907","睢宁,1906","太仓,2016","泰兴,1955","泰州,1952","无锡,2002","吴江,2006","响水,1882","新沂,1876","兴化,1949","盱眙,1910","徐州,1871","盐城,1921","扬中,1953","扬州,1951","仪征,1948","宜兴,1997","张家港,2001","镇江,1954","铜山,3548","吴中,3549"]
    },
    { 
        'province' : "安徽,31112",
        'citys' : ["安庆,2032","蚌埠,1934","亳州,1889","长丰,1933","巢湖,1979","池州,2034","滁州,1942","枞阳,2029","当涂,1986","砀山,1862","定远,1938","东至,2028","繁昌,1988","肥东,1978","肥西,1976","凤台,1930","凤阳,1935","阜南,1924","阜阳,1925","固镇,1904","广德,2044","含山,1982","合肥,1977","和县,1983","怀宁,2025","怀远,1903","淮北,1897","淮南,1937","黄山,3427","黄山区,2033","黄山市,3428","霍邱,1931","霍山,1972","绩溪,2043","界首,1892","金寨,1970","泾县,2038","旌德,2040","九华山,2031","来安,1940","郎溪,2045","利辛,1898","临泉,1891","灵璧,1901","六安,1971","庐江,1980","马鞍山,1987","蒙城,1899","明光,1936","南陵,2037","宁国,2041","祁门,2083","潜山,2024","青阳,2030","全椒,1939","石台,2035","寿县,1932","舒城,1973","泗县,1902","宿松,2026","宿州,1900","濉溪,1895","太和,1893","太湖,2023","天长,1946","桐城,1975","铜陵,2036","屯溪,2088","望江,2027","涡阳,1896","无为,1981","芜湖,1985","芜湖县,1989","五河,1905","歙县,2087","萧县,1863","休宁,2089","宣城,2039","黟县,2084","颍上,3426","岳西,1974"]
    },
    { 
        'province' : "陕西,31113",
        'citys' : ["安康,1463","白河,1469","宝鸡,1327","安塞,495","彬县,1331","白水,563","长安,1347","城固,1409","淳化,1339","大荔,1351","长武,556","丹凤,1417","澄城,570","定边,459","凤县,1404","凤翔,1333","佛坪,1412","扶风,1334","富平,1350","高陵,1348","府谷,392","汉阴,1459","汉中,1408","富县,558","甘泉,497","户县,1411","华县,1357","华阴,1362","韩城,574","合阳,571","泾阳,1341","横山,465","岚皋,1464","蓝田,1355","黄陵,565","黄龙,567","礼泉,1337","临潼,1352","佳县,423","麟游,1330","留坝,1406","陇县,1319","靖边,463","略阳,1401","洛南,1364","眉县,1335","勉县,1405","南郑,1454","宁强,1453","宁陕,1413","洛川,564","平利,1465","米脂,467","岐山,1332","千阳,1329","乾县,1343","蒲城,569","三原,1349","山阳,1419","商南,1418","清涧,472","石泉,1458","商洛,3493","神木,422","太白,1336","绥德,470","潼关,1361","渭南,1353","武功,1342","铜川,568","西安,1344","西乡,1410","咸阳,1356","吴堡,471","吴旗,464","兴平,1346","旬阳,1462","洋县,1407","耀县,1345","旬邑,562","延安,496","永寿,1338","延长,501","延川,498","宜川,503","宜君,566","镇安,1416","镇巴,1461","镇坪,1514","榆林,421","周至,1340","紫阳,1457","柞水,1414","志丹,494","子长,466","子洲,468"]
    },
    { 
        'province' : "宁夏,31114",
        'citys' : ["彭阳,545","固原,491","海原,489","贺兰,412","惠农,381","泾源,548","灵武,419","隆德,546","平罗,413","青铜峡,417","石嘴山,380","陶乐,416","同心,490","吴忠,414","西吉,541","盐池,458","银川,415","永宁,418","中宁,456","中卫,455"]
    },
    { 
        'province' : "甘肃,31115",
        'citys' : ["麦积,1326","白银,299","成县,1399","皋兰,295","宕昌,1052","迭部,1047","崇信,555","东乡,3432","定西,319","敦煌,243","甘谷,1317","瓜州,3431","合作,1044","高台,251","古浪,274","徽县,1402","广河,312","合水,559","和政,315","康县,1400","华池,557","华亭,554","环县,492","礼县,1322","会宁,318","两当,1403","临潭,1045","金昌,265","金塔,247","陇西,1049","泾川,553","景泰,276","靖远,298","静宁,542","酒泉,250","碌曲,1041","康乐,317","玛曲,1042","兰州,297","岷县,1050","临洮,316","临夏,314","临泽,252","灵台,551","民乐,261","民勤,267","秦安,1318","清水,1324","宁县,561","平凉,547","庆阳,493","山丹,263","天水,1321","肃北,249","肃南,258","文县,1085","武都,1053","通渭,543","武山,1320","西和,1323","渭源,321","武威,266","西峰,550","夏河,309","张家川,1325","永昌,264","漳县,1048","永登,296","永靖,310","榆中,313","玉门镇,245","舟曲,1051","卓尼,1046","张掖,260","镇原,552","正宁,560","庄浪,549","嘉峪关,3627","天祝,3628","阿克塞,3629","庆城,3630","积石山,3631"]
    },
    { 
        'province' : "青海,31116",
        'citys' : ["班玛,1064","达日,1038","大柴旦,269","大通,286","都兰,280","甘德,1037","果洛,1036","格尔木,277","黄南,1039","贵德,289","贵南,303","海北,272","海东,292","海南,285","海西,270","海晏,282","久治,1040","互助,287","化隆,294","湟源,284","湟中,290","尖扎,305","玛多,1033","乐都,291","冷湖,255","囊谦,1058","茫崖,233","门源,273","民和,293","曲麻莱,1031","祁连,262","清水河,3484","天峻,271","同德,304","乌兰,279","西宁,288","兴海,302","循化,307","玉树,1032","杂多,1030","治多,1029","泽库,306","刚察,3632","河南,3633","共和,3634","玛沁,3635","称多,3636","德令哈,3637"]
    },
    { 
        'province' : "湖北,31117",
        'citys' : ["安陆,1531","巴东,1518","保康,1521","蔡甸,1578","长阳,1565","赤壁,1626","崇阳,1630","大悟,1534","大冶,1585","丹江口,1473","当阳,1562","鄂州,1583","恩施,1559","房县,1472","公安,1572","谷城,1476","广水,1529","汉川,1577","鹤峰,1611","红安,1536","洪湖,1625","黄陂,1579","黄冈,1584","嘉鱼,1627","监利,1621","建始,1558","江夏,1581","黄梅,2022","黄石,2020","京山,1530","荆门,1526","荆州,1571","来凤,1613","老河口,1475","利川,1557","麻城,1537","罗田,2017","南漳,1523","潜江,1570","蕲春,2021","三峡,1564","神农架,1522","十堰,1470","石首,1620","松滋,1568","随州,1528","天门,1575","通城,1631","通山,1633","五峰,1561","武汉,1582","仙桃,1576","咸丰,1609","咸宁,1632","襄阳,1481","孝感,1574","新洲,1580","武穴,2071","兴山,1520","浠水,2019","宣恩,1610","宜昌,1563","宜昌县,1560","宜城,1525","宜都,1566","应城,1573","阳新,2070","英山,2018","远安,1524","云梦,1532","郧西,1467","郧县,1468","枣阳,1482","枝江,1567","钟祥,1527","竹山,1471","竹溪,1466","秭归,1519","江陵,1569","沙洋,3573","孝昌,3574","团风,3575"]
    },
    { 
        'province' : "湖南,31118",
        'citys' : ["安化,1665","安仁,1784","安乡,1624","保靖,1653","茶陵,1785","长沙,1670","常宁,1781","常德,1662","辰溪,1660","郴州,1834","城步,1771","慈利,1617","道县,1830","东安,1776","洞口,1711","凤凰,1701","古丈,1655","汉寿,1663","衡东,1726","桂东,1789","衡山,1725","桂阳,1835","花垣,1652","华容,1623","怀化,1708","赫山区,3455","吉首,1657","衡南,1782","衡阳,1780","衡阳县,1779","会同,1765","嘉禾,1836","江华,2271","江永,1832","冷水江,1712","澧县,1618","醴陵,1729","涟源,1714","临澧,1619","临湘,1629","靖州,1764","浏阳,1674","龙山,1612","隆回,1717","蓝山,1837","娄底,1715","泸溪,1659","耒阳,1783","冷水滩,1774","麻阳,1704","马坡岭,1673","临武,1839","汨罗,1671","南县,1622","南岳,1724","宁乡,1669","平江,1672","宁远,1831","祁东,1778","祁阳,1777","桑植,1614","韶山,1720","邵东,1719","邵阳,1716","汝城,1841","石门,1616","双峰,1723","邵阳县,1773","桃江,1664","桃源,1661","双牌,1828","绥宁,1768","通道,1767","湘潭,1722","湘乡,1721","湘阴,1667","新化,1713","新晃,1705","新邵,1718","武冈,1770","溆浦,1709","新宁,1769","新田,1833","益阳,1668","炎陵,1787","永顺,1654","攸县,1727","宜章,1838","沅江,1666","沅陵,1658","岳阳,1628","永兴,1788","张家界,1615","永州,1775","芷江,1706","株洲,1728","资兴,1840","望城,3576","洪江,3577","中方,3578"]
    },
    { 
        'province' : "浙江,31119",
        'citys' : ["安吉,2047","长兴,2046","常山,2135","淳安,2092","慈溪,2065","岱山,2069","德清,2054","东阳,2103","奉化,2107","富阳,2049","海宁,2055","海盐,2058","杭州,2057","洪家,2154","湖州,2050","嘉善,2051","嘉兴,2052","建德,2093","江山,2136","金华,2097","缙云,2147","开化,2090","兰溪,2096","乐清,2148","丽水,2144","临安,2048","龙泉,2145","龙游,2095","宁波,2106","宁海,2109","平湖,2064","平阳,2185","浦江,2094","普陀,2112","青田,2149","庆元,2179","衢州,2137","瑞安,2186","三门,2110","上虞,2099","绍兴,2053","嵊泗,2067","嵊州,2101","遂昌,2143","台州,2152","泰顺,2180","天台,2104","桐庐,2091","桐乡,2056","温岭,2153","温州,2151","文成,2184","武义,2141","仙居,2146","象山,2108","萧山,2059","新昌,2100","义乌,2102","永嘉,2150","永康,2142","余姚,2066","玉环,2156","云和,2177","舟山,2068","诸暨,2098","临海,3532","洞头,2188","鄞州,3533","苍南,3550","磐安,3551","松阳,3552","景宁,3553"]
    },
    { 
        'province' : "江西,31120",
        'citys' : ["安福,1735","安义,2115","安远,2216","崇仁,2163","崇义,1844","大余,1847","德安,2076","德兴,2128","定南,2286","东乡,3462","都昌,2081","分宜,1732","丰城,2120","奉新,2114","抚州,2125","赣州,1846","高安,2116","广昌,2191","广丰,2139","贵溪,2132","吉安,1736","横峰,2131","湖口,2078","会昌,2215","吉水,2162","莲花,1731","金溪,2164","进贤,2122","井冈山,1791","景德镇,2085","靖安,2113","九江,2072","乐安,2161","乐平,2127","黎川,2168","龙南,2285","庐山,2074","南昌,2117","南昌县,2118","南城,2166","南丰,2167","南康,1845","萍乡,1730","宁都,2190","宁冈,1786","彭泽,2079","鄱阳,3461","铅山,2134","上高,1678","全南,2284","瑞昌,2073","瑞金,2213","上饶,2140","上饶县,2129","上犹,3465","石城,2192","铜鼓,1675","万载,1677","遂川,1793","泰和,1794","万安,1792","万年,2123","武宁,2075","新余,1734","婺源,2086","修水,1634","峡江,2159","新干,2158","新建,2157","信丰,1848","兴国,2189","星子,2080","宜春,1733","宜丰,1676","寻乌,2291","宜黄,3463","弋阳,2130","鹰潭,2133","永丰,2160","永新,1790","永修,2077","于都,2214","余干,2121","余江,2124","玉山,2138","樟树,2119","资溪,2165","浮梁,3569","芦溪,3570","上栗,3571","赣县,3572"]
    },
    { 
        'province' : "福建,31121",
        'citys' : ["安溪,2226","长乐,2235","长泰,2299","长汀,2217","崇武,2307","大田,2222","德化,2231","东山,2370","福安,2182","福鼎,2187","福清,2236","福州,2210","古田,2203","光泽,2169","华安,2225","建宁,2197","建瓯,2176","建阳,2173","将乐,2196","连城,2218","连江,2211","龙海,2303","龙岩,2224","罗源,2208","闽侯,2207","闽清,2205","明溪,2199","南安,2306","南靖,2300","南平,2202","宁德,2209","宁化,2193","平和,2301","平潭,2237","屏南,2229","莆田,2238","浦城,2172","清流,2194","泉州,2309","三明,2201","沙县,2200","上杭,2220","邵武,2170","寿宁,2178","顺昌,2198","松溪,2174","泰宁,2195","同安,2305","武平,2219","武夷山,2171","霞浦,2206","厦门,2308","仙游,2232","秀屿港,2233","永安,2221","永春,2230","永定,2295","永泰,2228","尤溪,2204","云霄,2371","漳平,2223","漳浦,2304","漳州,2302","诏安,2369","柘荣,2183","政和,2175","周宁,2181","惠安,3545","石狮,3546","晋江,3547"]
    },
    { 
        'province' : "贵州,31122",
        'citys' : ["安龙,1801","安顺,1740","白云,1804","毕节,1679","岑巩,1696","册亨,1802","长顺,1748","赤水,1642","大方,1680","从江,1816","丹寨,1757","道真,1646","德江,1651","都匀,1755","独山,1811","凤冈,1689","福泉,1749","关岭,1797","赫章,1194","贵定,1752","贵阳,1747","花溪,1807","江口,1697","黄平,1750","金沙,1683","惠水,1805","开阳,1686","剑河,1760","锦屏,1766","六盘水,1215","凯里,1753","雷山,1761","黎平,1762","荔波,1813","湄潭,1688","六枝,1741","龙里,1806","纳雍,1737","罗甸,1809","麻江,1756","盘县,1248","普安,1247","黔西,1738","平坝,1746","平塘,1810","仁怀,1681","普定,1742","清镇,1745","晴隆,1795","施秉,1698","榕江,1815","石阡,1695","三都,1812","三穗,1758","思南,1693","松桃,1656","绥阳,1687","桐梓,1640","铜仁,1702","万山,1703","威宁,1214","台江,1759","瓮安,1690","务川,1649","天柱,1763","息烽,1685","习水,1644","望谟,1799","乌当,1808","沿河,1650","兴仁,1796","兴义,1800","修文,1744","印江,1694","余庆,1691","玉屏,1700","镇远,1699","正安,1647","织金,1739","贞丰,1798","镇宁,1743","紫云,1803","遵义,1682","遵义县,1684","水城,3585"]
    },
    { 
        'province' : "四川,31123",
        'citys' : ["阿坝,1070","安县,1084","安岳,1542","巴塘,1097","巴中,1501","白玉,1063","宝兴,1103","北川,1087","苍溪,1495","长宁,1190","成都,1117","崇州,1075","达州,1509","大邑,1110","大竹,1550","丹巴,1100","丹棱,1134","布拖,1184","道孚,1068","纳溪,1638","稻城,1127","得荣,1150","德昌,1180","德格,1061","德阳,1091","都江堰,1082","峨边,1140","峨眉,1137","东兴,3494","峨眉山,1138","富顺,1148","甘洛,1155","甘孜,1062","高县,1189","珙县,1174","古蔺,1639","广安,1547","广汉,1116","广元,1451","汉源,1131","合江,1637","黑水,1079","红原,1072","洪雅,1133","会东,1211","会理,1208","夹江,1135","犍为,1141","简阳,1118","剑阁,1452","江安,1635","江油,1088","金川,1069","金堂,1119","金阳,1186","井研,1142","九寨沟,1054","筠连,1173","开江,1510","康定,1130","阆中,1497","乐山,1139","乐至,1541","雷波,1162","理塘,1099","理县,1078","凉山,1181","邻水,1548","龙泉驿,1111","隆昌,1591","芦山,1106","泸定,1128","泸县,1592","泸州,1636","炉霍,1066","马边,1160","马尔康,1071","茂县,1074","眉山,1143","美姑,1163","米易,1207","绵阳,1089","绵竹,1080","冕宁,1156","名山,1107","木里,1153","沐川,1165","内江,1588","南部,1502","南充,1544","南江,1455","南溪,1168","宁南,1183","攀枝花,1205","彭山,1114","彭州,1083","蓬安,1504","蓬溪,1539","郫县,1102","平昌,1507","平武,1086","屏山,1169","蒲江,1108","普格,1182","青川,1449","青神,1136","邛崃,1109","渠县,1545","壤塘,1067","仁和,1210","仁寿,1120","荣经,1129","荣县,1145","若尔盖,1043","三台,1498","色达,1065","射洪,1538","什邡,1090","石棉,1132","石渠,1035","双流,1113","松潘,1076","遂宁,1540","天全,1105","通江,1506","万源,1460","旺苍,1456","威远,1146","温江,1081","汶川,1077","武胜,1549","西充,1500","喜德,1158","乡城,1151","小金,1073","新都,1115","新津,1104","新龙,1098","兴文,1171","西昌,3495","叙永,1641","宣汉,1508","雅安,1112","雅江,1101","盐边,1204","盐亭,1499","盐源,1178","仪陇,1503","宜宾,1167","宜宾县,1166","营山,1505","岳池,1546","越西,1157","昭觉,1159","中江,1092","资阳,1121","资中,1144","梓潼,1496","自贡,1147","罗江,3582","华蓥,3583","九龙,3584"]
    },
    { 
        'province' : "广东,31124",
        'citys' : ["博罗,2355","潮阳,2367","潮州,2361","澄海,2368","从化,2349","大埔,2297","德庆,2341","电白,2446","遂溪,2438","东莞,2351","斗门,2416","恩平,2411","番禺,2414","丰顺,2360","封开,2337","佛冈,2281","佛山,2346","高州,2439","广宁,2343","广州,2350","海丰,2420","和平,2290","河源,2353","花都,2348","化州,2441","怀集,2342","惠东,2418","惠来,2366","惠州,2356","江门,2408","蕉岭,2296","揭西,2359","揭阳,2364","开平,2409","乐昌,1842","雷州,2449","连南,2274","连平,2288","连山,2276","连州,2275","廉江,2440","龙川,2293","龙门,2352","陆丰,2422","罗定,2404","茂名,2444","梅州,2298","南澳,2372","南海,2467","南雄,1849","平远,2292","普宁,2363","清远,2347","饶平,2362","仁化,1843","乳源,2278","三水,3435","汕头,2365","汕尾,2421","韶关,2279","深圳,2419","始兴,2283","顺德,2413","四会,2344","台山,2412","翁源,2287","吴川,2442","五华,2357","新丰,2289","新会,2410","新兴,2406","信宜,2402","兴宁,2294","徐闻,2451","阳春,2405","阳江,2445","阳山,2277","英德,2282","郁南,2340","云浮,2407","增城,2354","湛江,2443","肇庆,2345","中山,2415","珠海,2417","紫金,2358","鹤山,3534","高要,3535","梅县,3536","陆河,3537","东源,3538","阳西,3539","阳东,3540","清新,3541","潮安,3542","揭东,3543","云安,3544","惠阳,3641"]
    },
    { 
        'province' : "广西,31125",
        'citys' : ["巴马,2252","百色,2316","北海,2436","北流,2398","宾阳,2327","博白,2397","苍梧,2339","岑溪,2401","崇左,2386","大新,2385","德保,2318","东兰,2251","东兴,3437","都安,2256","防城,2432","防城港,2434","凤山,2248","扶绥,2387","富川,2270","恭城,2264","灌阳,1829","贵港,2331","桂林,1825","桂平,2333","合浦,2435","河池,2250","贺州,2273","横县,2394","环江,2253","金秀,2267","靖西,2319","来宾,2329","乐业,2245","荔浦,2266","临桂,1822","灵川,1824","灵山,2395","凌云,2246","柳城,2258","柳江,2262","柳州,2261","龙胜,1818","龙州,2383","隆安,2323","隆林,2243","陆川,2403","鹿寨,2260","罗城,2254","马山,2324","蒙山,2268","那坡,2315","南丹,2249","南宁,2391","宁明,2388","平果,2322","平乐,2265","平南,2334","凭祥,2384","浦北,2396","钦州,2433","全州,1827","容县,2399","融安,1819","融水,1820","三江,1817","上林,2325","上思,2390","藤县,2335","天等,2321","天峨,1814","田东,2320","田林,2247","田阳,2317","涠洲岛,2437","梧州,2338","武鸣,2326","武宣,2330","西林,2244","象州,2328","忻城,2257","兴安,1823","阳朔,2263","宜州,2255","邕宁,2393","永福,1821","玉林,2400","昭平,2269","钟山,2272","资源,1772","兴业,3579","大化,3580","合山,3581"]
    },
    { 
        'province' : "云南,31126",
        'citys' : ["安宁,1264","保山,1222","宾川,1224","沧源,1284","昌宁,1256","呈贡,1277","澄江,1270","楚雄,1233","大理,1223","大姚,1228","德宏,1257","德钦,1152","东川,1213","峨山,1283","洱源,1199","凤庆,1258","福贡,1195","富民,1234","富宁,1450","富源,1246","个旧,1307","耿马,1286","广南,3508","鹤庆,1202","红河,1302","华宁,1274","华坪,1203","会泽,1212","建水,1301","剑川,1198","江城,1304","江川,1272","金平,1310","晋宁,1268","景东,1262","景谷,1291","开远,1306","昆明,1238","兰坪,1197","澜沧,1292","丽江,1200","梁河,1253","临沧,1290","景洪,3512","六库,1196","龙陵,1254","陇川,1249","泸西,1280","鲁甸,1187","陆良,1245","禄丰,1237","禄劝,1236","绿春,1305","罗平,1282","麻栗坡,1316","马关,1315","马龙,1241","勐海,1294","猛腊,1299","蒙自,1308","孟连,1288","弥渡,1225","弥勒,1279","墨江,1296","牟定,1231","南华,1232","南涧,1260","宁蒗,1179","怒江,1175","屏边,1309","普洱,1295","巧家,1209","丘北,1281","曲靖,1242","瑞丽,1251","师宗,1278","施甸,1255","石林,1276","石屏,1300","双柏,1263","双江,1289","嵩明,1243","绥江,1161","太华山,1269","腾冲,1217","通海,1273","威信,1193","维西,1177","文山,1314","武定,1235","西畴,1313","西盟,1287","祥云,1226","新平,1266","宣威,1216","寻甸,1240","盐津,1172","砚山,1312","漾鼻,1220","姚安,1230","宜良,1275","彝良,1191","易门,1267","盈江,1250","永德,1259","永平,1221","永仁,1206","永善,1164","永胜,1201","玉溪,1271","元江,1298","元谋,1229","元阳,1303","云龙,1219","云县,1261","沾益,1244","昭通,1188","镇康,1252","镇雄,1192","镇沅,1265","中甸,1176","大关,3586","水富,3587","宁洱,3588","巍山,3589","贡山,3590"]
    },
    { 
        'province' : "海南,31127",
        'citys' : ["白沙,2460","保亭,2470","昌江,2459","澄迈,2457","儋州,2458","定安,2462","东方,2455","海口,2453","乐东,2468","临高,2456","陵水,2473","南沙,2477","琼海,2465","琼中,2461","三亚,2471","屯昌,2464","万宁,2472","文昌,2466","五指山,3439","西沙,2474"]
    },
    { 
        'province' : "新疆,31128",
        'citys' : ["阿合奇,211","阿克苏,196","阿克陶,209","阿拉尔,216","阿拉山口,146","阿勒泰,139","阿图什,206","阿瓦提,215","巴楚,212","巴里坤,235","巴仑台,179","巴音布鲁克,187","拜城,198","博乐,147","布尔津,137","蔡家湖,162","策勒,227","察布查尔,169","昌吉,164","塔中,217","达坂城,183","额敏,143","福海,138","阜康,166","富蕴,140","伽师,208","巩留,173","哈巴河,134","哈密,238","和布克赛尔,144","和静,188","和硕,190","和田,229","呼图壁,163","霍城,152","霍尔果斯,151","吉木乃,136","吉木萨尔,167","精河,154","喀什,210","柯坪,214","克拉玛依,149","库车,202","库尔勒,204","轮台,201","洛浦,230","玛纳斯,161","麦盖提,222","米泉,165","民丰,231","莫索湾,157","墨玉,228","木垒,184","尼勒克,171","炮台,156","皮山,226","奇台,168","且末,232","青河,145","若羌,219","沙湾,159","沙雅,200","莎车,223","鄯善,194","石河子,158","塔城,141","塔什库尔干,221","特克斯,176","天池,182","铁干里克,218","吐鲁番,193","托克逊,191","托里,148","尉犁,203","温泉,153","温宿,197","乌鲁木齐,177","乌鲁木齐牧试站,181","乌恰,207","乌什,195","乌苏,155","小渠子,178","新和,199","新源,174","焉耆,189","叶城,224","伊宁,170","伊宁县,172","伊吾,237","英吉沙,220","于田,234","裕民,142","岳普湖,213","泽普,225","昭苏,175","疏附,3638","疏勒,3639","博湖,3640","奎屯,3642"]
    },
    { 
        'province' : "西藏,31129",
        'citys' : ["阿里,1009","安多,1007","班戈,1006","波密,1095","察隅,1149","昌都,1060","错那,1025","当雄,1011","丁青,1057","定日,1022","改则,1005","加查,1122","嘉黎,1093","江孜,1023","拉萨,1017","拉孜,1012","浪卡子,1024","林芝,1123","隆子,1026","洛隆,1094","芒康,1126","米林,1124","那曲,1008","南木林,1013","尼木,1015","聂拉木,1021","帕里,1027","日喀则,1014","山南,1020","申扎,1010","狮泉河,1004","索县,1055","左贡,1125","类乌齐,1059","八宿,1096","贡嘎,1016","琼结,1019","比如,1056","林周,3591","曲水,3592","堆龙德庆,3593","达孜,3594","墨竹工卡,3595","江达,3596","贡觉,3597","察雅,3598","边坝,3599","札囊,3600","桑日,3601","曲松,3602","措美,3603","洛扎,3604","萨迦,3605","昂仁,3606","谢通门,3607","白朗,3608","仁布,3609","康马,3610","定结,3611","仲巴,3612","吉隆,3613","萨嘎,3614","岗巴,3615","聂荣,3616","巴青,3617","尼玛,3618","普兰,3619","札达,3620","日土,3621","革吉,3622","措勤,3623","工布江达,3624","墨脱,3625","朗县,3626"]
    },
    { 
        'province' : "台湾,31130",
        'citys' : ["高雄,2425","台北,3496","台中,2313","新竹,3500","宜兰,2314","嘉义,2377","台南,2378","台东,2428","花莲,2380","桃园,3646","屏东,3647","苗栗,3648","彰化,3649","南投,3650","云林,3651"]
    },
    { 
        'province' : "北京,311101",
        'citys' : ["北京,792","昌平,785","大兴,826","房山,827","怀柔,752","门头沟,788","密云,751","平谷,756","顺义,741","通州,3409","延庆,746","海淀,742","朝阳,3408","丰台,795","石景山,794"]
    },
    { 
        'province' : "上海,311102",
        'citys' : ["宝山,2009","崇明,2012","奉贤,2063","嘉定,2011","金山,3530","闵行,2008","南汇,2014","浦东,2015","青浦,2061","上海,2013","松江,3413","徐家汇,3643"]
    },
    { 
        'province' : "天津,311103",
        'citys' : ["北辰,3417","宝坻,804","大港,3421","东丽,3415","汉沽,3418","津南,3419","蓟县,758","静海,847","宁河,808","天津,797","塘沽,3420","西青,3416","武清,803"]
    },
    { 
        'province' : "重庆,311104",
        'citys' : ["巴南,1601","北碚,1595","璧山,1598","长寿,1603","城口,1511","大足,1586","垫江,1551","丰都,1605","奉节,1516","涪陵,1604","合川,1596","江津,1600","开县,1512","梁平,1552","南川,1602","彭水,1608","綦江,1643","黔江,1607","荣昌,1589","石柱,1556","铜梁,1594","潼南,1543","万盛,1593","万州,1554","巫山,1517","巫溪,1515","武隆,1606","秀山,3321","永川,1590","酉阳,1648","渝北,1597","云阳,1513","忠县,1555","重庆,1599"]
    },
    { 
        'province' : "香港,311201",
        'citys' : ["香港,2594","新界,3425"]
    },
    { 
        'province' : "澳门,311202",
        'citys' : ["澳门,2597"]
    },
    { 
        'province' : "钓鱼岛,311203",
        'citys' : ["钓鱼岛,3652"]
    }
];    

//天气图标匹配规则
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
        'regx' : /104|2\d{2}/,
        'icon' : 'icon-yintian'
    },
    {
        'regx' : /300/,
        'icon' : 'icon-zhenyu'
    },
    {
        'regx' : /31(0|6)/,
        'icon' : 'icon-baoyu'
    },
    {
        'regx' : /30[1-4]/,
        'icon' : 'icon-leizhenyu'
    },
    {
        'regx' : /3(05|99)/,
        'icon' : 'icon-xiaoyu'
    },
    {
        'regx' : /3(06|14)/,
        'icon' : 'icon-zhongyu'
    },
    {
        'regx' : /3(0(7|8)|15)/,
        'icon' : 'icon-dayu'
    },
    {
        'regx' : /31(1|7)/,
        'icon' : 'icon-dabaoyu'
    },
    {
        'regx' : /31(2|8)/,
        'icon' : 'icon-tedabaoyu'
    },
    {
        'regx' : /4(0([0-1]|[8-9])|99)/,
        'icon' : 'icon-xiaoxue'
    },
    {
        'regx' : /40(2|9)/,
        'icon' : 'icon-daxue'
    },
    {
        'regx' : /4(0[3-5]|10)/,
        'icon' : 'icon-baoxue'
    },
    {
        'regx' : /40[6-7]/,
        'icon' : 'icon-zhenxue'
    },
    {
        'regx' : /5(0(0|1|9)|10)/,
        'icon' : 'icon-wu'
    },
    {
        'regx' : /503/,
        'icon' : 'icon-yangsha'
    },
    {
        'regx' : /5(02|1[1-5])/,
        'icon' : 'icon-mai'
    },
    {
        'regx' : /504/,
        'icon' : 'icon-fuchen'
    },
    {
        'regx' : /50[7-8]/,
        'icon' : 'icon-shachenbao'
    },
    {
        'regx' : /507/,
        'icon' : 'icon-shachenbao'
    },
    {
        'regx' : /508/,
        'icon' : 'icon-qiangshachenbao'
    }
];

//空气质量背景色数据
var colorArr = ['#fc0', '#f80', '#f40', '#f00', '#b00', '#700'];

//请求数据对象初始化
var xmlData = {
    'location/ip' : null,
    'weather'      : null,
    'air/now'      : null 
};

//动态页面拼接地址
var page_links = [
    {'link' : './pages/today.html', 'func' : 'todayFuncs'},
    {'link' : './pages/collection.html', 'func' : 'collectionFuncs'},
    {'link' : './pages/news.html', 'func' : 'newsFuncs'},
    {'link' : './pages/more.html', 'func' : 'moreFuncs'}
];

//注册页面相关规则
var reg_rule = [
    {
        'sel'  : '.user_name',
        'regx' : /^\w{6,20}$/
    },
    {
        'sel'  : '.user_pwd',
        'regx' : /^[A-Z].{5,}$/
    },
    {
        'sel'  : '.conf_pwd',
        'regx' : `$('.user_pwd').val()`
    },
    {
        'sel'  : '.user_email',
        'regx' : /^.+@\w+\.\w+$/
    },
    {
        'sel'  : '.user_tel',
        'regx' : /^1[3|5|7|8|9]\d-?\d{4}-?\d{4}$/
    },
    {
        'sel'  : '.verf_code',
        'regx' : `$('.verif_text').text()`
    },

];

//today页面定时器
var weatherFlashInterval;

//热门城市列表
var hotCityList = ['长沙','香港','丽江','北京','深圳','武汉','成都','杭州','澳门','苏州'];

//定义今日日期信息
var DateInfo = {
    day : ((new Date()).toLocaleDateString().split('/'))[2],
    month : ((new Date()).toLocaleDateString().split('/'))[1] + '月',
    weakday : '周' + '日一二三四五六'.charAt((new Date()).getDay()),
    time : (new Date()).toLocaleTimeString()
}

//头部属性列表
var headerStyle = [
    {
        'backg' : '',
        'titleI' : '1',
        'city' : '',
        'province' : '',
        'topleft_btn' : 'jia'
    },
    {
        'backg' : '#c6f1e7',
        'titleI' : '0',
        'city' : '我的',
        'province' : 'COLLECTION',
        'topleft_btn' : 'bi'
    },
    {
        'backg' : '',
        'titleI' : '0',
        'city' : '了解更多',
        'province' : 'WORLD',
        'topleft_btn' : 'kongbai'
    },
    {
        'backg' : '',
        'titleI' : '0',
        'city' : '设置',
        'province' : 'SETTING',
        'topleft_btn' : 'kongbai'
    },
];