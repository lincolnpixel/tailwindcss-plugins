const plugin = require('tailwindcss/plugin')
const selectorParser = require('postcss-selector-parser')

module.exports = plugin(({ addVariant }) => {
  addVariant('parent-expanded', ({ modifySelectors, separator }) => {
    return modifySelectors(({ selector }) => {
      return selectorParser((selectors) => {
        selectors.walkClasses((sel) => {
          sel.value = `parent-expanded${separator}${sel.value}`
          sel.parent.insertBefore(
            sel,
            selectorParser().astSync('[aria-expanded="true"] '),
          )
        })
      }).processSync(selector)
    })
  })
})
