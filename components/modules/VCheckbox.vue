<template lang="pug">
  .v-checkbox-wrapper
    label.v-checkbox
      span.v-checkbox__name
        slot
      input(type="checkbox" @input="change" :checked="value")
      span.v-checkbox__checkmark
    slot(name="after")
  

</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
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
.v-checkbox
  display: inline-flex
  position: relative
  padding-left: 24px
  cursor: pointer
  font-size: 22px
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  align-items: center
  align-items: flex-start

  input
    position: absolute
    opacity: 0
    cursor: pointer
    height: 0
    width: 0

  &__name
    margin-top: 2px
    font-size: 14px

  &__checkmark
    font-size: 14px
    position: absolute
    top: 3px
    left: 0
    height: 16px
    width: 16px
    background-color: transparent
    border: 1px solid $text-primary
    border-radius: 4px
    transition: .25s ease
    &:after
      content: ""
      position: absolute
      display: none

  input:checked ~ &__checkmark
    background-color: $text-primary
    border-color: $text-primary

  input:checked ~ &__checkmark:after
    display: block

  &__checkmark:after
    left: 5px
    top: 1px
    width: 3px
    height: 8px
    border: solid white
    border-width: 0 2px 2px 0
    -webkit-transform: rotate(45deg)
    -ms-transform: rotate(45deg)
    transform: rotate(45deg)
</style>
