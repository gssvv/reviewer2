<template lang="pug">
  .v-tabs
    .v-input__name(v-if="name" v-text="name")

    .v-tabs__item(style="color: #27AE60" :class="{active: value}" @click="change(true)")
      i-smile(h="16" w="16")
      .capture Позитивно
    .v-tabs__item(style="color: #C0392B" :class="{active: !value}" @click="change(false)")
      i-sad(h="16" w="16")
      .capture Негативно

    
</template>

<script>
import ISmile from '@/components/icons/ISmile'
import ISad from '@/components/icons/ISad'

export default {
  components: { ISmile, ISad },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: Boolean
  },
  methods: {
    change(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="sass">
.v-tabs
  display: flex
  align-items: flex-start
  flex-wrap: wrap
  &__item
    display: flex
    align-items: center
    margin-top: 4px
    transition: .25s ease
    cursor: pointer

    &:not(:last-child)
      margin-right: 40px

    &:not(.active)
      color: $text-primary-l-4 !important
      svg, path
        fill: $text-primary-l-4

    svg
      margin-right: 12px

    .capture
      font-weight: 500

    &:hover
      transform: scale(1.07)
</style>
