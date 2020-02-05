<template lang="pug">
  .reviews
    hat
    
    .reviews__content
      .l-container
        .l-row
          nuxt-link(:to="{path: `/company/${$route.params.id}`, query: {search: $route.query.search}}").btn.btn--text.btn--back
            img(src="/img/icons/angle-left.svg" alt="Вернуться к рейтингу строительных компаний")
            span О компании

        .l-row.mt-5.mt-4-sm
          company-reviews-list(is-full v-bind="company" :loading="reviewsLoading" @load-more="loadMore" :all-loaded="stopPagination")
</template>

<script>
import Hat from '@/components/common/CommonHat'
import CompanyReviewsList from '@/components/company/CompanyReviewsList'

export default {
  components: { Hat, CompanyReviewsList },
  data: () => ({
    reviewsLoading: false,
    queryStart: 9,
    stopPagination: true
  }),
  head() {
    return {
      title: this.company
        ? 'Отзывы о компании ' + this.company.title
        : `Страница не найдена | Ремонт Википедия`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            (this.company && this.company.desc) ||
            `Страница не найдена | Ремонт Википедия`
        }
      ]
    }
  },
  async asyncData(context) {
    let result = {}
    let id = context.route.params.id

    try {
      const res = await context.$axios.get(`/companies/${id}`)
      result.company = res.data
      result.queryStart = res.data.reviews.length
    } catch (e) {
      result.message = `Ошибка: ${e.response.status}`

      if (e.response.status == 404)
        result.message = 'Запрашиваемая страница не найдена'
    }

    return result
  },
  mounted() {
    this.initLoadOnScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    async initLoadOnScroll() {
      window.addEventListener('scroll', this.scrollHandler)
      if (this.company.reviews.length >= 9) this.stopPagination = false
    },
    async scrollHandler() {
      if (
        this.reviewsLoading ||
        !this.company.reviews.length ||
        this.stopPagination
      )
        return

      let rect = document
        .querySelector('.company-reviews')
        .getBoundingClientRect()
      let blockHeight = document.querySelector('.company-reviews').clientHeight
      let scrollTop = window.pageYOffset

      let triggerHeight = rect.top + scrollTop + blockHeight
      let bottomScroll = scrollTop + window.innerHeight

      if (triggerHeight <= bottomScroll) {
        this.loadMore()
      }
    },
    async loadMore() {
      try {
        this.reviewsLoading = true
        const res = await this.$axios.get(
          `/reviews/${this.company.companyId}?_limit=9&_start=${this.queryStart}`
        )

        this.queryStart += res.data.length

        if (res.data.length == 0) this.stopPagination = true

        this.company.reviews.push(...res.data)

        this.reviewsLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="sass">
.reviews
  &__content
    margin-top: -364px

    .company-reviews
      padding: 32px 12px 40px 12px

      &__list
        // display: block
        display: flex
        flex-wrap: wrap
        .review-item
          width: calc(100% / 3)
          // float: left

      &__add
        display: block
        margin-top: 12px

      // &__actions
        // display: none


  @include respond-to(lg)
    &__content
      margin-top: -324px

      .company-reviews
        padding-bottom: 20px

        &__list
          .review-item
            width: calc(100% / 2)

  @include respond-to(md)
    &__content
      margin-top: -280px

      .company-reviews
        padding-top: 24px
        padding-left: 0
        padding-right: 0

        &__title
          font-size: 20px

        &__list
          .review-item
            width: 100%

        &__head
          flex-wrap: wrap
          &-right
            display: none
          &-left
            width: 100%

        &__add
          margin-top: 3px



  @include respond-to(sm)
    &__content
      margin-top: -168px
</style>
