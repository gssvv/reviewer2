<template lang="pug">
  nuxt-link(tag="div" :to="`/blog/${articleLink}`").article-card
    .article-card__image(v-if="preview"): img(:src="`${$axios.defaults.baseURL + preview.url}`")
    h5.article-card__title(v-text="title")
    .article-card__desc(v-text="desc")
    .article-card__date(v-text="$dayjs(date).format('DD.MM.YYYY')")
    
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    preview: {
      type: Object,
      default: () => ({})
    },
    date: {
      type: String,
      default: ''
    },
    articleLink: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.article-card
  display: flex
  flex-direction: column
  margin-bottom: 40px
  cursor: pointer
  transition: .25s ease
  &:hover
    opacity: .7
  &__image
    width: 100%
    height: 140px
    img
      height: 100%
      width: 100%
      border-radius: 4px
      object-fit: cover
      object-position: center center
  &__title
    font-size: 24px
    font-weight: 600
    line-height: 1.3
    margin: 16px 0
  &__desc
    font-size: 14px
    line-height: 1.5
    color: $text-primary-l-2
  &__date
    margin-top: 16px
    text-align: right
    font-size: 14px
</style>
