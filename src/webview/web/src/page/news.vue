<template>
  <div id="app">
    <news-content :news="news"></news-content>
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
    <div class="all">
      <reply v-for="reply in allReply" :reply="reply" :key="reply.create_time"></reply>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import NewsContent from '../components/newsContent'
  import Sticky from '../components/sticky'
  import Reply from '../components/reply'

  //  import newsData from '../data/news'

  export default {
    name: 'news',
    data() {
      return {
        news: {},
        allReply: [],
        lightReply: []
      };
    },
    props: {},
    components: {NewsContent, Sticky, Reply},
    mounted() {
      let that = this
//      if(newsData){
//        that.news = newsData.res.result.offline_data.data.news
//      }else{
      document.addEventListener('message', function (e) {
        let data = JSON.parse(e.data)
        switch (data.type) {
          case 'news':
//            that.test = '234'
            that.news = data.res.result.offline_data.data.news;
            window.postMessage('newsOK');
            break;
          case 'reply':
            that.allReply = that.allReply.concat(data.res.data);
            that.lightReply = that.lightReply.concat(data.res.light_comments);
//            window.postMessage('log' + JSON.stringify(that.lightReply));
            break;
        }
      });
//      }

    },
    methods: {
      fn() {

      }
    }
  };
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
      border-bottom 0.01rem solid hpLine
      border-left 0.10rem solid hpRed
      padding-left 0.10rem
      font-size 0.32rem
      line-height 0.70rem
      color: hpRed

  /////////////////////////////
</style>
