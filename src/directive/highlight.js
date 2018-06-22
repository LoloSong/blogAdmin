import hlj from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

let highlight = {}
highlight.install = function (Vue) {
  Vue.directive('highlight', {
    update: (el) => {
      let blocks = el.querySelectorAll('pre code')
      let lines = el.querySelectorAll('p code')
      blocks.forEach((block) => {
        hlj.highlightBlock(block)
      })
      lines.forEach((block) => {
        hlj.highlightBlock(block)
        block.style.display = 'inline'
      })
    }
  })
}

export default highlight
