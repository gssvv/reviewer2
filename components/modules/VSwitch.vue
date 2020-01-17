<template lang="pug">
  label.v-switch
    input(type="checkbox" @input="change" :checked="value")
    .v-switch__button
    span(v-text="name").v-switch__name
    
</template>

<script>
export default {
  props: {
    value: Boolean,
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    change(e) {
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style lang="sass" scoped>
.v-switch
  cursor: pointer
  display: flex
  align-items: center
  &__button
    width: 44px
    height: 24px
    border-radius: 100px
    background-color: #ddd
    padding: 2px
    position: relative
    transition: .25s ease
    &:after
      content: ""
      display: block
      position: absolute
      height: 20px
      width: 20px
      border-radius: 20px
      left: 2px
      background-color: #fff
      transition: .25s ease
  input
    display: none
    &:checked ~ .v-switch__button
      background-color: $primary
      &:after
        left: 22px
  &__name
    margin-left: 16px
    font-size: 16px
    line-height: 24px
</style>
