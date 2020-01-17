<template lang="pug">
  .hat
    .l-container
      .l-row
        h1(v-html="title").hat__title
        p(v-text="desc" v-if="desc").text-primary-l-4.hat__desc



</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.hat
  padding: 160px 0 112px
  min-height: 496px
  background-image: url('/img/hat-bg-xl.jpg')
  background-size: cover
  background-position: center center
  color: $text-secondary
  &__desc
    margin-top: 20px
    max-width: 630px

  @include respond-to(lg)
    padding: 140px 0 100px
    min-height: 450px

  @include respond-to(md)
    padding: 120px 0 80px
    min-height: 390px

  @include respond-to(sm)
    min-height: 280px
    padding: 104px 0 40px
    background-image: url('/img/hat-bg-sm.jpg')

    &__desc
      margin-top: 16px
      font-size: 14px
      max-width: 320px
</style>
