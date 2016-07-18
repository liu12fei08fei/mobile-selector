/*
* @Author: liufeifei
* @Date:   2016-07-16 11:45:10
* @Last Modified by:   liufeifei
* @Last Modified time: 2016-07-18 17:58:19
* 总体说明：分为四种，第一种为单个选项选择，第二种为两个选项选择(两个选项之间独立存在)，第三种为年月日选择，第四种为年月日+小时分钟选择
*/

// 'use strict';
// ---------【数据部分开始】例子---------
// 体重范围，20-220(整数)，0-9(小数)
// 整数
// var quWeightInt = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220];
// 小数
// var quWeightFl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// ---------【数据部分结束】---------
// 选择器结构和样式封装
$('.sel-boxs').remove();
$('body').append('<style>'+
                '.sel-boxs{display:none;}'+
                '.sel-boxs .bg{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:998;}'+
                '.sel-box{position:fixed;bottom:0;left:0;right:0;z-index:999;}'+
                '.sel-box .btn{background:#fda626;overflow:hidden;}'+
                '.sel-box .btn1{overflow:hidden;width:22px;height:22px;float:left;padding:11px 12px;}'+
                '.sel-box .btn1 img{float:left;width:100%;height:100%;}'+
                '.sel-box .ok{float:right;}'+
                '.sel-box .name{color:white;text-align:center;line-height:22px;font-size:18px;padding:11px 0;}'+
                '.sel-con{background:white;}'+
                '.sel-con .border{height:34px;border:solid 1px #fda626;border-width:1px 0;position:fixed;bottom:72px;left:0;right:0;pointer-events:none;}'+
                '.sel-con .table{display:table;width:100%;table-layout:fixed;}'+
                '.sel-con .cell{display:table-cell;vertical-align:middle;text-align:center;overflow:hidden;}'+
                '.sel-con .scroll{height:180px;overflow:auto;box-sizing:border-box;padding:72px 0;width:110%;padding-right:10%;}'+
                '.sel-con .ele{font-size:16px;color:#b2b2b2;height:36px;line-height:36px;}'+
                '</style>'+
                '<div class="sel-boxs">'+
                '   <div class="bg"></div>'+
                '   <div class="sel-box">'+
                '       <div class="btn">'+
                '           <div class="btn1 ok"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAAK3RSTlMAR/fu0fuGIwupFQcC8uPXxr+6j1lR2k2yl5VfhFNEMGTn37CfP8ikenEcAN6KmwAAAcRJREFUOMullYmSgjAQRCEEERBQPMBrvfd6//9/C4sGYoJb1E6VZRjacY5Oj/NkY3d0yTwhvOwycsfOK3NDQcdE6PZCl7LBeHI6lV5zlksrNMipLJ0XUfMcFfO09uSBiV0kwMyddH0TdwYki2fsDli9mTHeVsBO922AdWzLLl7Xr7qeEfjbvrq3Pow6+VbYpdPfpQqt8g4SOL5q/xGSR09ylVRrRkn5/V9gFb8Gxyto8pTQM9VDuH/wAOT9e9YT70z6OM+aiGFv4E+4OG3osOKkIJ1YsVGCH6jJp4hx/ZO5PfBVezMHtx5eYa8OTh32F/UYS4is4Kk+qQhKJ8OzYhfwrtXikVUfacOOU7hpHllFFUxt4B18PKclesCBQHwbYC2NQ/l1P4XwqdwqDa3AK6x/i7rBWbWtLVBrXeFDGFfjktBQSG+dPpRCQD52ji239KHo474l8B6c8A+trx33M5EOJxD6zWmJZFA0OAOeKkOjqEn+7wy+1JNOfvNaRR/X2BAmkEMu7F5JweZvKeiIzPYVdluLzBD5Gi6MreRu7JL7q8bDxHz4mjAXkPtYQK5aQDbb21bb/t9Ls13HZeb5vpeV5jr+ARdfPT/feckoAAAAAElFTkSuQmCC" alt="确定"></div>'+
                '           <div class="btn1 cancel"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMAR3Vx7fjY0vyWhlIK8r+7qVkVB+MixrJgTRqRjoQk3Mewb2IQDOUsKwWQsecAAAGYSURBVDjLlZWJbsIwDECd0YvSUsZNYWzj2Pb+/wcXpUDamkN5EkKVn1IncW3pUZj8O4niOEq+c1PIM8wkpkU8MQ/VUYojSr++0ghHOrqrLiosP9vNVBzTzXaOpVpo970ExqaX1hgo3/vuB5B41esJ8CEdhsBwJneYuZC0yCFbywPWGeStfK07koeMrH3Le1HCUZ5whPJ6JlUvKc0QqstbIJk9l2cJNHmmYOQFBtLL/9jXUd1W/vzTuFlx0lq4+MwO3n2jrFtLT2w8Zn4L1xkMvAu/t9CcuBADO7kxwNreffORLRjJYSPKVq5sIJcVTEXZypUprCQhElG2ckUiEvtLRdvalZRIYpaibe3KkljLTb4M7sk2De06W6ehN+j25napNuiOTrn+vDtH5y5Fu9p2l6Kv27radtfdLaSFd52d1Z1C6pboKWqf7yH7LNol2i/+U6dX1UWn+EM+q6APNqgV+CazfuauodyHtK+QxhjYcsObefiYsOwrLPOduQ4gs2sG0P7FaFsu1WgLHJqas8lXzThe5ebcC/4DShk9Lfj6+QIAAAAASUVORK5CYII=" alt="取消"></div>'+
                '           <div class="name">加载中...</div>'+
                '       </div>'+
                '       <div class="sel-con">'+
                '           <div class="border"></div>'+
                '           <div class="table"></div>'+
                '       </div>'+
                '   </div>'+
                '</div>');
// 封装说明：
// 基于jQuery
// 适合场景，只适用于单个值的选取模式
// scrEvent(ele,evEle,selName,defValue)
// 1.参数【ele】是选择器取值范围，类型为数组
// 2.参数【evEle】是要绑定元素的元素名称，如：class、id、element...
// 3.参数【selName】是选择器名称
// 4.参数【defValue】是选择器默认值
function dataFrame(ele){
    // ele数组转换成相应结构
    var eleText = '';
    for(var i=0;i<ele.length;i++){
        eleText += '<div class="ele">'+ele[i]+'</div>';
    };
    return '<div class="cell elem"><div class="scroll">'+eleText+'</div></div>';
};
function scrEvent(ele,evEle,selName,defValue){
    $(evEle).attr('readonly','readonly');
    // 点击对应input执行事件
    $(evEle).click(function(){
        $('.sel-con .table').html(dataFrame(ele));
        $('.sel-box .name').text(selName);
        $('.sel-boxs').show();
        // 默认值
        $(evEle).val()==""?defValue = defValue:defValue=$(evEle).val();
        $('.sel-con').find('.elem').eq(0).find('.ele').each(function(){
            if($(this).text()==defValue){
                $(this).parents('.scroll').scrollTop($(this).index()*36);
            }
        });
        // 选择器滚动获取值和确认赋值
        var scText = ele[0]; // 默认值为数组第一个值
        $('.sel-con .scroll').scroll(function(){
            var that = $(this);
            // 数值显示
            var scTop = $(this).scrollTop()+18;
            var scNum = Math.floor(scTop/36);
            scText = $(this).find('.ele').eq(scNum).text();
            // 停止锁定
            clearTimeout($(this).attr('timer'));
            $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
        });
        // 确认选择
        $('.sel-box .ok').click(function(){
            $(evEle).val(scText);
            $('.sel-boxs').hide();
        });
    });
};
// 封装说明：
// 基于jQuery
// 适合场景，只适用于两个值的选取模式
// scrEvent2(ele,evEle,selName,defValue,ele2)
// 1.参数【ele】是选择器取值范围，类型为数组
// 2.参数【evEle】是要绑定元素的元素名称，如：class、id、element...
// 3.参数【selName】是选择器名称
// 4.参数【defValue】是选择器第一个取值默认值
// 5.参数【ele2】是选择器取值范围第二个值，类型为数组
// 6.参数【defValue2】是选择器第二个取值默认值
// 7.参数【linkType】是第一个值和第二个值中间链接符号
// 8.参数【eleName】是选择器第一个值的名称，不需要应设置成空【''】
// 9.参数【eleName2】是选择器第二个值的名称，不需要应设置成空【''】
function scrEvent2(ele,evEle,selName,defValue,ele2,defValue2,linkType,eleName,eleName2){
    $(evEle).attr('readonly','readonly');
    eleName!=''?eleName = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName+'</div>':eleName = '';
    eleName2!=''?eleName2 = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName2+'</div>':eleName2 = '';
    // 点击对应input执行事件
    $(evEle).click(function(){
        $('.sel-con .table').html(dataFrame(ele)+eleName+dataFrame(ele2)+eleName2);
        $('.sel-box .name').text(selName);
        $('.sel-boxs').show();
        // 第一个值默认值
        $(evEle).val()==""?defValue = defValue:defValue=$(evEle).val().split(linkType)[0];
        $(evEle).val()==""?defValue2 = defValue2:defValue2=$(evEle).val().split(linkType)[1];
        $('.sel-con').find('.elem').eq(0).find('.ele').each(function(){
            if($(this).text()==defValue){
                $(this).parents('.scroll').scrollTop($(this).index()*36);
            }
        });
        // 第二个值默认值
        $('.sel-con').find('.elem').eq(1).find('.ele').each(function(){
            if($(this).text()==defValue2){
                $(this).parents('.scroll').scrollTop($(this).index()*36);
            }
        });
        // 选择器滚动获取值和确认赋值
        var scText = ele[0]; // 默认值为数组第一个值
        var scText2 = ele2[0]; // 默认值为数组第二个值
        $('.sel-con .scroll').scroll(function(){
            var that = $(this);
            // 数值显示
            var scTop = $(this).scrollTop()+18;
            var scNum = Math.floor(scTop/36);
            if($(this).parents('.elem').index()==0){
                scText = $(this).find('.ele').eq(scNum).text();
            }else{
                scText2 = $(this).find('.ele').eq(scNum).text();
            };
            // 停止锁定
            clearTimeout($(this).attr('timer'));
            $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
        });
        // 确认选择
        $('.sel-box .ok').click(function(){
            $(evEle).val(scText+linkType+scText2);
            $('.sel-boxs').hide();
        });
    });
};
// 选择器
// 封装说明：
// 基于jQuery
// 适合场景，适用于年 月 日选择
// dateSelector(evEle,year,month,day)
// 1.参数【evEle】是要绑定元素的元素名称，如：class、id、element...
// 2.参数【year】默认显示年，没有需设置为空
// 3.参数【month】默认显示月，没有需设置为空
// 4.参数【day】默认显示日，没有需设置为空
// 5.参数【timeBoo】true:使用年月日+时间 false:使用年月日
// 6.参数【hour】默认显示小时
// 7.参数【minute】默认显示分钟
// 每个月的天数
function getMonthDays(year,month){
    return new Date(year,month,0).getDate();
};
// 天数小于10天在前面加"0"
function twoZero(n){
    return n<10?n='0'+n:n=n+'';
};
// 天数转换成数组
function couDay(n){
    arrDay = [];
    for(var i=1;i<=n;i++){
        arrDay.push(twoZero(i));
    };
    return arrDay;
};
function dateSelector(evEle,year,month,day,linkType,timeBoo,hour,minute){
    $(evEle).attr('readonly','readonly');
    // 年 范围：当前年份 ~ 当前年份-99
    var hunYear = [];
    for(var i=0;i<100;i++){
        hunYear.push(new Date().getFullYear()-i)
    };
    // 月 范围：十二个月份
    var tweMonth = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    // 日 获取日期
    var arrDay = [];
    // 小时
    var timeHour = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    // 分钟
    var timeMinute = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
    // year month day空处理
    year==''?year=hunYear[0]:year=year;
    month==''?month=tweMonth[0]:month=month;
    day==''?day="01":day=day;
    hour==''||hour==undefined?hour=timeHour[0]:hour=hour;
    minute==''||minute==undefined?minute=timeMinute[0]:minute=minute;
    // 年月日选择器
    $(evEle).click(function(){
        var timeGroup = '';
        if(timeBoo){
            timeGroup=dataFrame(timeHour)+dataFrame(timeMinute);
        };
        $('.sel-con .table').html(dataFrame(hunYear)+dataFrame(tweMonth)+dataFrame(couDay(getMonthDays(hunYear[0],tweMonth[0])))+timeGroup);
        $('.sel-box .name').text("日期选择");
        $('.sel-boxs').show();
        // 选择器
        if($(evEle).val()!=''){
            year = $(evEle).val().split(linkType)[0]
            month = $(evEle).val().split(linkType)[1]
            day = $(evEle).val().split(linkType)[2]
            if(timeBoo){
                day = $(evEle).val().split(linkType)[2].split(' ')[0];
                hour = $(evEle).val().split(linkType)[2].split(' ')[1].split(':')[0];
                minute = $(evEle).val().split(linkType)[2].split(' ')[1].split(':')[1];
            };
        };
        var scText = year; // 年
        var scText2 = month; // 月
        var scText3 = day; // 日
        var scText4 = hour; // 小时
        var scText5 = minute; // 分钟
        $('.sel-con').find('.elem').eq(0).find('.ele').each(function(){
            if($(this).text()==year){
                $(this).parents('.scroll').scrollTop($(this).index()*36);
            }
        });
        $('.sel-con').find('.elem').eq(1).find('.ele').each(function(){
            if($(this).text()==month){
                $(this).parents('.scroll').scrollTop($(this).index()*36);
            }
        });
        $('.sel-con').find('.elem').eq(2).find('.ele').each(function(){
            if($(this).text()==day){
                $(this).parents('.scroll').scrollTop($(this).index()*36);
            }
        });
        if(timeBoo){
            $('.sel-con').find('.elem').eq(3).find('.ele').each(function(){
                if($(this).text()==hour){
                    $(this).parents('.scroll').scrollTop($(this).index()*36);
                }
            });
            $('.sel-con').find('.elem').eq(4).find('.ele').each(function(){
                if($(this).text()==minute){
                    $(this).parents('.scroll').scrollTop($(this).index()*36);
                }
            });
        };
        $('.sel-con .scroll').eq(0).scroll(function(){
            var that = $(this);
            // 数值显示
            var scTop = $(this).scrollTop()+18;
            var scNum = Math.floor(scTop/36);
            // 类型名称
            scText = $(this).find('.ele').eq(scNum).text();
            // 停止锁定
            clearTimeout($(this).attr('timer'));
            $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
            $('.sel-con .table').find('.elem').eq(2).remove();
            $('.sel-con .table').find('.elem').eq(1).after(dataFrame(couDay(getMonthDays(scText,scText2))));
            // 固定在原来的值
            $('.sel-con').find('.elem').eq(2).find('.ele').each(function(){
                if(Number($(this).text())<=Number(scText3)){
                    $(this).parents('.scroll').scrollTop($(this).index()*36);
                }
            });
            $('.sel-con .scroll').eq(2).scroll(function(){
                var that = $(this);
                // 数值显示
                var scTop = $(this).scrollTop()+18;
                var scNum = Math.floor(scTop/36);
                // 类型名称
                scText3 = $(this).find('.ele').eq(scNum).text();
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
            });
        });
        $('.sel-con .scroll').eq(1).scroll(function(){
            var that = $(this);
            // 数值显示
            var scTop = $(this).scrollTop()+18;
            var scNum = Math.floor(scTop/36);
            // 类型名称
            scText2 = $(this).find('.ele').eq(scNum).text();
            // 停止锁定
            clearTimeout($(this).attr('timer'));
            $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
            $('.sel-con .table').find('.elem').eq(2).remove();
            $('.sel-con .table').find('.elem').eq(1).after(dataFrame(couDay(getMonthDays(scText,scText2))));
            // 固定在原来的值
            $('.sel-con').find('.elem').eq(2).find('.ele').each(function(){
                if(Number($(this).text())<=Number(scText3)){
                    $(this).parents('.scroll').scrollTop($(this).index()*36);
                };
            });
            $('.sel-con .scroll').eq(2).scroll(function(){
                var that = $(this);
                // 数值显示
                var scTop = $(this).scrollTop()+18;
                var scNum = Math.floor(scTop/36);
                // 类型名称
                scText3 = $(this).find('.ele').eq(scNum).text();
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
            });
        });
        $('.sel-con .scroll').eq(2).scroll(function(){
            var that = $(this);
            // 数值显示
            var scTop = $(this).scrollTop()+18;
            var scNum = Math.floor(scTop/36);
            // 类型名称
            scText3 = $(this).find('.ele').eq(scNum).text();
            // 停止锁定
            clearTimeout($(this).attr('timer'));
            $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
        });
        var time = '';
        if(timeBoo){
            $('.sel-con .scroll').scroll(function(){
                var that = $(this);
                // 数值显示
                var scTop = $(this).scrollTop()+18;
                var scNum = Math.floor(scTop/36);
                // 类型名称
                if($(this).parents('.elem').index()==3){
                    scText4 = $(this).find('.ele').eq(scNum).text();
                }else if($(this).parents('.elem').index()==4){
                    scText5 = $(this).find('.ele').eq(scNum).text();
                };
                time = ' '+scText4+':'+scText5
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){that.scrollTop(scNum*36);},100));
            });
        };
        // 进行传值
        $('.sel-box .ok').click(function(){
            $(evEle).val(scText+linkType+scText2+linkType+scText3+time);
            $('.sel-boxs').hide();
        });
    });
};
// 取消选择
$('.sel-box .cancel,.sel-boxs .bg').click(function(){
    $('.sel-boxs').hide();
});