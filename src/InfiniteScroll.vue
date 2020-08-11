<template>
  <div class="infinite-scroll" @click="onClick">
    <template v-if="state === 'loading'">
      <slot name="loading">Loading...</slot>
    </template>

    <template v-else-if="state === 'standby' && !auto">
      <slot name="standby">Click to load more</slot>
    </template>

    <template v-else-if="state === 'empty'">
      <slot name="empty">Empty</slot>
    </template>

    <template v-else-if="state === 'end'">
      <slot name="end">End</slot>
    </template>

    <template v-else-if="state === 'error'">
      <slot name="error" :error="error">An error occurred. Click to retry</slot>
    </template>
  </div>
</template>

<script>
function autoScrollTest() {
  const y = window.scrollY
  const child1 = createChild()
  document.body.insertBefore(child1, document.body.firstChild)
  window.scrollTo(0, 1)
  const child2 = createChild()
  document.body.insertBefore(child2, child1)
  const result = window.scrollY !== 1
  document.body.removeChild(child1)
  document.body.removeChild(child2)
  window.scrollTo(0, y)
  return result

  function createChild() {
    const el = document.createElement('div')
    el.style.height = '200vh'
    return el
  }
}

export default {
  name: 'InfiniteScroll',

  props: {
    handler: Function,
    loaded: Number,
    next: {},

    direction: {
      type: String,
      default: 'down'
    },

    auto: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    state: 'standby'
  }),

  watch: {
    auto(b) {
      if (b) {
        this.addListeners()
        this.check()
      } else {
        this.removeListeners()
      }
    },

    async loaded() {
      this.setState()

      if (this.direction === 'up' && (!this.autoScroll || this.getScrollY() === 0)) {
        this.restoreScrollPosition()
      }

      if (this.auto) {
        this.check()
      }
    },

    next: 'setState'
  },

  created() {
    this.setState()
  },

  mounted() {
    this.scrollContainer = ['scroll', 'auto'].includes(window.getComputedStyle(this.$el.parentElement).overflowY)
      ? this.$el.parentElement
      : window

    if (this.direction === 'up') {
      this.autoScroll = this.scrollContainer === window ? autoScrollTest() : false
    }

    if (this.auto) {
      this.addListeners()
      this.check()
    }
  },

  destroyed() {
    this.removeListeners()
  },

  methods: {
    setState() {
      this.state = this.next == null || this.next
        ? 'standby'
        : this.loaded
          ? 'end'
          : 'empty'
    },

    onClick() {
      if (this.state === 'standby' || this.state === 'error') {
        this.load()
      }
    },

    async load() {
      this.state = 'loading'
      this.error = null

      if (this.direction === 'up') {
        this.saveScrollPosition()
      }

      try {
        await this.handler()
      } catch (e) {
        this.state = 'error'
        this.error = e
      }
    },

    saveScrollPosition() {
      this.lastScrollHeight = this.getScrollHeight()
    },

    getScrollHeight() {
      return this.scrollContainer === window
        ? document.documentElement.scrollHeight
        : this.scrollContainer.scrollHeight
    },

    getScrollY() {
      return this.scrollContainer === window
        ? window.scrollY
        : this.scrollContainer.scrollTop
    },

    restoreScrollPosition() {
      console.log('restoreScrollPosition')
      this.scrollContainer.scrollTo(0, this.getScrollHeight() - this.lastScrollHeight + this.getScrollY())
    },

    check() {
      if (this.state === 'standby' && !this.rafId) {
        this.rafId = requestAnimationFrame(() => {
          const y = this.getScrollY()
          const h = this.getScrollHeight()

          if (this.direction === 'down' && h - y < window.screen.height * 2 ||
            this.direction === 'up' && y < window.screen.height
          ) {
            this.load()
          }

          this.rafId = null
        })
      }
    },

    addListeners() {
      this.scrollContainer.addEventListener('scroll', this.check)
      window.addEventListener('resize', this.check)
    },

    removeListeners() {
      this.scrollContainer.removeEventListener('scroll', this.check)
      window.removeEventListener('resize', this.check)
    }
  }
}
</script>

<style scoped>
.infinite-scroll {
  font-size: 0.8em;
  color: #666;
  margin: 1em 0;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
