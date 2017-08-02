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
//          window.postMessage('log'+JSON.stringify($content[0].offsetWidth));
          $content.find('img').forEach((ele) => {
            console.log(ele.dataset.w)
            console.log($content)
            console.log($content[0].clientWidth)
            let width = ele.dataset.w > ($content[0].clientWidth - 20 ) ? ($content[0].clientWidth - 20) : ele.dataset.w
            ele.style.width = width + 'px'
            ele.style.height = width / ele.dataset.w * ele.dataset.h + 'px'
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
      width 6.20rem
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
        width 100%
        overflow hidden
    .light
      position absolute
      top 0.20rem
      right 0.20rem
      color hpGray
      font-size 0.32rem
</style>
