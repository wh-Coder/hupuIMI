<template>
  <div id="thread">
    <div class="title">{{thread.title}}</div>
    <div class="info">
      <div class="left">{{thread.time}} 阅读 {{thread.hits}}</div>
      <a href="https://www.baidu.com" class="right">{{thread.forum.name}}</a>
    </div>
    <a href="https://www.baidu.com" class="userInfo">
      <!--<img class="userImg" :src="thread.userImg" />-->
      <img class="userImg" src="https://w1.hoopchina.com.cn/hybrid/resource/avatar/man.png" />
      <div class="username">{{thread.username}}</div>
    </a>
    <div class="content" v-html="thread.content" ref="content"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'n-zepto'
  export default {
    name: 'thread',
    data() {
      return {};
    },
    props: {
      thread: {type: Object}
    },
    components: {},
    mounted() {
      // 此处用定时轮询，直到有DOM处理
      let timer = setInterval(() => {
        let $content = $(this.$refs.content)
        if ($content.length){
          clearTimeout(timer)
//          console.log( '$content' )
//          console.log( $content )
          $content.find('img').forEach((ele) => {
            let width = ele.dataset.w > $content[0].offsetWidth ? $content[0].offsetWidth : ele.dataset.w
            ele.width = width - 10
            ele.height = width / ele.dataset.w * ele.dataset.h
            ele.style.backgroundColor = '#ddd'
          })
        }
      },200)
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/theme.styl"

  #thread
    padding 0.20rem
    border-bottom 0.01rem solid hpLine
    .title
      font-size 0.40rem
      line-height 1.6
      font-weight 600
    .info
      font-size 0.28rem
      display flex
      flex-direction row
      justify-content space-between
      padding-top 0.26rem
      padding-bottom 0.32rem
      border-bottom 0.01rem solid #eee
      .left
        color: hpGray
      .right
        color: hpBlue
    .userInfo
      display block
      padding-top 0.20rem
      padding-bottom 0.20rem
      .userImg
        vertical-align middle
        display inline-block
        margin 0.10rem
        width: 0.60rem
        height 0.60rem
        border-radius 0.30rem
        background-color hpBgGray
      .username
        vertical-align middle
        display inline-block
        padding-left 0.10rem
        font-size 0.32rem
        color #000000
    .content
      font-size 0.36rem
      line-height 1.6
</style>


















