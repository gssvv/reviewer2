<template lang="pug">
  .v-modal(@click.self="$emit('input', false)" :class="{active: value}")
    transition(name="fade-translate")
      .v-modal__content(v-if="value" :style="`width: ${width}px;`")
        img(src="/img/icons/close.svg" @click="$emit('input', false)").v-modal__close
        slot
    
</template>

<script>
export default {
  props: {
    value: Boolean,
    width: {
      type: Number,
      default: 530
    }
  }
}
</script>

<style lang="sass">
.v-modal
  height: 100vh
  width: 100vw
  position: fixed
  background-color: rgba(34,34,34,0)
  display: flex
  justify-content: center
  left: 0
  top: 0
  z-index: 20
  overflow: auto
  transition: .25s ease
  pointer-events: none
  padding: 80px 0 144px 0
  &.active
    background-color: rgba(34,34,34,.8)
    pointer-events: auto


  &__content
    background-color: #fff
    border-radius: 4px
    margin: auto
    padding: 24px
    position: relative

  &__close
    right: 8px
    position: absolute
    top: -32px
    height: 18px
    width: 18px
    cursor: pointer
    transition: .1s ease
    &:active
      opacity: .5

  @include respond-to(sm)
    &__content
      padding: 20px 16px
      border-radius: 0
</style>
