webpackJsonp([1],Array(40).concat([function(t,e){!function(t,e){var n=t.documentElement,r="orientationchange"in window?"orientationchange":"resize",i=function(){var t=n.clientWidth;t&&(n.style.fontSize=t/720*100+"px")};t.addEventListener&&(e.addEventListener(r,i,!1),t.addEventListener("DOMContentLoaded",i,!1))}(document,window)},,function(t,e,n){function r(t){n(100)}var i=n(1)(n(55),n(109),r,"data-v-2e30c0dd",null);t.exports=i.exports},,,,function(t,e,n){"use strict"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(41),i=n(42),s=n.n(i),a=n(40);n.n(a);r.a.config.productionTip=!1,new r.a({el:"#app",template:"<App/>",components:{App:s.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=["-moz-box-","-webkit-box-",""];e.default={name:"flexbox-item",props:{span:[Number,String],order:[Number,String]},beforeMount:function(){this.bodyWidth=document.documentElement.offsetWidth},methods:{buildWidth:function(t){return"number"==typeof t?t<1?t:t/12:"string"==typeof t?t.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var t={};if(t["horizontal"===this.$parent.orient?"marginLeft":"marginTop"]=this.$parent.gutter+"px",this.span)for(var e=0;e<r.length;e++)t[r[e]+"flex"]="0 0 "+100*this.buildWidth(this.span)+"%";return void 0!==this.order&&(t.order=this.order),t}},data:function(){return{bodyWidth:0}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"flexbox",props:{gutter:{type:Number,default:8},orient:{type:String,default:"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){return{"justify-content":this.justify,"-webkit-justify-content":this.justify,"align-items":this.align,"-webkit-align-items":this.align,"flex-wrap":this.wrap,"-webkit-flex-wrap":this.wrap,"flex-direction":this.direction,"-webkit-flex-direction":this.direction}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(15),i=n.n(r),s=n(67),a=n.n(s),o=n(59),c=n(56),l=n(58),u=n(61);e.default={name:"picker",components:{Flexbox:c.a,FlexboxItem:c.b},created:function(){if(0!==this.columns){var t=this.columns;this.store=new l.a(this.data,t,this.fixedColumns),this.currentData=this.store.getColumns(this.value)}},mounted:function(){var t=this;this.uuid=Math.random().toString(36).substring(3,8),this.$nextTick(function(){t.render(t.currentData,t.currentValue)})},props:{data:[Array],columns:{type:Number,default:0},fixedColumns:{type:Number,default:0},value:Array,itemClass:{type:String,default:"scroller-item"},columnWidth:Array},methods:{getNameValues:function(){return n.i(u.a)(this.currentValue,this.data)},getId:function(t){return"#vux-picker-"+this.uuid+"-"+t},render:function(t,e){this.count=this.currentData.length;var n=this;if(t&&t.length){var r=this.currentData.length;if(e.length<r)for(var i=0;i<r;i++)this.$set(n.currentValue,i,t[i][0].value||t[i][0]);for(var s=0;s<t.length;s++){var c=function(r){if(!document.querySelector(n.getId(r)))return{v:void 0};n.scroller[r]&&n.scroller[r].destroy(),n.scroller[r]=new o.a(n.getId(r),{data:t[r],defaultValue:e[r]||t[r][0].value,itemClass:n.item_class,onSelect:function(t){n.$set(n.currentValue,r,t),(!this.columns||this.columns&&n.getValue().length===n.store.count)&&n.$emit("on-change",n.getValue()),0!==n.columns&&n.renderChain(r+1)}}),n.currentValue&&n.scroller[r].select(e[r])}(s);if("object"===(void 0===c?"undefined":a()(c)))return c.v}}},renderChain:function(t){if(this.columns&&!(t>this.count-1)){var e=this,n=this.getId(t);this.scroller[t].destroy();var r=this.store.getChildren(e.getValue()[t-1]);this.scroller[t]=new o.a(n,{data:r,itemClass:e.item_class,onSelect:function(n){e.$set(e.currentValue,t,n),e.$emit("on-change",e.getValue()),e.renderChain(t+1)}}),this.$set(this.currentValue,t,r[0].value),this.renderChain(t+1)}},getValue:function(){for(var t=[],e=0;e<this.currentData.length;e++){if(!this.scroller[e])return[];t.push(this.scroller[e].value)}return t},emitValueChange:function(t){(!this.columns||this.columns&&t.length===this.store.count)&&this.$emit("on-change",t)}},data:function(){return{scroller:[],count:0,uuid:"",currentData:this.data,currentValue:this.value}},watch:{value:function(t){i()(t)!==i()(this.currentValue)&&(this.currentValue=t)},currentValue:function(t,e){if(this.$emit("input",t),0!==this.columns)t.length>0&&i()(t)!==i()(e)&&(this.currentData=this.store.getColumns(t),this.$nextTick(function(){this.render(this.currentData,t)}));else if(t.length)for(var n=0;n<t.length;n++)this.scroller[n]&&this.scroller[n].value!==t[n]&&this.scroller[n].select(t[n]);else this.render(this.currentData,[])},data:function(t){i()(t)!==i()(this.currentData)&&(this.currentData=t)},currentData:function(t){var e=this;if("[object Array]"===Object.prototype.toString.call(t[0]))this.$nextTick(function(){e.render(t,e.currentValue),e.$nextTick(function(){e.emitValueChange(e.getValue()),i()(e.getValue())!==i()(e.currentValue)&&(!e.columns||e.columns&&e.getValue().length===e.store.count)&&(e.currentValue=e.getValue())})});else if(0!==this.columns){if(!t.length)return;var n=this.columns;this.store=new l.a(t,n,this.fixedColumns),this.currentData=this.store.getColumns(this.currentValue)}}},beforeDestroy:function(){for(var t=0;t<this.count;t++)this.scroller[t]&&this.scroller[t].destroy(),this.scroller[t]=null}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(66),i=n.n(r),s=n(120),a=n.n(s);e.default={name:"bottomBar",data:function(){return{page:this.currentPage,isShowPicker:!1}},props:{currentPage:{type:Number},allPage:{type:Number},recommend:{type:Number}},computed:i()({pageItem:function(){return["第"+this.page+"页"]},pageList:function(){for(var t=[[]],e=1;e<=this.allPage;e++)t[0].push("第"+e+"页");return t}},"pageItem",function(){return["第"+this.page+"页"]}),components:{Picker:a.a},methods:{change:function(t){this.page=Number(t[0].replace(/[^\d]/g,""))},gotoPage:function(t){this.page=t,this.isShowPicker=!1,window.postMessage("page"+t)},togglePicker:function(){this.isShowPicker=!this.isShowPicker}},filters:{getNumber:function(t){return t?t=t.replace(/[^\d]/g,""):""}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(29),i=n.n(r);e.default={name:"reply",data:function(){return{}},props:{reply:{type:Object}},components:{},mounted:function(){var t=this,e=setInterval(function(){var n=i()(t.$refs.content);n.length&&(clearTimeout(e),n.find("img").forEach(function(t){var e=t.dataset.w>n[0].offsetWidth-10?n[0].offsetWidth:t.dataset.w;t.width=e-10,t.height=e/t.dataset.w*t.dataset.h,t.style.backgroundColor="#ddd"}))},200)},methods:{fn:function(){}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"sticky",data:function(){return{isSticky:!1}},props:{lightReply:{type:Array}},components:{},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(t){var e=$(this.$refs.sticky);window.scrollY>=e[0].offsetTop?this.isSticky=!0:this.isSticky=!1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(29),i=n.n(r);e.default={name:"thread",data:function(){return{}},props:{thread:{type:Object}},components:{},mounted:function(){var t=this,e=setInterval(function(){var n=i()(t.$refs.content);n.length&&(clearTimeout(e),n.find("img").forEach(function(t){var e=t.dataset.w>n[0].offsetWidth?n[0].offsetWidth:t.dataset.w;t.width=e-10,t.height=e/t.dataset.w*t.dataset.h,t.style.backgroundColor="#ddd"}))},200)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=(n(46),n(124)),i=n.n(r),s=n(123),a=n.n(s),o=n(122),c=n.n(o),l=n(121),u=n.n(l),d=n(29);n.n(d);e.default={name:"app",components:{ThreadContent:i.a,Sticky:a.a,Reply:c.a,BottomBar:u.a},mounted:function(){var t=this;document.addEventListener("message",function(e){var n=JSON.parse(e.data);switch(n.type){case"threads":t.thread=n.res.offline_data.data,window.postMessage("threadOK");break;case"reply":t.allReply=n.res.result.list,t.allPage=n.res.result.all_page,t.currentPage=n.page,document.documentElement.scrollTop=document.body.scrollTop=0;break;case"light":t.lightReply=n.res.list}})},methods:{},data:function(){return{thread:{},lightReply:[],allReply:[],currentPage:1,allPage:1}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAxElEQVRYR+3UUQ6DIBCE4d2TtUdZTkZ7UhoTfTHizgw2tgk+o//nQnC7+fGb+zYB/z2BWmu4+yMiinqW5Ams8bqGXypCAuzi289LCBrQicsICpDEJQQMAOM0AgKQcQqRAsQ4jDgFDMYhRBdwUTxFpFug3nDoe78LuHILWmvvUkocTeXrh/AsvoDSLRiZRBaHAMsiBYHEYQCLQOMUAEUwcRqQIdi4BOghlLgM2CPU+BBgQ5jZs3fJINdxeg8gHxlZMwFzAh9ubH0hwOedQgAAAABJRU5ErkJggg=="},function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABfUlEQVRYR82XgU3DQAxF7Q26AR2BEcoGMAH3JwAmoGxQJnA2ACagTEA2ICN0AyNXlyiNEi5pfKSVKlXKxe/15+I4TAt/eGE+XZaAiKyZ+YGIrh2TqVT1CcChr2aTgIismPmbiNaO8GMpVX0BsE0JbJj5s71IVb+cZAKAymqJiKVb1Ym0E2gEVPUDwK0TvCkjIgUz3xPRQVVvAJRDAnZw7ynQgp9cln8R6MLjvjj+yewCA3AAKEwkq0AKnlVgDDybwFh4FoEpcHeBqXBXgXPgbgIpuIhYl30jon0I4a7d4Gbfhil47P9bZn623yGEkxFglsAYeDaBsfAsAlPg7gL2PI+DS7OXVLXp7X1PUBHx2wNxbPupQSm4ewKx4IaI7FsCeE/NDa4JpGADl2AXh91xtyERFSEEnAPrnmOXzBoQM1+N7gOtIqXNbzNEbABdtc//qxHZwrI2nQEdPFVVXwE89rbiuLksLlvg+WJipS3FPYBd1+6yXs1yxJ6quXgCv7zuhzCnWdKrAAAAAElFTkSuQmCC"},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.currentPage,expression:"currentPage === 1"}]},[n("thread-content",{attrs:{thread:t.thread}}),t._v(" "),n("sticky",{directives:[{name:"show",rawName:"v-show",value:t.lightReply.length>0,expression:"lightReply.length > 0"}]},t._l(2,function(e){return n("div",{slot:e},[n("div",{staticClass:"title"},[t._v("这些回复亮了")])])})),t._v(" "),n("div",{staticClass:"light"},t._l(t.lightReply,function(t){return n("reply",{key:t.create_time,attrs:{reply:t}})})),t._v(" "),n("sticky",{directives:[{name:"show",rawName:"v-show",value:t.allReply.length>0,expression:"allReply.length > 0"}]},t._l(2,function(e){return n("div",{slot:e},[n("div",{staticClass:"title"},[t._v("全部回复")])])}))],1),t._v(" "),n("div",{staticClass:"all"},t._l(t.allReply,function(t){return n("reply",{key:t.create_time,attrs:{reply:t}})})),t._v(" "),n("div",{staticClass:"space"}),t._v(" "),n("bottom-bar",{attrs:{currentPage:t.currentPage,allPage:t.allPage,recommend:t.thread.recommend_num}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{ref:"sticky",staticClass:"sticky"},[t._t("1")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isSticky,expression:"isSticky"}],staticClass:"stickyed"},[t._t("2")],2)])},staticRenderFns:[]}},function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"bottomBar"}},[r("div",{staticClass:"bottom-bar"},[r("div",{staticClass:"bar-left"},[r("img",{staticClass:"updown",attrs:{src:n(107)}}),t._v(" "),r("span",{staticClass:"recommend-num"},[t._v(t._s(t.recommend>0?t.recommend:"推荐"))])]),t._v(" "),r("div",{staticClass:"bar-center"},[1===t.page?r("span",{staticStyle:{color:"#cccccc"}},[t._v("上页")]):t._e(),t._v(" "),1!==t.page?r("span",{on:{click:function(e){t.gotoPage(t.page-1)}}},[t._v("上页")]):t._e(),t._v(" "),r("span",{on:{click:t.togglePicker}},[t._v(t._s(t.page)+"/"+t._s(t.allPage))]),t._v(" "),t.page===t.allPage?r("span",{staticStyle:{color:"#cccccc"}},[t._v("下页")]):t._e(),t._v(" "),t.page!==t.allPage?r("span",{on:{click:function(e){t.gotoPage(t.page+1)}}},[t._v("下页")]):t._e()]),t._v(" "),t._m(0)]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowPicker,expression:"isShowPicker"}],staticClass:"mask",on:{click:t.togglePicker}}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowPicker,expression:"isShowPicker"}],staticClass:"picker-box"},[r("div",{staticClass:"title"},[r("span",{staticClass:"cancel",on:{click:t.togglePicker}},[t._v("取消")]),t._v(" "),1===t.page?r("span",{staticStyle:{color:"#cccccc"}},[t._v("首页")]):t._e(),t._v(" "),1!==t.page?r("span",{on:{click:function(e){t.gotoPage(1)}}},[t._v("首页")]):t._e(),t._v(" "),r("span",[t._v(t._s(t.page)+"/"+t._s(t.allPage))]),t._v(" "),t.page===t.allPage?r("span",{staticStyle:{color:"#cccccc"}},[t._v("末页")]):t._e(),t._v(" "),t.page!==t.allPage?r("span",{on:{click:function(e){t.gotoPage(t.allPage)}}},[t._v("末页")]):t._e(),t._v(" "),r("span",{staticClass:"confirm",on:{click:function(e){t.gotoPage(t.page)}}},[t._v("确定")])]),t._v(" "),r("picker",{attrs:{data:t.pageList},on:{"on-change":t.change},model:{value:t.pageItem,callback:function(e){t.pageItem=e},expression:"pageItem"}})],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bar-right"},[r("img",{staticStyle:{padding:"0.08rem"},attrs:{src:n(108),alt:""}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-picker"},[n("flexbox",{attrs:{gutter:0}},t._l(t.currentData,function(e,r){return n("flexbox-item",{key:r,staticStyle:{"margin-left":"0"},attrs:{span:t.columnWidth&&t.columnWidth[r]}},[n("div",{staticClass:"vux-picker-item",attrs:{id:"vux-picker-"+t.uuid+"-"+r}})])}))],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"vux-flexbox-item",style:t.style},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"reply"},[n("img",{staticClass:"userImg",attrs:{src:"https://w1.hoopchina.com.cn/hybrid/resource/avatar/man.png"}}),t._v(" "),n("div",{staticClass:"info"},[t.reply.userName?n("div",{staticClass:"username"},[t._v(t._s(t.reply.userName))]):t._e(),t._v(" "),t.reply.user_name?n("div",{staticClass:"username"},[t._v(t._s(t.reply.user_name))]):t._e(),t._v(" "),t.reply.time?n("div",{staticClass:"time"},[t._v(t._s(isNaN(t.reply.floor)?"":20+t.reply.floor+"楼")+" "+t._s(t.reply.time))]):t._e(),t._v(" "),t.reply.format_time?n("div",{staticClass:"time"},[t._v(t._s(t.reply.format_time))]):t._e(),t._v(" "),n("div",{ref:"content",staticClass:"content",domProps:{innerHTML:t._s(t.reply.content)}})]),t._v(" "),n("a",{staticClass:"light"},[t._v("亮了("+t._s(t.reply.light_count)+")")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"vux-flexbox",class:{"vux-flex-col":"vertical"===t.orient,"vux-flex-row":"horizontal"===t.orient},style:t.styles},[t._t("default")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"thread"}},[n("div",{staticClass:"title"},[t._v(t._s(t.thread.title))]),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"left"},[t._v(t._s(t.thread.time)+" 阅读 "+t._s(t.thread.hits))]),t._v(" "),n("a",{staticClass:"right",attrs:{href:"https://www.baidu.com"}},[t._v(t._s(t.thread.forum.name))])]),t._v(" "),n("a",{staticClass:"userInfo",attrs:{href:"https://www.baidu.com"}},[n("img",{staticClass:"userImg",attrs:{src:"https://w1.hoopchina.com.cn/hybrid/resource/avatar/man.png"}}),t._v(" "),n("div",{staticClass:"username"},[t._v(t._s(t.thread.username))])]),t._v(" "),n("div",{ref:"content",staticClass:"content",domProps:{innerHTML:t._s(t.thread.content)}})])},staticRenderFns:[]}},,function(t,e,n){var r=n(1)(n(48),n(113),null,null,null);t.exports=r.exports},function(t,e,n){function r(t){n(105)}var i=n(1)(n(49),n(115),r,null,null);t.exports=i.exports},function(t,e,n){function r(t){n(103)}var i=n(1)(n(50),n(112),r,null,null);t.exports=i.exports},function(t,e,n){function r(t){n(102)}var i=n(1)(n(51),n(111),r,"data-v-35b7903a",null);t.exports=i.exports},function(t,e,n){function r(t){n(104)}var i=n(1)(n(52),n(114),r,"data-v-764e6d65",null);t.exports=i.exports},function(t,e,n){function r(t){n(101)}var i=n(1)(n(53),n(110),r,"data-v-30a7377e",null);t.exports=i.exports},function(t,e,n){function r(t){n(106)}var i=n(1)(n(54),n(116),r,"data-v-fec627ec",null);t.exports=i.exports}]),[47]);
//# sourceMappingURL=app.bf7d865d02a125b0abf7.js.map