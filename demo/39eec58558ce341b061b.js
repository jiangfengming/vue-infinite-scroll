(window.webpackJsonp=window.webpackJsonp||[]).push([["main"],{"+KfG":function(t,e,n){"use strict";n.r(e);var i=n("fFQK"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("button",{staticClass:"btn-reset",on:{click:t.reset}},[t._v("reset")]),t._v(" "),t.items.length?n("InfiniteScroll",{attrs:{direction:"up",auto:"in-viewport",head:t.items.length?t.items[0].id:null,next:t.prev,handler:t.loadPrevPage},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.state;return["loading"===n?[t._v("加载中...")]:"empty"===n?[t._v("无数据")]:"end"===n?[t._v("全部加载完毕")]:"error"===n?[t._v("加载错误，点击重试")]:"standby"===n?[t._v("向上滚动加载更多数据")]:t._e()]}}],null,!1,1699414326)}):t._e(),t._v(" "),n("ul",t._l(t.items,(function(e){return n("li",{key:e.id,style:{background:"rgb("+e.color.join()+")"},attrs:{"data-inf-id":e.id}},[t._v("\n      "+t._s(e.id)+"\n    ")])})),0),t._v(" "),n("InfiniteScroll",{attrs:{head:t.items.length?t.items[t.items.length-1].id:null,next:t.next,handler:t.loadNextPage}})],1)};o._withStripped=!0;var r=n("iiaA"),s=n.n(r),a=n("dmp9"),l=n.n(a),c=n("sFpA"),d=n.n(c),h=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"infinite-scroll",on:{click:t.onClick}},[t._t("default",["loading"===t.state?[t._v("\n      Loading...\n    ")]:"empty"===t.state?[t._v("\n      Empty\n    ")]:"end"===t.state?[t._v("\n      End\n    ")]:"error"===t.state?[t._v("\n      An error occurred. Click to retry.\n    ")]:"standby"===t.state&&"in-advance"!==t.auto?[t._v("\n      "+t._s(t.auto?"Scroll "+t.direction+" to load more":"Click to load more")+"\n    ")]:t._e()],{state:t.state,error:t.error,auto:t.auto,direction:t.direction})],2)};h._withStripped=!0;var u={name:"InfiniteScroll",props:{handler:Function,head:{},next:{},direction:{type:String,default:"down"},auto:{default:"in-advance"}},data:()=>({state:"standby",error:{}}),watch:{auto(t){t?(this.addListeners(),this.check()):this.removeListeners()},head:"setState",next(){this.setState(),"up"===this.direction&&null!=this.head&&(!this.autoScroll||0===this.getScrollY()||"in-viewport"===this.auto&&this.inViewport())&&this.restorePosition(),"in-advance"===this.auto&&this.check()}},created(){this.setState()},mounted(){if(this.scrollContainer=["scroll","auto"].includes(window.getComputedStyle(this.$el.parentElement).overflowY)?this.$el.parentElement:window,"up"===this.direction&&(this.autoScroll=this.scrollContainer===window&&function(){const t=window.scrollY,e=o();document.body.insertBefore(e,document.body.firstChild),window.scrollTo(0,1);const n=o();document.body.insertBefore(n,e);const i=1!==window.scrollY;return document.body.removeChild(e),document.body.removeChild(n),window.scrollTo(0,t),i;function o(){const t=document.createElement("div");return t.style.height="200vh",t}}()),this.auto)if(this.addListeners(),"in-advance"===this.auto)this.check();else if("up"===this.direction&&this.inViewport()){let t;const e=this.$el.getBoundingClientRect().top;t=this.scrollContainer===window?e+1:e-this.scrollContainer.getBoundingClientRect().top+1,this.scrollContainer.scrollBy(0,t)}},destroyed(){this.removeListeners()},methods:{setState(){this.state=""===this.next||0===this.next?null==this.head?"empty":"end":"standby"},onClick(){"standby"!==this.state&&"error"!==this.state||this.load()},async load(){this.state="loading",this.error=null,"up"===this.direction&&this.savePosition();try{await this.handler()}catch(t){this.state="error",this.error=t}},savePosition(){this.lastHead=this.head,this.spacing=null!=this.head?document.querySelector(`[data-inf-id="${this.head}"]`).getBoundingClientRect().top-this.$el.getBoundingClientRect().bottom:0},restorePosition(){console.log("restorePosition");const t=null!=this.lastHead?this.getScrollY()+document.querySelector(`[data-inf-id="${this.lastHead}"]`).getBoundingClientRect().top-this.$el.getBoundingClientRect().bottom-this.spacing:this.getScrollHeight()-this.getClientHeight();this.scrollContainer.scrollTo(0,t)},getClientHeight(){return this.scrollContainer===window?window.innerHeight:this.scrollContainer.clientHeight},getScrollHeight(){return this.scrollContainer===window?document.documentElement.scrollHeight:this.scrollContainer.scrollHeight},getScrollY(){return this.scrollContainer===window?window.scrollY:this.scrollContainer.scrollTop},check(){"standby"!==this.state||this.timer||(this.timer=setTimeout(()=>{this.timer=null,("in-advance"===this.auto&&this.isNear()||"in-viewport"===this.auto&&this.inViewport())&&this.load()}))},isNear(){const t=this.getScrollY(),e=this.getScrollHeight();return"down"===this.direction&&e-t<2*window.screen.height||"up"===this.direction&&t<window.screen.height},inViewport(){const t=this.$el.getBoundingClientRect();if(this.scrollContainer===window){if(t.top>=0&&t.bottom<=window.innerHeight)return!0}else{const e=this.scrollContainer.getBoundingClientRect();if(t.top>=e.top&&t.bottom<=e.bottom)return!0}return!1},addListeners(){this.scrollContainer.addEventListener("scroll",this.check),window.addEventListener("resize",this.check)},removeListeners(){this.scrollContainer.removeEventListener("scroll",this.check),window.removeEventListener("resize",this.check)}}},p=(n("6Hep"),n("o0nP")),m=Object(p.a)(u,h,[],!1,null,"2964abc9",null);m.options.__file="src/index.vue";var v=m.exports,g={components:{InfiniteScroll:v},data:function(){return{items:[],prev:4,next:5}},methods:{loadNextPage:function(){var t=this;return l()(s.a.mark((function e(){var n,i,o,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(Date.now(),"loadNextPage"),n=t.next,e.next=4,t.getMockData({limit:10,page:n});case 4:i=e.sent,o=i.items,r=i.totalCount,n===t.next&&(t.items=t.items.concat(o),t.next=r/10>n?n+1:0,console.log("next:",t.next));case 8:case"end":return e.stop()}}),e)})))()},loadPrevPage:function(){var t=this;return l()(s.a.mark((function e(){var n,i,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(Date.now(),"loadPrevPage"),n=t.prev,e.next=4,t.getMockData({limit:10,page:n});case 4:i=e.sent,o=i.items,n===t.prev&&(t.items=o.concat(t.items),t.prev=n-1,console.log("prev:",t.prev));case 7:case"end":return e.stop()}}),e)})))()},getMockData:function(t){return l()(s.a.mark((function e(){var n,i,o,r,a,l,c,h,u,p;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=(n=void 0===t?{}:t).limit,o=void 0===i?10:i,r=n.page,a=void 0===r?1:r,console.log("page:",a),e.next=4,new Promise((function(t){return setTimeout(t,2e3*Math.random())}));case 4:for(100,l=(a-1)*o,c=Math.min(l+o,100),h=[],u=l;u<c;u++)p=d()(360/99*u,.67,.67),h.push({id:u,color:p});return e.abrupt("return",{items:h,totalCount:100});case 10:case"end":return e.stop()}}),e)})))()},reset:function(){this.items=[],this.prev=4,this.next=5}}},w=(n("pQzR"),Object(p.a)(g,o,[],!1,null,"3783d5fa",null));w.options.__file="demo-src/App.vue";var f=w.exports;new i.a(f).$mount("#app")},"/80K":function(t,e,n){},"6Hep":function(t,e,n){"use strict";var i=n("WnXp");n.n(i).a},WnXp:function(t,e,n){},pQzR:function(t,e,n){"use strict";var i=n("/80K");n.n(i).a}},[["+KfG","runtime","vendors~main"]]]);