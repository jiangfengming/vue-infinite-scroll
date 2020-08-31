import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'InfiniteScroll',
  props: {
    handler: Function,
    head: {},
    next: {},
    direction: {
      type: String,
      "default": 'down'
    },
    auto: {
      "default": 'in-advance' // in-advance, in-viewport

    }
  },
  data: function data() {
    return {
      state: 'standby',
      error: {}
    };
  },
  watch: {
    auto: function auto(b) {
      if (b) {
        this.addListeners();
        this.check();
      } else {
        this.removeListeners();
      }
    },
    next: function next() {
      this.setState();

      if (this.direction === 'up' && this.head && (this.scrollContainer !== window || !('overflowAnchor' in document.body.style) || this.getScrollY() === 0)) {
        this.restorePosition();
      }

      if (this.auto === 'in-advance') {
        this.check();
      }
    }
  },
  created: function created() {
    this.setState();
  },
  mounted: function mounted() {
    this.scrollContainer = this.getScrollContainer(this.$el);

    if (this.auto) {
      this.addListeners();

      if (this.auto === 'in-advance') {
        this.check();
      } else if (this.direction === 'up' && this.inViewport()) {
        var y;
        var top = this.$el.getBoundingClientRect().top;

        if (this.scrollContainer === window) {
          y = top + 1;
        } else {
          y = top - this.scrollContainer.getBoundingClientRect().top + 1;
        }

        this.scrollContainer.scrollBy(0, y);
      }
    }
  },
  destroyed: function destroyed() {
    this.removeListeners();
  },
  methods: {
    getScrollContainer: function getScrollContainer(el) {
      var parent = el.parentNode;

      if (parent === document.body) {
        return window;
      } else {
        if (['scroll', 'auto'].includes(window.getComputedStyle(parent).overflowY)) {
          return parent;
        } else {
          return this.getScrollContainer(parent);
        }
      }
    },
    setState: function setState() {
      this.state = this.next === null ? this.head ? 'end' : 'empty' : 'standby';
    },
    onClick: function onClick() {
      if (this.state === 'standby' || this.state === 'error') {
        this.load();
      }
    },
    load: function load() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.state = 'loading';
                _this.error = null;

                if (_this.direction === 'up') {
                  _this.savePosition();
                }

                _context.prev = 3;
                _context.next = 6;
                return _this.handler();

              case 6:
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);
                _this.state = 'error';
                _this.error = _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 8]]);
      }))();
    },
    savePosition: function savePosition() {
      this.lastHead = this.head;
      this.spacing = this.head ? document.querySelector("[data-inf-id=\"" + this.head + "\"]").getBoundingClientRect().top - this.$el.getBoundingClientRect().bottom : 0;
    },
    restorePosition: function restorePosition() {
      console.log('restorePosition');
      var y = this.lastHead ? this.getScrollY() + document.querySelector("[data-inf-id=\"" + this.lastHead + "\"]").getBoundingClientRect().top - this.$el.getBoundingClientRect().bottom - this.spacing : this.getScrollHeight() - this.getClientHeight();
      this.scrollContainer.scrollTo(0, y);
    },
    getClientHeight: function getClientHeight() {
      return this.scrollContainer === window ? window.innerHeight : this.scrollContainer.clientHeight;
    },
    getScrollHeight: function getScrollHeight() {
      return this.scrollContainer === window ? document.documentElement.scrollHeight : this.scrollContainer.scrollHeight;
    },
    getScrollY: function getScrollY() {
      return this.scrollContainer === window ? window.scrollY : this.scrollContainer.scrollTop;
    },
    check: function check() {
      var _this2 = this;

      if (this.state === 'standby' && !this.timer) {
        this.timer = setTimeout(function () {
          _this2.timer = null;

          if (_this2.auto === 'in-advance' && _this2.isNear() || _this2.auto === 'in-viewport' && _this2.inViewport()) {
            _this2.load();
          }
        });
      }
    },
    isNear: function isNear() {
      var y = this.getScrollY();
      var h = this.getScrollHeight();
      return this.direction === 'down' && h - y < window.screen.height * 2 || this.direction === 'up' && y < window.screen.height;
    },
    inViewport: function inViewport() {
      var rect = this.$el.getBoundingClientRect();

      if (this.scrollContainer === window) {
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          return true;
        }
      } else {
        var contRect = this.scrollContainer.getBoundingClientRect();

        if (rect.top >= contRect.top && rect.bottom <= contRect.bottom) {
          return true;
        }
      }

      return false;
    },
    addListeners: function addListeners() {
      this.scrollContainer.addEventListener('scroll', this.check);
      window.addEventListener('resize', this.check);
    },
    removeListeners: function removeListeners() {
      this.scrollContainer.removeEventListener('scroll', this.check);
      window.removeEventListener('resize', this.check);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "infinite-scroll", on: { click: _vm.onClick } },
    [
      _vm._t(
        "default",
        [
          _vm.state === "loading"
            ? [_vm._v("\n      Loading...\n    ")]
            : _vm.state === "empty"
            ? [_vm._v("\n      Empty\n    ")]
            : _vm.state === "end"
            ? [_vm._v("\n      End\n    ")]
            : _vm.state === "error"
            ? [_vm._v("\n      An error occurred. Click to retry.\n    ")]
            : _vm.state === "standby" && _vm.auto !== "in-advance"
            ? [
                _vm._v(
                  "\n      " +
                    _vm._s(
                      _vm.auto
                        ? "Scroll " + _vm.direction + " to load more"
                        : "Click to load more"
                    ) +
                    "\n    "
                )
              ]
            : _vm._e()
        ],
        {
          state: _vm.state,
          error: _vm.error,
          auto: _vm.auto,
          direction: _vm.direction
        }
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-d276d56a_0", { source: "\n.infinite-scroll[data-v-d276d56a] {\n  font-size: 0.8em;\n  color: #666;\n  margin: 1em 0;\n  height: 2em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow-anchor: none;\n}\n", map: {"version":3,"sources":["/Users/jfm/projects/vue-infinite-scroll/src/Index.vue"],"names":[],"mappings":";AAkPA;EACA,gBAAA;EACA,WAAA;EACA,aAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,qBAAA;AACA","file":"Index.vue","sourcesContent":["<template>\n  <div class=\"infinite-scroll\" @click=\"onClick\">\n    <slot :state=\"state\" :error=\"error\" :auto=\"auto\" :direction=\"direction\">\n      <template v-if=\"state === 'loading'\">\n        Loading...\n      </template>\n\n      <template v-else-if=\"state === 'empty'\">\n        Empty\n      </template>\n\n      <template v-else-if=\"state === 'end'\">\n        End\n      </template>\n\n      <template v-else-if=\"state === 'error'\">\n        An error occurred. Click to retry.\n      </template>\n\n      <template v-else-if=\"state === 'standby' && auto !== 'in-advance'\">\n        {{ auto ? `Scroll ${direction} to load more` : 'Click to load more' }}\n      </template>\n    </slot>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'InfiniteScroll',\n\n  props: {\n    handler: Function,\n    head: {},\n    next: {},\n\n    direction: {\n      type: String,\n      default: 'down'\n    },\n\n    auto: {\n      default: 'in-advance' // in-advance, in-viewport\n    }\n  },\n\n  data: () => ({\n    state: 'standby',\n    error: {}\n  }),\n\n  watch: {\n    auto(b) {\n      if (b) {\n        this.addListeners()\n        this.check()\n      } else {\n        this.removeListeners()\n      }\n    },\n\n    next() {\n      this.setState()\n\n      if (this.direction === 'up' && this.head &&\n        (this.scrollContainer !== window || !('overflowAnchor' in document.body.style) || this.getScrollY() === 0)\n      ) {\n        this.restorePosition()\n      }\n\n      if (this.auto === 'in-advance') {\n        this.check()\n      }\n    }\n  },\n\n  created() {\n    this.setState()\n  },\n\n  mounted() {\n    this.scrollContainer = this.getScrollContainer(this.$el)\n\n    if (this.auto) {\n      this.addListeners()\n\n      if (this.auto === 'in-advance') {\n        this.check()\n      } else if (this.direction === 'up' && this.inViewport()) {\n        let y\n        const top = this.$el.getBoundingClientRect().top\n\n        if (this.scrollContainer === window) {\n          y = top + 1\n        } else {\n          y = top - this.scrollContainer.getBoundingClientRect().top + 1\n        }\n\n        this.scrollContainer.scrollBy(0, y)\n      }\n    }\n  },\n\n  destroyed() {\n    this.removeListeners()\n  },\n\n  methods: {\n    getScrollContainer(el) {\n      const parent = el.parentNode\n\n      if (parent === document.body) {\n        return window\n      } else {\n        if (['scroll', 'auto'].includes(window.getComputedStyle(parent).overflowY)) {\n          return parent\n        } else {\n          return this.getScrollContainer(parent)\n        }\n      }\n    },\n\n    setState() {\n      this.state = this.next === null\n        ? this.head\n          ? 'end'\n          : 'empty'\n        : 'standby'\n    },\n\n    onClick() {\n      if (this.state === 'standby' || this.state === 'error') {\n        this.load()\n      }\n    },\n\n    async load() {\n      this.state = 'loading'\n      this.error = null\n\n      if (this.direction === 'up') {\n        this.savePosition()\n      }\n\n      try {\n        await this.handler()\n      } catch (e) {\n        this.state = 'error'\n        this.error = e\n      }\n    },\n\n    savePosition() {\n      this.lastHead = this.head\n\n      this.spacing = this.head\n        ? document.querySelector(`[data-inf-id=\"${this.head}\"]`).getBoundingClientRect().top -\n          this.$el.getBoundingClientRect().bottom\n        : 0\n    },\n\n    restorePosition() {\n      console.log('restorePosition')\n\n      const y = this.lastHead\n        ? this.getScrollY() +\n          document.querySelector(`[data-inf-id=\"${this.lastHead}\"]`).getBoundingClientRect().top -\n          this.$el.getBoundingClientRect().bottom - this.spacing\n        : this.getScrollHeight() - this.getClientHeight()\n\n      this.scrollContainer.scrollTo(0, y)\n    },\n\n    getClientHeight() {\n      return this.scrollContainer === window\n        ? window.innerHeight\n        : this.scrollContainer.clientHeight\n    },\n\n    getScrollHeight() {\n      return this.scrollContainer === window\n        ? document.documentElement.scrollHeight\n        : this.scrollContainer.scrollHeight\n    },\n\n    getScrollY() {\n      return this.scrollContainer === window\n        ? window.scrollY\n        : this.scrollContainer.scrollTop\n    },\n\n    check() {\n      if (this.state === 'standby' && !this.timer) {\n        this.timer = setTimeout(() => {\n          this.timer = null\n\n          if (this.auto === 'in-advance' && this.isNear() || this.auto === 'in-viewport' && this.inViewport()) {\n            this.load()\n          }\n        })\n      }\n    },\n\n    isNear() {\n      const y = this.getScrollY()\n      const h = this.getScrollHeight()\n\n      return this.direction === 'down' && h - y < window.screen.height * 2 ||\n        this.direction === 'up' && y < window.screen.height\n    },\n\n    inViewport() {\n      const rect = this.$el.getBoundingClientRect()\n\n      if (this.scrollContainer === window) {\n        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {\n          return true\n        }\n      } else {\n        const contRect = this.scrollContainer.getBoundingClientRect()\n\n        if (rect.top >= contRect.top && rect.bottom <= contRect.bottom) {\n          return true\n        }\n      }\n\n      return false\n    },\n\n    addListeners() {\n      this.scrollContainer.addEventListener('scroll', this.check)\n      window.addEventListener('resize', this.check)\n    },\n\n    removeListeners() {\n      this.scrollContainer.removeEventListener('scroll', this.check)\n      window.removeEventListener('resize', this.check)\n    }\n  }\n}\n</script>\n\n<style scoped>\n.infinite-scroll {\n  font-size: 0.8em;\n  color: #666;\n  margin: 1em 0;\n  height: 2em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow-anchor: none;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-d276d56a";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;
