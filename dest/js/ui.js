//表格头部固定
function table_fixed_head() {
    var table_box = $(".table-fixedHead-box");
    table_box.each(function() {

        var table_body = $(this).find(".table-fixed-head_table-body");
        var thead = table_body.find("thead");
        var fixed_head = table_body.prev(".table-fixed-head_table-head");

        //将头部克隆
        thead.clone().appendTo(fixed_head);

        //将原头部的th宽度传给固定头部的th

        var th = fixed_head.find("th");

        var table_width = table_body.find('table').width();

        thead.find("th").each(function(i) {
            var w = $(this).width();
            th.eq(i).width(w);
        });

        fixed_head.width(table_width);
        table_body.width(table_width);

    });
}
//表格列固定
function table_fixed_col() {
    var table_body_tr = $(".table-fixedCol-box_auto").find("tr");
    var table_fixed_tr = $(".table-fixedCol-box_col").find("tr");
    table_body_tr.each(function(i) {
        var body_h = $(this).height();
        var fixed_h = table_fixed_tr.eq(i).height();
        if (body_h > fixed_h) {
            table_fixed_tr.eq(i).height($(this).height());
        } else {
            $(this).height(table_fixed_tr.eq(i).height());
        }
        // table_fixed_tr.eq(i).height($(this).height());
    });
    $(".table-fixedCol-box_auto tbody").find('tr').mouseenter(function() {
        var n = $(this).index();
        table_fixed_tr.eq(n + 1).addClass("hover_in");
    });
    $(".table-fixedCol-box_auto tbody").find('tr').mouseleave(function() {
        var n = $(this).index();
        table_fixed_tr.eq(n + 1).removeClass("hover_in");
    });

    $(".table-fixedCol-box_col tbody").find('tr').mouseenter(function() {
        var n = $(this).index();
        table_body_tr.eq(n + 1).addClass("hover_in");
    });

    $(".table-fixedCol-box_col tbody").find('tr').mouseleave(function() {
        var n = $(this).index();
        table_body_tr.eq(n + 1).removeClass("hover_in");
    });
}


//loading的开始函数和结束函数

function loading_start() {
    $('.loading-indicator').fadeIn(200);
}

function loading_end() {
    $('.loading-indicator').fadeOut(200);
}

function toast() {
    $(".toast").show(0, function() {
        toast_in.play({
            targets: $(".toast").get(0),

        });
    })
}

//原生进度增强
function range_module() {
    var range = $(".range-module").find("input");

    range.each(function() {
        var max = $(this).attr("max");
        var min = $(this).attr("min")
        var n = $(this).val();
        var w = ((n - min) / (max - min)) * 100 + '%';
        var track = $(this).siblings(".range-module_track");
        track.find(".range-module_track_progress_pop").text(n);
        track.find(".range-module_track_progress").width(w);
    });


    range.bind("mousemove change", function() {
        var max = $(this).attr("max");
        var min = $(this).attr("min");
        var n = $(this).val();
        var w = ((n - min) / (max - min)) * 100 + '%';
        var track = $(this).siblings(".range-module_track");
        track.find(".range-module_track_progress_pop").text(n);
        track.find(".range-module_track_progress").width(w);
    });
}

//下拉多级
function dropdown_multi() {
    var has_sub = $(".dropdown_has-sub");
    has_sub.click(function() {
        $(this).parent().hide();
        $(this).parent().next().show();
    });
    var dropdown_menu_back = $(".dropdown_menu_back");
    dropdown_menu_back.click(function() {
        $(this).parent().hide().prev().show();
    })
}

//下拉菜单
function dropdown() {
    var dropdown_btn = $(".dropdown_btn");
    var dropdown_hover = $(".dropdown-hover");
    var dropdown_hover_btn = dropdown_hover.find(".dropdown_btn");


    dropdown_btn.hover(function() {
        var btn_width = $(this).outerWidth();
        var btn_height = $(this).outerHeight();
        var menu_width = $(this).next(".dropdown_menu").width();
        var menu_height = $(this).next(".dropdown_menu").height();
        var btn_left = $(this).offset().left - $(window).scrollLeft();
        var btn_top = $(this).offset().top - $(window).scrollTop();
        var btn_right = $(window).width() - btn_left - btn_width;
        var btn_bottom = $(window).height() - btn_top - btn_height;
        if ((menu_width - btn_width) > btn_right) {
            $(this).parent().addClass("dropdown-left");
        } else {
            $(this).parent().removeClass("dropdown-left");
        };
        if (menu_height > btn_bottom) {
            $(this).parent().addClass("dropdown-top");
        } else {
            $(this).parent().removeClass("dropdown-top");
        };

    });

    dropdown_btn.click(function(event) {
        $(".dropdown_menu").hide();
        $(".dropdown").removeClass("open");

        $(this).parent().toggleClass("open");
        $(this).next(".dropdown_menu").show();
        $(this).find('input').focus();
        event.stopPropagation(); // 阻止事件冒泡
    });

    $(".dropdown_menu").find('label').click(function(event) {
        event.stopPropagation(); // 阻止事件冒泡
    });

    $(".dropdown_menu_search").click(function(event) {
        event.stopPropagation(); // 阻止事件冒泡
    });

    $(window).click(function(event) {
        $(".dropdown_menu").hide();
        $(".dropdown").removeClass("open")
    })


    dropdown_hover_btn.mouseenter(function() {
        $(this).parent().addClass("open");
        $(this).next(".dropdown_menu").show();
    });
    dropdown_hover.mouseleave(
        function() {
            $(this).removeClass("open");
            $(this).find(".dropdown_btn").next(".dropdown_menu").hide();
        })
}

//滚动组织冒泡
// function scrollLock() {
//     var $scrollLock_item = $(".scrollLock");
//     $scrollLock_item.mouseenter(
//         function() {
//             var $h = $(this).innerHeight(),
//                 $scroll_h = $(this).prop('scrollHeight');
//             if ($scroll_h > $h) {
//                 $(":root").css("overflow-y", "hidden");
//             }
//         });
//     $scrollLock_item.mouseleave(function() {
//         $(":root").css("overflow-y", "auto");
//     })

// }

$.fn.scrollLock = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0 ? 0 : scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }
        });
    });
};

$(".scrollLock").scrollLock();


//气泡插件
$(document).ready(function() {
    $('.tooltip-click').tooltipster({
        // theme:'kf5-tooltip',
        contentAsHTML: true,
        interactive: true,
        maxWidth: 360,
        trigger: 'click',
    });
    $('.tooltip-hover').tooltipster({
        // theme:'kf5-tooltip',
        contentAsHTML: true,
        interactive: true,
        maxWidth: 360,
        trigger: 'hover',
    });
    $('.tooltip-tools-click').tooltipster({
        theme: 'tooltip-tools',
        contentAsHTML: true,
        interactive: true,
        maxWidth: 360,
        trigger: 'click',
    });
    $('.tooltip-tools-hover').tooltipster({
        theme: 'tooltip-tools',
        contentAsHTML: true,
        interactive: true,
        maxWidth: 360,
        trigger: 'hover',
    });
    $('.tooltip-ticket-hover').tooltipster({
        theme: 'tooltip-ticket',
        contentAsHTML: true,
        interactive: true,
        maxWidth: 360,
        trigger: 'hover',
    });
});


$(document).ready(function() {
    range_module();
    table_fixed_head();
    table_fixed_col();
    dropdown_multi();
    dropdown();
});


//多级下拉
$(".nav-col_item_title").click(function() {
    $(this).parent("li").toggleClass("show");
    var item = $(this).siblings(".nav-col_item_body").children("li");
    list_left_fade_in.play({
        targets: item.get(),
    })

});

$(".nav-col_item_after").click(function(event) {
    event.stopPropagation();
})

//水波纹
$(function() {
    Waves.attach('.btn', ['']);
    Waves.attach('.sidebar_nav li', ['']);
    Waves.attach('.waves-light', ['']);
    Waves.attach('.waves-gray', ['']);
    Waves.attach('.btn-default', ['']);
    Waves.attach('.waves-visible', ['']);
    Waves.attach('.waves-green', ['']);
    Waves.attach('.waves-orange', ['']);
    Waves.attach('.waves-red', ['']);
    Waves.init();
});



//浏览器全屏
function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// 退出 全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
