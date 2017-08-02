<template>
  <div id="app">
    <div v-show="currentPage === 1">
      <thread-content :thread="thread"></thread-content>
      <sticky v-show="lightReply.length > 0">
        <div v-for="i in 2" :slot="i">
          <div class="title">这些回复亮了</div>
        </div>
      </sticky>
      <div class="light">
        <reply v-for="reply in lightReply" :reply="reply" :key="reply.create_time"></reply>
      </div>
      <sticky v-show="allReply.length > 0">
        <div v-for="i in 2" :slot="i">
          <div class="title">全部回复</div>
        </div>
      </sticky>
    </div>
    <div class="all">
      <reply v-for="reply in allReply" :reply="reply" :key="reply.create_time"></reply>
    </div>
    <div class="space"></div>
    <bottom-bar
      :currentPage="currentPage"
      :allPage="allPage"
      :recommend="thread.recommend_num">
    </bottom-bar>
  </div>
</template>

<script>
  import thread from '../data/thread'
  import reply from '../data/reply'
  import ThreadContent from '../components/threadContent'
  import Sticky from '../components/sticky'
  import Reply from '../components/reply'
  import BottomBar from '../components/bottomBar'

  import $ from 'n-zepto'
  export default {
    name: 'app',
    components: {
      ThreadContent, Sticky, Reply, BottomBar
    },
    mounted() {
      let that = this

//      that.thread = thread.res.offline_data.data;
//      that.allReply = reply.res.result.list;
//      that.allPage = reply.res.result.all_page;

      document.addEventListener('message', function (e) {
        let data = JSON.parse(e.data)
        switch (data.type) {
          case 'threads':
            that.thread = data.res.offline_data.data;
            window.postMessage('threadOK');
            break;
          case 'reply':
            that.allReply = data.res.result.list;
            that.allPage = data.res.result.all_page;
            that.currentPage = data.page
            // 回到顶部
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            break;
          case 'light':
            that.lightReply = data.res.list;
            break
        }
      });
    },
    methods: {
//      gotoPage(page){
//        console.log(page)
//        window.postMessage('page' + page);
//      }
    },
    data() {
      return {
//        test: '123',
        thread: {},
        lightReply: [],
        allReply: [],
        currentPage: 1,
        allPage: 1
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/theme.styl"

  #app
    height 100%
    position relative
    font-family "宋体", Tahoma, Geneva, sans-serif, "苹方", "Droid Sans Fallback", "微软雅黑"
    overflow hidden
    .title
      /*border-top 1px solid hpLine*/
      border-bottom 0.0.01rem solid hpLine
      border-left 0.10rem solid hpRed
      padding-left 0.10rem
      font-size 0.32rem
      line-height 0.70rem
      color: hpRed
    .space
      height 0.80rem
      width 100%
</style>
