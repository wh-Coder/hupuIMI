<template>
  <div id="newsContent">
    <div class="titleBox">
      <div class="title">{{news.title}}</div>
      <div class="info">{{news.addtime}}<span>{{news.origin}}</span></div>
    </div>
    <div class="contentBox">
      <img class="image" :src="news.img_m">
      <div v-html="news.content"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'newsContent',
    data() {
      return {};
    },
    props: {
      news: {type: Object}
    },
    components: {},
    mounted() {

    },
    methods: {
      fn() {

      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/theme.styl"

  #newsContent
    border-bottom 0.01rem solid hpLine
  .titleBox
      padding 0.20rem
      border-bottom 0.01rem solid hpLine
      .title
        font-size 0.42rem
        line-height 0.50rem
        font-weight 800
      .info
        margin-top 0.16rem
        font-size 0.30rem
        color hpGray
        span
          padding-left 0.20rem
          color hpBlue
    .contentBox
      padding 0.20rem
      font-size 0.36rem
      line-height 1.5
      .image
        width 100%
</style>
