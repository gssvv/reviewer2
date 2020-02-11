import Vue from 'vue'

const scrollHandler = (el, binding, vnode) => {
  let vm = vnode.context

  return () => {
    if (vm.loading || !vm[binding.value.name].length || vm.stopPagination)
      return

    let rect = el.getBoundingClientRect()
    let blockHeight = el.clientHeight
    let scrollTop = window.pageYOffset

    let triggerHeight = rect.top + scrollTop + blockHeight
    let bottomScroll = scrollTop + window.innerHeight

    if (triggerHeight <= bottomScroll) {
      binding.value.onScroll()
    }
  }
}

let listener = {}

Vue.directive('load-on-scroll', {
  inserted: (el, binding, vnode) => {
    listener = scrollHandler(el, binding, vnode)
    window.addEventListener('scroll', listener)
  },
  unbind: () => {
    window.removeEventListener('scroll', listener)
  }
})
