<template lang="pug">
  .v-input
    .v-input__name(v-if="name" v-text="name")

    .v-input__field
      component(
        :is="componentName" type="text" 
        :placeholder="placeholder" 
        :value="value" 
        @input.self="change" 
        :name="name"
        :class="{'has-icon': !!icon, 'has-capture': !!capture}" 
        :mask="mask"
        @keyup.enter.self="submit")

      transition(name="fade-translate-icons")

        img(
          key="one"
          v-if="loading" 
          :src="`/img/icons/loading.svg`" 
          ).v-input__icon.loading

        img(
          key="two"
          v-if="!loading && icon" 
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
  components: {
    'masked-input': () => (process.client ? import('vue-masked-input') : {})
  },
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
    loading: {
      type: Boolean
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
    },
    mask: {
      type: String,
      default: ''
    }
  },
  computed: {
    componentName() {
      if (this.textarea) return 'textarea'

      if (this.mask) return 'masked-input'

      return 'input'
    }
  },
  methods: {
    change(e) {
      let value = this.mask ? e : e.target.value
      this.$emit('input', value)
    },
    submit(e) {
      this.$emit('submit', e.target.value)
    }
  }
}
</script>
