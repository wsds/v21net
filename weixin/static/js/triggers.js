$(document).ready(function () {
        $("#slide_ctrls li a").click(function () {
                window.scrollTo(0,100);
                $("#slide_ctrls li a").removeClass("current");
                $(this).addClass("current");
                var index=$("#slide_ctrls li a").index($(this));
//                window.alert(index);
                $(".slide-content").removeClass("current");
                $($(".slide-content")[index]).addClass("current");
            }
        );

        $(".normalTitle #login").click(function () {
                if($(this).hasClass("drop")){
                    $(this).removeClass("drop");
                    $("#login_menu",$(this)).addClass("hide");
                }
                else{
                    $(this).addClass("drop");
                    $("#login_menu",$(this)).removeClass("hide");
                }
            }
        );
    }
);