var express =  require("express");
const path = require('path')
const koaStatic = require('koa-static')
const config = require('./config.json')
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
function serverStart() {
  let app = express();
  app.get('/', (req, res) => {
    res.body="It's ok!!!";
  })
  app.get('/live/get/:id',handleGetRequest);
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  }) 
  app.use(express.static(path.join(process.cwd(), '/dist/contents/')));
  app.listen(config.port, config.host);
  console.log("express listened at:" + config.port )
}

function handleGetRequest (req, res) {
  console.log('get请求 -> ', req.params)
  const index = +(req.params && req.params.id) || 0
  var url = `rtsp://${config.account}:${config.password}@${config.ipLists[index]}/Streaming/Channels/1?transportmode=unicast`
  try {
    let common = ffmpeg(url)
        .setFfmpegPath(ffmpegPath)
        .addInputOption("-rtsp_transport", "tcp", "-buffer_size", "102400")  // 这里可以添加一些 RTSP 优化的参数
        .on("start", function () {
            console.log(url, "Stream started.");
        })
        .on("codecData", function () {
            console.log(url, "Stream codecData.")
         // 摄像机在线处理
        })
        .on("error", function (err) {
            console.log(url, "An error occured: ", err);
        })
        .on("end", function () {
            console.log(url, "Stream end!");
         // 摄像机断线的处理
        })
        let videoStream = common.outputFormat("flv").videoCodec("copy").noAudio();
        videoStream.pipe(res)
  } catch (error) {
      console.log(error);
  }
}

serverStart();


// function localServer() {
//   let app = express();
//   app.use(express.static(__dirname));
//   expressWebSocket(app, null, {
//       perMessageDeflate: true
//   });
//   app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     // res.header('Access-Control-Allow-Headers', 'Content-Type');
//     // res.header('Access-Control-Allow-Methods', '*');
//     // res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
//   });
//   app.get('/', (req, res) => {
//     res.end('ok')
//   })
//   app.get('/live/get/:id', handleGetRequest)
//   // app.ws("/live/ws/:id/", handleWsRequest)
//   app.listen(port, host);
//   console.log("express listened")
//   // handleRtmp(0)
// }