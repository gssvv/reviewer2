<template lang="pug">
  .footer
    .l-container
      .l-row.logo-nav
        logo
        .l-spacer
        navigation
        .l-spacer.d-lg-none

      .l-row.site-info
        span(v-text="`Все права защищены © ${currentYear}`")
        nuxt-link(to="/rules").text-center Политика конфиденциальности
        span.text-right(v-text="email")

</template>

<script>
import Logo from '@/components/common/CommonLogo'
import Navigation from '@/components/common/CommonNavigation'

export default {
  components: {
    Logo,
    Navigation
  },
  computed: {
    email() {
      return this.$store.getters.getEmail
    },
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="sass">
.footer
  padding: 60px 0
  background-image: url('/img/hat-bg-xl.jpg')
  background-size: cover
  background-position: center center
  color: $text-secondary
  margin-top: 200px
  position: relative
  &:after
    content: ""
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 100%
    background-color: rgba(34, 34, 34, 0.75)
  .logo
    position: absolute
  .l-row
    position: relative
    z-index: 1
    &.logo-nav
      min-height: 44px
      align-items: center

    &.site-info
      font-size: 14px
      color: $text-primary-l-4
      margin-top: 120px
      span, a
        width: calc(100% / 3)
      a
        text-decoration: underline

  @include respond-to(lg)
    .l-row
      &.site-info
        margin-top: 60px
        span, a
          width: 100%
          margin: 8px 0
          text-align: left !important
        a
          text-decoration: underline

  @include respond-to(md)
    padding: 40px 0
    margin-top: 80px
    .logo
      position: unset

    .navigation
      width: 100%
      margin: 44px 0 0 0
      transform: unset
      position: unset
      text-align: left

      &-wrapper
        width: 100%

      &__item
        &:after, &.nuxt-link-exact-active:after
          left: 2px
          right: unset

      &-bar
        display: none

    .l-row
      &.site-info
        margin-top: 44px
        span, a
          margin: 4px 0
</style>
