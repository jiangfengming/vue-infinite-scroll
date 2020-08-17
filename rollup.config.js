import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/Index.vue',

  plugins: [
    resolve({
      extensions: ['.vue']
    }),

    vue(),

    babel({
      babelHelpers: 'runtime'
    })
  ],

  output: {
    format: 'esm',
    file: 'dist/vue-infinite-scroll.js'
  },

  external: [/@babel\/runtime/]
}
