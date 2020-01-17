<template lang="pug">
  .header
    .l-container
      .l-row.header__row
        logo
        .l-spacer
        navigation
        .l-spacer.d-lg-none

</template>

<script>
import Logo from '@/components/common/CommonLogo'
import Navigation from '@/components/common/CommonNavigation'

export default {
  components: {
    Logo,
    Navigation
  }
}
</script>

<style lang="sass">
.header
  padding: 28px 0
  position: absolute
  width: 100%
  .logo
    position: absolute
  &__row
    height: 44px
    display: flex
    align-items: center

  @include respond-to(sm)
    padding: 24px 0
</style>
