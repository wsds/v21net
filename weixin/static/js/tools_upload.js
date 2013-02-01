$(document).ready(function () {

    $('#upload_image').click(function () {

        alert("he");
        uploadPic();

        return false;
    });
    $('#addPicButton').click(function () {

//        alert("testButton");
        $("#input_image").trigger("click");
    });

    $("#input_image").change(function () {
        var myFiles = this.files;
//        alert("input_image change");
        for (var i = 0, f; f = myFiles[i]; i++) {
            var imageReader = new FileReader();
            imageReader.onload = (function (aFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML = ['<a class="images_a"  href="javascript:" ><img class="images" src="', e.target.result, '" title="', aFile.name, '"/></a>'].join('');
//                    document.getElementById('thumbs').insertBefore(span, null);
                    $("#thumbs").empty();
                    $("#thumbs").append(span);
                    if(postlist.pid="none"){
                        postlist.pid="uploading";
                    }
                    $('.images_a', $(span)).click(function () {
                        if ($(this).hasClass("drop")) {
                            $(this).removeClass("drop");
                            $(".images_close", $(this)).remove()
                        }
                        else {
                            $(this).addClass("drop");
                            $(this).append('<a class="images_close_a" href="javascript:"><img class="images_close"  src="/static/images/close_small.png"></a>')
                            $('.images_close_a', $(this)).click(function () {
                                    $(span).remove();
                                }
                            );
                        }
//                        alert("images_a");
                    });
//                    alert(span);
                };
            })(f);
            imageReader.readAsDataURL(f);
            break;
        }
    });
});
