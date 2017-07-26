<template>
  <div>
    <div class="sticky" ref="sticky">
      <slot name="1"></slot>
    </div>
    <div class="stickyed" v-show="isSticky">
      <slot name="2"></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'sticky',
    data() {
      return {
        isSticky: false
      };
    },
    props: {
      lightReply: {type: Array}
    },
    components: {},
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll(e) {
        let $sticky = $(this.$refs.sticky)
//        console.log($sticky[0].offsetTop)
//        console.log(window.scrollY)
        if (window.scrollY >= $sticky[0].offsetTop) {
          this.isSticky = true
        } else {
          this.isSticky = false
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .sticky
    background-color #ffffff
    z-index 10
  .stickyed
    z-index 11
    width 100%
    background-color #ffffff
    position fixed
    left 0
    top 0
</style>
