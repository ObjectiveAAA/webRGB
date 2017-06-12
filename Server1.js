'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');


var net = require('net');


var data_changed=false;
var data_color=234567;

var HOST = '162.243.128.32';
var PORT = 6969;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function(sock) {

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        setInterval(function() {

            while (data_changed) {
                data_changed = false;
                sock.write(data_color);

            }
        }, 500);





        // 回发该数据，客户端将收到来自服务端的数据
        sock.write('You said "' + data + '"');
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);
























//============================================================

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);


var server = http.createServer(function(request, response) {



        var pathname = url.parse(request.url).pathname;

        if (pathname == '/color') {


            var elem = url.parse(request.url).query;
            console.log(elem);
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    		response.end();
            
            if(elem!=data_color)
            {
            	data_changed=true;
            	data_color=elem;
            }



        } else {

            var filepath = path.join(root, pathname);

            fs.stat(filepath, function(err, stats) {
                if (!err && stats.isFile()) {

                    console.log('200 ' + request.url);

                    response.writeHead(200);

                    fs.createReadStream(filepath).pipe(response);
                } else {

                    console.log('404 ' + request.url);

                    response.writeHead(404);
                    response.end('404 Not Found');
                }
            });
        }

    }

);
server.listen(8080);

console.log('Server is running');
