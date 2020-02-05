import Vue from 'vue'

Vue.directive('load-on-scroll', {
  inserted: (el, binding, vnode) => {
    let vm = vnode.context

    // Focus the element
    window.addEventListener('scroll', scrollHandler)

    function scrollHandler() {
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
  },
  unbind() {
    // window.addEventListener('scroll', scrollHandler)
  }
})
