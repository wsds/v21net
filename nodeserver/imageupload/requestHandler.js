function start(response,postData) {
    console.log("Request handler 'start' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<canvas id="mycanvas" width=500 height=500 border=3 solid=#9C9898></canvas>'+'<script src="http://common.cnblogs.com/script/jquery.js" type="text/javascript"></script>'+'</body>'
        +'<script type="text/javascript">window.onload = function(){var canvas=document.getElementById("mycanvas");var context = canvas.getContext("2d");context.beginPath();context.moveTo(100, 150);context.lineTo(450, 50);context.lineWidth = 10;context.strokeStyle ="#ff0000";context.stroke();$.ajax({url: "/upload",data:canvas.toDataURL("image/png"),type: "post",success: function( result ) {console.log( result );}});};</script>'+

        '</html>';
    response.write(body);
    response.end();
}

function upload(response,postDataObject) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    var fs = require('fs');
    var postData=postDataObject.image;
    if(postData==null){
        response.write("hello");
        response.end();
        return;
    }
    var base64Data = postData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    console.log("Request handler 'upload' was called.");
    fs.writeFile("out.png", dataBuffer, function(err) {
    });
    response.write("hello");
    response.end();
}
var handle=[];
handle['/start']=start;
handle['/upload2/']=upload;
handle['/']=start;
exports.handle=handle;