# rtsp html5 

## server

> 在机器A:192.168.1.11上安装server端

1. nodejs.org 下载 nodejs
2. 安装 nodejs，将 bin、lib、share 等目录下的文件拷贝至 /usr/bin 等对应目录
3. sudo npm install
4. sudo npm start
5. 开放防火墙 59001 端口


## player

> 在机器B:192.168.1.12上安装客户端

1. 安装 apache、nginx 等web服务器
2. 将 html5 目录下的文件拷贝至 /var/www/html/ 目录
3. 在机器C:192.168.1.13上打开浏览器，访问 http://192.168.1.12/player.html
