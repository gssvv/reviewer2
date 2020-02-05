<template lang="pug">
  .navigation-wrapper(@click.self="activeMenu = false" :class="{'active-menu': activeMenu}")
    .navigation
      nuxt-link(v-for="(item, index) in menu" :to="item.to" v-text="item.text" :key="index").navigation__item
   
    .navigation-bar(@click="activeMenu = !activeMenu")

</template>

<script>
export default {
  data: () => ({
    activeMenu: false,
    menu: [
      {
        text: 'Рейтинг',
        to: '/'
      },
      {
        text: 'О проекте',
        to: '/about'
      },
      {
        text: 'Правила',
        to: '/rules'
      },
      {
        text: 'Блог',
        to: '/blog'
      }
    ]
  }),
  watch: {
    '$route.name': function() {
      this.activeMenu = false
    }
  }
}
</script>

<style lang="sass" scoped>
.navigation
  display: flex
  margin: 0 -32px

  &__item
    color: #fff
    text-transform: uppercase
    font-size: 14px
    font-weight: 500
    margin: 0 32px
    position: relative
    letter-spacing: 0.1em
    transition: .25s ease
    &:after
      content: ""
      position: absolute
      width: 0px
      height: 1px
      left: calc(50% - 0px )
      display: block
      background-color: #fff
      transition: .5s ease
    &.nuxt-link-exact-active:after
      width: 32px
      left: calc(50% - 16px)
    &:active
      transition: .1s ease
      opacity: .5

  &-bar
    height: 20px
    width: 20px
    background-image: url('/img/icons/navbar.svg')
    background-size: contain
    background-repeat: no-repeat
    background-position: center center
    transition: .1s ease
    cursor: pointer
    display: none
    &:active
      opacity: .5

  @include respond-to(md)
    position: absolute
    right: 32px
    top: 40px
    flex-direction: column
    text-align: right
    z-index: 15
    transform-origin: top right
    transform: scale(0)
    transition: .25s ease

    &__item
      margin: 12px 0
      &:after, &.nuxt-link-exact-active:after
        left: unset
        right: 2px

    &-bar
      display: block
      z-index: 15
      position: relative

    &-wrapper
      &:before
        content: ""
        position: fixed
        height: 100vh
        width: 100vw
        left: 0
        top: 0
        background-color: rgba(0,0,0,0)
        z-index: 10
        transition: .25s ease
        pointer-events: none
      &.active-menu
        &:before
          background-color: rgba(0,0,0,.9)
          pointer-events: auto
        .navigation
          transform: scale(1)
        .navigation-bar
          background-image: url('/img/icons/close.svg')
          background-size: 17px 17px
</style>
