<template>
    <div class="reply">
      <img class="userImg" src="https://w1.hoopchina.com.cn/hybrid/resource/avatar/man.png" />
      <!--<img class="userImg" :src="reply.userImg" />-->
      <div class="info">
        <div v-if="reply.userName" class="username">{{reply.userName}}</div>
        <div v-if="reply.user_name" class="username">{{reply.user_name}}</div>
        <div v-if="reply.time" class="time">{{isNaN(reply.floor) ? '' : 20+reply.floor+'楼'}} {{reply.time}}</div>
        <div v-if="reply.format_time" class="time">{{reply.format_time}}</div>
        <div class="content" v-html="reply.content"  ref="content"></div>
      </div>
      <a class="light">亮了({{reply.light_count}})</a>
    </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'n-zepto'
  export default {
    name: 'reply',
    data() {
      return {};
    },
    props: {
      reply: {type: Object}
    },
    components: {},
    mounted() {
      // 此处用定时轮询，直到有DOM处理
      let timer = setInterval(() => {
        let $content = $(this.$refs.content)
        if ($content.length){
          clearTimeout(timer)
//          window.postMessage('log'+JSON.stringify($content));
//          console.log( '$content' )
//          console.log( $content )
          $content.find('img').forEach((ele) => {
            let width = ele.dataset.w > ($content[0].offsetWidth - 10 )? $content[0].offsetWidth : ele.dataset.w
            ele.width = width - 10
            ele.height = width / ele.dataset.w * ele.dataset.h
            ele.style.backgroundColor = '#ddd'
          })
        }
      },200)
    },
    methods: {
      fn() {

      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/theme.styl"
  .reply
    display flex
    padding 0.20rem
    position relative
    border-bottom 0.01rem solid hpLine
    .userImg
      display inline-block
      margin 0.10rem
      width 0.60rem
      height 0.60rem
      border-radius 0.30rem
      background-color hpGray
    .info
      flex 1
      margin-left 0.10rem
      .username
        color #000000
        font-size 0.30rem
        /*margin-top0. 5rem*/
        /*font-weight 300*/
      .time
        color hpGray
        font-size 0.26rem
        padding-top 0.24rem
        padding-bottom 0.16rem
      .content
        color #000000
        font-size 0.32rem
        line-height 1.6
    .light
      position absolute
      top 0.20rem
      right 0.20rem
      color hpGray
      font-size 0.32rem
</style>
