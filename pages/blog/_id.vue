<template lang="pug">
  .article
    hat

    .content-blocks.l-container
      .l-row
        nuxt-link(to="/blog").btn.btn--text.btn--back.mb-5
          img(src="/img/icons/angle-left.svg" alt="Вернуться к блог")
          span Блог

      .l-row
        .content-blocks__main.article__content
          .empty-state(v-if="message" v-text="message").my-12
          
          template(v-else)
            h1(v-text="article.title")

            p.article__date(v-text="$dayjs(article.date).format('DD.MM.YYYY')")

            img(v-if="article.preview" :src="`${$axios.defaults.baseURL + article.preview.url}`" :alt="article.title")

            div(v-html="article.content")

        .content-blocks__contacts.article__more(v-if="suggestions.length")
          span.capture.mb-4.d-block Читайте также: 
          article-card(v-for="(item, index) in suggestions" :key="index" v-bind="item")

    
</template>

<script>
import Hat from '@/components/common/CommonHat'
import ArticleCard from '@/components/blog/ArticleCard'

export default {
  components: { Hat, ArticleCard },
  head() {
    return {
      title:
        (this.article && this.article.seoTitle) ||
        `Страница не найдена | Ремонт Википедия`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            (this.article && this.article.desc) ||
            `Страница не найдена | Ремонт Википедия`
        }
      ]
    }
  },
  data: () => ({}),
  computed: {
    email() {
      return this.$store.getters.getEmail
    }
  },
  async asyncData(context) {
    let result = { message: null }
    let id = context.route.params.id

    try {
      const article = await context.$axios.get(`/articles/${id}`)
      const suggestions = await context.$axios.get(`/articles?_limit=4`)
      result.article = article.data
      result.suggestions = suggestions.data.filter(
        (val) => val.articleLink !== id
      )
    } catch (e) {
      console.log(e)

      result.message = 'Запрашиваемая страница не найдена'
    }

    return result
  }
}
</script>

<style lang="sass">
@import '@/assets/style/layout/_content-blocks.sass'

.article
  .content-blocks
    margin-top: -324px
  .article__content
    h1
      font-size: 42px
      line-height: 1.3
      margin: 0
    .article__date
      font-size: 14px
      color: $text-primary-l-2
      margin: 8px 0 -20px 0
    img
      max-width: 100%
      margin: 40px auto
      display: block
    p
      font-size: 20px
      line-height: 1.5
      margin: 24px 0
    h3
      line-height: 1.4
      margin: 40px 0 24px 0
      font-weight: bold

    a:link, a
      color: $primary
      text-decoration: underline


    blockquote
      font-size: 18px
      line-height: 1.5
      color: $text-primary-l-1
      margin: 60px 0
      padding-left: 80px
      position: relative
      &:before
        content: ""
        position: absolute
        width: 60px
        height: 50px
        background-image: url(/img/icons/quotes.svg)
        background-size: cover
        left: 0
        top: 0
    ol
      margin: 32px 0
      padding-left: 32px
      li
        font-size: 18px
        line-height: 1.3
        &:not(:last-child)
          margin-bottom: 12px

  @include respond-to(xl)
    .article__more
      padding-left: 16px
      padding-right: 16px
      .capture, .article-card
        max-width: 420px
        margin-left: auto
        margin-right: auto

  @include respond-to(md)
    .content-blocks
      margin-top: -232px
    .article__content
      h1
        font-size: 32px
      img
        margin: 32px auto
      p
        font-size: 18px
        margin: 16px 0
      h3
        margin: 32px 0 20px 0

      blockquote
        font-size: 16px
        padding-left: 60px
        margin: 40px 0
        &:before
          width: 40px
          height: 34px
      ol
        margin: 24px 0
        padding-left: 24px
        li
          font-size: 16px
          &:not(:last-child)
            margin-bottom: 12px



  @include respond-to(sm)
    .content-blocks
      margin-top: -148px
</style>
