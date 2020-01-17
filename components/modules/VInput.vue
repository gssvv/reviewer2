<template lang="pug">
  .v-input
    .v-input__name(v-if="name" v-text="name")
    .v-input__field
      input(type="text" :placeholder="placeholder" :value="value" @input="change" :class="{'has-icon': !!icon}" @keyup.enter="submit")
      img(v-if="icon" :src="`/img/icons/${icon}.svg`" @click="submit" :class="{'clickable': iconClickable}").v-input__icon
    .v-input__message(v-if="error || message" v-text="error || message" :class="{danger: error}")

  
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    iconClickable: {
      type: Boolean
    }
  },
  methods: {
    change(e) {
      this.$emit('input', e.target.value)
    },
    submit(e) {
      this.$emit('submit', e.target.value)
    }
  }
}
</script>

<style lang="sass" scoped>
.v-input

  input
    font-size: 18px
    background-color: #f9f9f9
    padding: 12px
    border: none
    font-family: 'PT Root UI', sans-serif
    width: 100%
    &:focus
      outline: none
    &::-webkit-input-placeholder
      color: $text-primary-l-4
    &.has-icon
      padding-right: 43px

  &__field
    position: relative

  &__icon
    position: absolute
    height: 19px
    right: 12px
    top: 14px
    &.clickable
      transition: .25s ease
      cursor: pointer
      &:hover
        opacity: .75
      &:active
        transition: .1s ease
        transform: scale(.85)
        opacity: .5

  &__message
    font-size: 13px
    margin-top: 6px
    color: $text-primary-l-3

  &__name
    font-size: 13px
    text-transform: uppercase
    color: $text-primary-l-2
    letter-spacing: .1em
    margin-bottom: 12px

  &.flat
    input
      background-color: transparent
      padding-left: 0
      padding-top: 0
      padding-bottom: 0
    .v-input__icon
      top: 2px
</style>
