# @jfm/vue-infinite-scroll
A bidirectional infinite scroll component for Vue.js.

## Installation
```sh
npm i @jfm/vue-infinite-scroll
```

## Demo
- [Link](http://jiangfengming.github.io/vue-infinite-scroll/demo/index.html)
- [Source code](demo-src/App.vue)

## Requirements:
* [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

## Usage
```html
<template>
  <main>
    <button class="btn-reset" @click="reset">reset</button>

    <!-- infinite scroll up -->
    <InfiniteScroll
      v-if="items.length"
      direction="up"
      auto="in-viewport"
      :head="items[0] && items[0].id"
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
        :style="{ background: `hsl(${item.color.join()})` }"
      >
        {{ item.id }}
      </li>
    </ul>

    <!-- infinite scroll down -->
    <InfiniteScroll
      :head="items.length"
      :next="next"
      :handler="loadNextPage"
    />
  </main>
</template>

<script>
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
        this.next = totalCount / limit > page ? page + 1 : null
        console.log('next:', this.next)
      }
    },

    async loadPrevPage() {
      console.log(Date.now(), 'loadPrevPage')
      const page = this.prev
      const { items } = await this.getMockData({ limit, page })

      if (page === this.prev) {
        this.items = items.concat(this.items)
        this.prev = page - 1 || null
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
        const color = [360 / (totalCount - 1) * i, '67%', '67%']
        items.push({ id: i + 1, color })
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
  If `direction` is `up`, every item element should set a `data-inf-id` attribute to a unique value.
  (See usage section for example).
  It is used to track and adjust the scroll position after loading.

`head`:
  - If the items array is empty, set it to a falsey false, such as `null`.
  - If `direction` is `up`, set it to the first item's `data-inf-id` attribute value.
    It will be used to track and adjust the scroll position. If item's id is number `0`, convert it to string.
```vue
<InfiniteScroll :head="items[0] && items[0].id">
```
  - If `direction` is `down`, you can simply set it to `items.length` if the items array is not empty.
    So you don't need to care about the item's unique id.
```vue
<InfiniteScroll :head="items.length">
```

`next`: The next page number or cursor. At initial state, if you don't know the cursor value,
  you could set it to an empty string. If there's no more data, set it to `null`.

`handler`: The resource load function. It should return a promise. It should prepend/append results to the list,
  and set `next` cursor. If loading error, the promise should be rejected, then the component will show error state.

## Slot
```html
<InfiniteScroll ...>
  <template v-slot="{ state, error, auto, direction }">
    <template v-if="state === 'loading'">Loading...</template>
    <template v-else-if="state === 'empty'">Empty</template>
    <template v-else-if="state === 'end'">End</template>
    <template v-else-if="state === 'error'">Error: {{ error.message }}. Click to retry</template>

    <template v-else-if="state === 'standby' && auto !== 'in-advance'">
      {{ auto ? `Scroll ${direction} to load more` : 'Click to load more' }}
    </template>
  </template>
</InfiniteScroll>
```

### Slot props:
- `state`: Includes `loading`, `empty`, `end`, `error`, `standby`.
- `error`: The rejected value of `handler` function.
- `auto`: `false`, `in-advance` or `in-viewport`.
- `direction`: `up` or `down`.

## License
[MIT](LICENSE)
