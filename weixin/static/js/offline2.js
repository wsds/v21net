
$(document).ready(function () {

    $("#test").click(function () {
             loadTest();
        }
    );
});

function loadTest() {
    $("#btupload").click(function () {
            alert("btupload");
            var file = $("#input_image")[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                alert("reader.onload");
                var urlData = this.result;
                $.ajax({
                    data:{filename:"1.png",image:urlData, weibo_user:settings.ownedWeibo.currentWeibo},
                    success:function (data) {
                        alert(data);
                    },
                    type:'POST',
                    url:("http://www.weibo.com/upload2/")
                });
            };
        }
    );
}
