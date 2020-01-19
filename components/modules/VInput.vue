<template lang="pug">
  .v-input
    .v-input__name(v-if="name" v-text="name")

    .v-input__field
      component(
        :is="textarea ? `textarea` : `input`" type="text" 
        :placeholder="placeholder" 
        :value="value" 
        @input="change" 
        :class="{'has-icon': !!icon, 'has-capture': !!capture}" 
        @keyup.enter="submit")

      img(
        v-if="icon" 
        :src="`/img/icons/${icon}.svg`" 
        @click="submit" 
        :class="{'clickable': iconClickable}"
        ).v-input__icon

      span(v-if="capture" v-text="capture").v-input__capture 

    .v-input__message(
      v-if="error || message" 
      v-text="error || message" 
      :class="{danger: error}")

  
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
    capture: {
      type: String,
      default: ''
    },
    iconClickable: {
      type: Boolean
    },
    textarea: {
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
