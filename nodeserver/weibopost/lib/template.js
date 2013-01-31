/**
 * Date: 12-3-25
 * 说明: 预读客户端模板(服务器版)
 */

var fs = require('fs');

var template = {html:{} };

template.loadTemplate = function (localpath, html) {
    if (localpath == null) {
        localpath = './demo7lib/client_template/';
    }
    if (html == null) {
        html = this.html;
    }
    var files = fs.readdirSync(localpath);
    for (index in files) {//迭代文件夹里的所有文件
        var file = files[index];
        var filepath = localpath + '/' + file;
        var stat = fs.lstatSync(filepath);
        var key = file.split('.')[0];
        if (!stat.isDirectory()) {//如果不是文件夹，这读取文件内容，并监视文件变化
            html[key] = {};
            html[key].string = fs.readFileSync(filepath, encoding = 'utf8');//读取文件

            watchChange(key, html, filepath);

            function watchChange(wacthkey, wacthhtml, wacthfilepath) {//内部函数，监视文件变化。
                var watcher = fs.watch(wacthfilepath, function (curr, prev) {//文件发生变化的匿名回调函数
                    watcher.close();//关闭监视器
                    var success = false;
                    var i = 1;
                    while (success == false) {//重新读取文件，多次读取直到成功
                        try {
                            wacthhtml[wacthkey].string = fs.readFileSync(wacthfilepath, encoding = 'utf8');
                            success = true;
                        }
                        catch (err) {
                            success = false;
                        }
                        i++;
                    }
                    console.log('模板已更新');
                    watchChange(wacthkey, wacthhtml, wacthfilepath);//异步递归调用，继续监视文件变化
                })
            }
        }
        else {//如果是文件夹
            var innerHtml = {};
            html[key] = innerHtml;
            this.loadTemplate(filepath, innerHtml)//递归调用，继续读取子文件夹文件。
        }
    }
};

module.exports = template;
