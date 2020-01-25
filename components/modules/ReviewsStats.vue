<template lang="pug">
  .reviews-stats(:class="{small}")
    img(src="/img/icons/dialogue-blue.svg" :alt="`Положительные отзывы о ${title}`" v-if="values[0] != null")
    span(v-text="values[0]" v-if="values[0] != null").primary
    img(src="/img/icons/smile-green.svg" :alt="`Положительные отзывы о ${title}`" v-if="values[1] != null")
    span(v-text="values[1]" v-if="values[1] != null").success
    img(src="/img/icons/sad-red.svg" :alt="`Положительные отзывы о ${title}`" v-if="values[2] != null")
    span(v-text="values[2]" v-if="values[2] != null").danger
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default: () => [0, 0, 0]
    },
    small: Boolean,
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.reviews-stats
  display: flex
  align-items: center

  img
    max-height: 14px
    max-width: 14px
    margin-right: 8px

  span
    font-size: 16px
    &:not(:last-child)
      margin-right: 24px

  &.small
    img
      margin-right: 6px
    span
      font-size: 14px
      &:not(:last-child)
        margin-right: 20px
</style>
