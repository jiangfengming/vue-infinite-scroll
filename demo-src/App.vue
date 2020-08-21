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
import InfiniteScroll from '../src'

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
