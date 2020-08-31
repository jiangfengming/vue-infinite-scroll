<template>
  <div class="infinite-scroll" @click="onClick">
    <slot :state="state" :error="error" :auto="auto" :direction="direction">
      <template v-if="state === 'loading'">
        Loading...
      </template>

      <template v-else-if="state === 'empty'">
        Empty
      </template>

      <template v-else-if="state === 'end'">
        End
      </template>

      <template v-else-if="state === 'error'">
        An error occurred. Click to retry.
      </template>

      <template v-else-if="state === 'standby' && auto !== 'in-advance'">
        {{ auto ? `Scroll ${direction} to load more` : 'Click to load more' }}
      </template>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScroll',

  props: {
    handler: Function,
    head: {},
    next: {},

    direction: {
      type: String,
      default: 'down'
    },

    auto: {
      default: 'in-advance' // in-advance, in-viewport
    }
  },

  data: () => ({
    state: 'standby',
    error: {}
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

    next() {
      this.setState()

      if (this.direction === 'up' && this.head &&
        (this.scrollContainer !== window || !('overflowAnchor' in document.body.style) || this.getScrollY() === 0)
      ) {
        this.restorePosition()
      }

      if (this.auto === 'in-advance') {
        this.check()
      }
    }
  },

  created() {
    this.setState()
  },

  mounted() {
    this.scrollContainer = this.getScrollContainer(this.$el)

    if (this.auto) {
      this.addListeners()

      if (this.auto === 'in-advance') {
        this.check()
      } else if (this.direction === 'up' && this.inViewport()) {
        let y
        const top = this.$el.getBoundingClientRect().top

        if (this.scrollContainer === window) {
          y = top + 1
        } else {
          y = top - this.scrollContainer.getBoundingClientRect().top + 1
        }

        this.scrollContainer.scrollBy(0, y)
      }
    }
  },

  destroyed() {
    this.removeListeners()
  },

  methods: {
    getScrollContainer(el) {
      const parent = el.parentNode

      if (parent === document.body) {
        return window
      } else {
        if (['scroll', 'auto'].includes(window.getComputedStyle(parent).overflowY)) {
          return parent
        } else {
          return this.getScrollContainer(parent)
        }
      }
    },

    setState() {
      this.state = this.next === null
        ? this.head
          ? 'end'
          : 'empty'
        : 'standby'
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
        this.savePosition()
      }

      try {
        await this.handler()
      } catch (e) {
        this.state = 'error'
        this.error = e
      }
    },

    savePosition() {
      this.lastHead = this.head

      this.spacing = this.head
        ? document.querySelector(`[data-inf-id="${this.head}"]`).getBoundingClientRect().top -
          this.$el.getBoundingClientRect().bottom
        : 0
    },

    restorePosition() {
      console.log('restorePosition')

      const y = this.lastHead
        ? this.getScrollY() +
          document.querySelector(`[data-inf-id="${this.lastHead}"]`).getBoundingClientRect().top -
          this.$el.getBoundingClientRect().bottom - this.spacing
        : this.getScrollHeight() - this.getClientHeight()

      this.scrollContainer.scrollTo(0, y)
    },

    getClientHeight() {
      return this.scrollContainer === window
        ? window.innerHeight
        : this.scrollContainer.clientHeight
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

    check() {
      if (this.state === 'standby' && !this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null

          if (this.auto === 'in-advance' && this.isNear() || this.auto === 'in-viewport' && this.inViewport()) {
            this.load()
          }
        })
      }
    },

    isNear() {
      const y = this.getScrollY()
      const h = this.getScrollHeight()

      return this.direction === 'down' && h - y < window.screen.height * 2 ||
        this.direction === 'up' && y < window.screen.height
    },

    inViewport() {
      const rect = this.$el.getBoundingClientRect()

      if (this.scrollContainer === window) {
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          return true
        }
      } else {
        const contRect = this.scrollContainer.getBoundingClientRect()

        if (rect.top >= contRect.top && rect.bottom <= contRect.bottom) {
          return true
        }
      }

      return false
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
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-anchor: none;
}
</style>
