<template>
    <div class="main-page">
        <h1>get请求 flv流直播</h1>
         <div class="demo-lis" id="demo-wrap">
         </div>
    </div>
</template>
<script>
import config from '../../../../server/config.json'
import flvjs from 'flv.js'
export default {
    data () {
        return {
            player:{},
            lists:config.ipLists,
        }
    },
    methods: {
        loadLists(){
            let wrap = document.getElementById('demo-wrap')
            if (this.lists && this.lists.length) {
            for (let i = 0; i < this.lists.length; i++) {
                let dom = `<div class="demo-item"><video class="demo-vdo" id="vdo-box-${i}" muted autoplay></video></div>`
                wrap.innerHTML += dom
                let url = `http://${config.ip}:${config.port}/live/get/${i}`
                setTimeout(() => {
                    this.loadFlv(i, url)
                }, 1000 * (i + 1));
            }
            }
        },
        loadFlv(index, url) {
            if (flvjs.isSupported()) {
                let video = document.getElementById('vdo-box-' + index)
                if (video) {
                    this.player['p' + index] = flvjs.createPlayer({
                        type: "flv",
                        isLive: true,
                        url: url,
                        hasAudio: false,
                    },{
                        enableStashBuffer:false, // 启用缓存
                        autoCleanupSourceBuffer:true, // 自动清理缓存
                        stashInitialSize:128,
                        lazyLoad:false, //懒加载
                        isLive: true,
                        lazyLoadMaxDuration: 0,
                        lazyLoadRecoverDuration: 0,
                        deferLoadAfterSourceOpen: false,
                        fixAudioTimestampGap: false,
                    });
                    this.player['p' + index].attachMediaElement(video);
                    try {
                        this.player['p' + index].load();
                    } catch (error) {
                        console.log(error);
                    };
                    setInterval(() => {
                            if (!video.buffered.length) {
                                return;
                            }
                            let end = video.buffered.end(0);
                            let diff = end - video.currentTime;
                            if (diff >= 0.5) {
                                video.currentTime = end - 0.1 ;
                            }
                        },  1000);

                }
            }
        }
    },
    mounted() {
        this.loadLists()
    }
}
</script>
<style lang="postcss" >
.demo-lis {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.demo-item {
    flex-grow: 1;
    padding: 10px;
}
.demo-vdo {
    width: 100%;
    max-width: 880px;
}
</style>