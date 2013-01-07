$(document).ready(function () {
        var now = new Date();
        $('#time_picker').mobiscroll().datetime({
            minDate:new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            theme: 'default',
            display: 'modal',
            animate: 'slidehorizontal',
            mode: 'mixed'
        });
        $('#show_picker').click(function () {
            $('#time_picker').mobiscroll('show');
            return false;
        });
        $('#clear').click(function () {
            $('#time_picker').val('');
            return false;
        });
    }
);

var postList=[{time:"2013/01/23 12:21:6", status:"publishing or published or failed", text:"微博内容"},{}]
