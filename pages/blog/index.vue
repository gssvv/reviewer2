<template lang="pug">
  .blog
    hat(v-bind="hat")

    .content-blocks.l-container
      .l-row
        .content-blocks__main.blog__list(v-load-on-scroll="{onScroll, name: 'articles'}")
          .blog__search
            v-input(v-model="search.value" v-bind="search" :loading="searchLoading" @submit="searchQuery").search
          
          .empty-state(v-if="articles.length === 0 && !loading") Статьи не найдены

          
          template(v-if="articles.length !== 0")
            article-card(v-for="(item, index) in articles" :key="index" v-bind="item")
            .article-card
            .article-card

          v-loading(v-if="loading")
    
</template>

<script>
import Hat from '@/components/common/CommonHat'
import VInput from '@/components/modules/VInput'
import ArticleCard from '@/components/blog/ArticleCard'
import VLoading from '@/components/modules/VLoading'

export default {
  components: { Hat, ArticleCard, VInput, VLoading },
  head() {
    return {
      title: `Блог | Ремонт Википедия`
    }
  },
  data: () => ({
    hat: {
      title: 'Блог'
    },
    search: {
      value: '',
      placeholder: 'Поиск по названию...',
      icon: 'search',
      class: 'flat search',
      iconClickable: true
    },
    searchLoading: false,
    loading: false,
    stopPagination: false,
    queryStart: 0
  }),
  computed: {
    email() {
      return this.$store.getters.getEmail
    }
  },
  async asyncData(context) {
    let result = { message: null }

    try {
      const res = await context.$axios.get(`/articles?_limit=9`)
      result.articles = res.data
      result.queryStart = res.data.length
      if (res.data.length < 9) result.stopPagination = true
    } catch (e) {
      result.message = 'Запрашиваемая страница не найдена'
    }

    return result
  },
  methods: {
    async searchQuery(text) {
      this.searchLoading = true
      this.loading = true
      this.articles = []
      this.searchText = text
      try {
        const res = await this.$axios.get(
          `/articles?title_contains=${text}&_limit=9`
        )
        this.articles = res.data
        this.searchLoading = false
        this.loading = false
        this.queryStart = res.data.length
        this.stopPagination = res.data.length < 9
      } catch (e) {
        this.searchLoading = false
        this.loading = false
        this.stopPagination = true
      }
    },
    async onScroll() {
      try {
        this.loading = true
        const res = await this.$axios.get(
          `/articles?title_contains=${this.searchText || ''}&_limit=9&_start=${
            this.queryStart
          }`
        )
        this.queryStart += res.data.length

        if (res.data.length == 0) this.stopPagination = true

        this.articles.push(...res.data)

        this.loading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/style/layout/_content-blocks.sass'

.blog
  &__search
    width: 100%
    margin-bottom: 32px
    .search
      max-width: 284px
  &__list
    flex: 100%
    margin: 0 -16px
    display: flex
    flex-wrap: wrap
    .article-card
      display: flex
      flex-direction: column
      min-width: 280px
      flex: 1
      margin: 0 32px 40px 0

  @include respond-to(md)
</style>
