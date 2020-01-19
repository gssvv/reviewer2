<template lang="pug">
  .v-input.v-input--file
    .v-input__name(v-if="name" v-text="name")

    slot(name="before")

    .v-input__body

      .v-input__field
        input(type="file" @change='change($event.target.files, $event)' :accept="accept" :multiple="multiple").has-icon
        input(type="text" :placeholder="placeholder").has-icon

        img(src="/img/icons/upload.svg").v-input__icon

      .v-input__message(v-if="error || message" v-text="error || message" :class="{danger: error}")

  
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Выберите файл...'
    },
    message: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean
    },
    accept: {
      type: String,
      default: ''
    }
  },
  methods: {
    change(files, event) {
      this.$emit('input', files)
      event.target.value = ''
    }
  }
}
</script>

<style lang="sass" scoped></style>
