<template>
  <div id="bottomBar">
    <div class="bottom-bar">
      <div class="bar-left">
        <!--<icon name="updown" scale="2" class="updown"></icon>-->
        <img src="../svg/updown.png" class="updown"/>
        <span class="recommend-num">{{recommend > 0 ? recommend : '推荐'}}</span>
      </div>
      <div class="bar-center">
        <span v-if="page === 1" style="color: #cccccc">上页</span>
        <span v-if="page !== 1" @click="gotoPage(page - 1)">上页</span>
        <span @click="togglePicker">{{page}}/{{allPage}}</span>
        <span v-if="page === allPage" style="color: #cccccc" >下页</span>
        <span v-if="page !== allPage" @click="gotoPage(page + 1)">下页</span>
      </div>
      <div class="bar-right">
        <!--<icon name="write" scale="2.5" style="padding: 0.08rem"></icon>-->
        <img src="../svg/write.png" style="padding: 0.08rem" alt=""/>
      </div>
    </div>
    <div v-show="isShowPicker" class="mask" @click="togglePicker"></div>
    <div v-show="isShowPicker" class="picker-box">
      <div class="title">
        <span class="cancel" @click="togglePicker">取消</span>
        <span v-if="page === 1" style="color: #cccccc">首页</span>
        <span v-if="page !== 1" @click="gotoPage(1)">首页</span>
        <span>{{page}}/{{allPage}}</span>
        <span v-if="page === allPage" style="color: #cccccc">末页</span>
        <span v-if="page !== allPage" @click="gotoPage(allPage)">末页</span>
        <span class="confirm" @click="gotoPage(page)">确定</span>
      </div>
      <picker :data='pageList' v-model='pageItem' @on-change="change"></picker>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Picker} from 'vux'

  export default {
    name: 'bottomBar',
    data() {
      return {
        page: this.currentPage,
        isShowPicker: false,
      };
    },
    props: {
      currentPage: {type: Number},
      allPage: {type: Number},
      recommend: {type: Number}
    },
    computed: {
      pageItem() {
        return ['第' + this.page + '页']
      },
      pageList() {
        let pageList = [[]]
        for (let i = 1; i <= this.allPage; i++) {
          pageList[0].push('第' + i + '页')
        }
        return pageList
      },
      pageItem() {
        return ['第' + this.page + '页']
      }
    },
    components: {Picker},
    methods: {
      change(value) {
        this.page = Number(value[0].replace(/[^\d]/g, ''))
      },
      gotoPage(value) {
        this.page = value;
//        this.$emit('gotoPage',value)
        this.isShowPicker = false;
        window.postMessage('page' + value);
      },
      togglePicker() {
        this.isShowPicker = !this.isShowPicker
      },
    },
    filters: {
      getNumber(value){
        if (!value) return ''
        value = value.replace(/[^\d]/g, '')
        return value
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/theme.styl"

  .bottom-bar
    box-sizing: border-box;
    position fixed
    height 0.80rem
    width 100%
    bottom -0.02rem
    left 0
    background-color #ffffff
    border 0.01rem solid hpLine
    font-size 0.28rem
    .bar-left
      position absolute
      top 0
      left 0.20rem
      .updown
        color: hpGray
        vertical-align middle
      .recommend-num
        display inline-block
        color hpGray
        margin-left -0.10rem
        vertical-align middle
    .bar-right
      position absolute
      top 0
      right 0.20rem
    .bar-center
      width 50%
      margin-left 25%
      height 100%
      display flex
      justify-content space-between
      align-items center
      color hpBlue
  .picker-box
    z-index 101
    background-color #ffffff
    width 100%
    position fixed
    bottom 0
    left 0
    font-size 0.28rem
    .title
      height: 0.48rem
      background-color #ffffff
      border 0.01rem solid hpLine
      padding 0.20rem
      display flex
      justify-content space-between
      align-items center
      color hpBlue
      .cancel
        font-size 0.32rem
        color hpGray
      .confirm
        font-size 0.32rem
        color #000000
  .mask
    z-index 100
    position fixed
    top 0
    left 0
    width: 100%
    height: 100%
    background-color rgba(0, 0, 0, 0.6)
</style>
