# @jfm/vue-infinite-scroll
A bidirectional infinite scroll component for Vue.js.

## Installation
```sh
npm i @jfm/vue-infinite-scroll
```

## Demo
- [Link](http://jiangfengming.github.io/vue-infinite-scroll/demo/)
- [Source code](demo-src/App.vue)
  
## Usage
```vue
<template>
  <main>
    <button class="btn-reset" @click="reset">reset</button>

    <!-- infinite scroll up -->
    <InfiniteScroll
      v-if="items.length"
      direction="up"
      auto="in-viewport"
      :head="items.length ? items[0].id : null"
      :next="prev"
      :handler="loadPrevPage"
    />

    <ul>
      <!--
        If you use upward infinite scroll, `data-inf-id` should be set.
        If you use downward infinite scroll, it is not needed.
      -->
      <li
        v-for="item in items"
        :key="item.id"
        :data-inf-id="item.id"
        :style="{ background: `rgb(${item.color.join()})` }"
      >
        {{ item.id }}
      </li>
    </ul>

    <!-- infinite scroll down -->
    <InfiniteScroll
      :head="items.length ? items[items.length - 1].id : null"
      :next="next"
      :handler="loadNextPage"
    />
  </main>
</template>

<script>
import hslRgb from 'hsl-rgb'
import InfiniteScroll from '@jfm/vue-infinite-scroll'

const limit = 10

export default {
  components: { InfiniteScroll },

  data: () => ({
    items: [],
    prev: 4,
    next: 5
  }),

  methods: {
    async loadNextPage() {
      console.log(Date.now(), 'loadNextPage')
      const page = this.next
      const { items, totalCount } = await this.getMockData({ limit, page })

      if (page === this.next) {
        this.items = this.items.concat(items)
        this.next = totalCount / limit > page ? page + 1 : 0
        console.log('next:', this.next)
      }
    },

    async loadPrevPage() {
      console.log(Date.now(), 'loadPrevPage')
      const page = this.prev
      const { items } = await this.getMockData({ limit, page })

      if (page === this.prev) {
        this.items = items.concat(this.items)
        this.prev = page - 1
        console.log('prev:', this.prev)
      }
    },

    async getMockData({ limit = 10, page = 1 } = {}) {
      console.log('page:', page)
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000))

      // if (Math.random() > 0.7) {
      //   throw new Error('server error')
      // }

      const totalCount = 100
      const start = (page - 1) * limit
      const end = Math.min(start + limit, totalCount)
      const items = []

      for (let i = start; i < end; i++) {
        const color = hslRgb(360 / (totalCount - 1) * i, 0.67, 0.67)
        items.push({ id: i, color })
      }

      return {
        items,
        totalCount
      }
    },

    reset() {
      this.items = []
      this.prev = 4
      this.next = 5
    }
  }
}
</script>

<style scoped>
main {
  max-width: 600px;
  margin: 0 auto;
}

ul {
  padding: 0;
}

li {
  margin: 10px;
  list-style: none;
  height: 128px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px
}

.btn-reset {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
```

## Props
`auto`: `false`, `in-advance` or `in-viewport`. Whether and when to call the `handler` function.
  Defaults to `in-advance`.
  - `false`: Needs user to click the component to call the `handler` function manually.
  - `in-advance`: The `handler` function will be called automatically in advance of one screen height distance.
  - `in-viewport` The `handler` function will be called automatically when the component is fully in viewport.
  
`direction`: `up` or `down`. Defaults to `down`.
  If `direction` is `up`, every item element should set `data-inf-id` attribute to their unique id.
  It is used to adjust the scroll position.

`head`: The last item's id if `direction` is `down`, otherwise the first item's id if `direction` is `up`.

`next`: The next page number or cursor. If no more data, set it to `0` or empty string.

`handler`: The resource load function. It should return a promise. It should prepend/append results to the list,
  and set `next` cursor. If loading error, the promise should be rejected, then the component will show error state.

## License
[MIT](LICENSE)
