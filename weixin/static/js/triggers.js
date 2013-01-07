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

        $(".normalTitle .account").click(function () {
                if($(this).hasClass("drop")){
                    $(this).removeClass("drop");
                    $(".afterlogin",$(this)).addClass("hide");
                }
                else{
                    $(this).addClass("drop");
                    $(".afterlogin",$(this)).removeClass("hide");
                }
            }
        );
	$(".normalTitle h2").click(function () {
                $(".nav").slideToggle("fast");
            }
        );
    }
);