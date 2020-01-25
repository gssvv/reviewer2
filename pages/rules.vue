<template lang="pug">
  .about
    hat(v-bind="hat")
    
    .content-blocks.l-container
      .l-row
        .content-blocks__main(v-html="rules.content")
        .content-blocks__contacts
          span.capture  Почта для связи: 
          a(:href="`mailto:${email}`" target="_blank" v-text="email").email

    
</template>

<script>
import Hat from '@/components/common/CommonHat'

export default {
  components: { Hat },
  head() {
    return {
      title: `Правила | Ремонт Википедия`
    }
  },
  data: () => ({
    hat: {
      title: 'Правила'
    }
  }),
  computed: {
    email() {
      return this.$store.getters.getEmail
    }
  },
  async asyncData(context) {
    let result = {}

    try {
      const res = await context.$axios.get(`/rules`)
      result.rules = res.data
    } catch (e) {
      result.message = `Ошибка: ${e.response.status}`

      if (e.response.status == 404)
        result.message = 'Запрашиваемая страница не найдена'
    }

    return result
  }
}
</script>

<style lang="sass">
@import '@/assets/style/layout/_content-blocks.sass'

.about
</style>
