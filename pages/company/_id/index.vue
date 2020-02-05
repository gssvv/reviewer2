<template lang="pug">
  .company
    hat
    
    .company__content
      .l-container
        .l-row
          nuxt-link(:to="{path: '/', query: {search: $route.query.search}}").btn.btn--text.btn--back
            img(src="/img/icons/angle-left.svg" alt="Вернуться к рейтингу строительных компаний")
            span Рейтинг
      
        .l-row.mt-5.mt-4-sm
          .company__info
            .company-info__head
              .capture.primary.regular(v-text="company.rating + ' место'")
              .capture.regular.text-primary-l-2(v-text="`Рейтинг ${rankingRate}`")

            .company-info__general
              .company-info__logo: img(:src="company.avatar ? $axios.defaults.baseURL + company.avatar.url : $axios.defaults.baseURL + '/uploads/default.png'" :alt="company.title")
              div
                .capture.primary.regular.d-md-none(v-text="`${company.rating} место в рейтинге`")
                h1(v-text="company.title").company-info__title
                reviews-stats(:values="[company.reviewsCount,company.reviewsCountPos, company.reviewsCountNeg]" small :title="company.title").company-info__stats
              .company-info__rating
                .company-info__rating-value(v-text="rankingRate")
                .capture
                  //- img(src='/img/icons/question.svg' :alt="`Рейтинг строительной компании ${company.title}`")
                  span Рейтинг

            .company-info__details
              .company-info__contact
                .company-info__contact-item
                  img(src="/img/icons/phone.svg" :alt="`Телефон строительной компании ${company.title}`")
                  span(v-text="company.phone || 'Не указано'")

                .company-info__contact-item.empty
                  img(src="/img/icons/envelope.svg" :alt="`Почта строительной компании ${company.title}`")
                  span(v-text="company.email || 'Не указано'")

                .company-info__contact-item.address
                  img(src="/img/icons/marker.svg" :alt="`Адрес строительной компании ${company.title}`")
                  span(v-text="company.address || 'Не указано'")

              p(v-if="!showPricing" @click="showPricing = true").btn.btn--text.d-none.d-sm-block.company-info__expand.mt-6 Показать цены

              .company-info__pricing.mb-4-sm(:class="{'d-sm-none': !showPricing}")
                .company-info__pricing-item(v-for="(price, index) in company.pricing" :key="index")
                  .capture(v-text="price.title")
                  span(v-text="price.value + ' р./м²'") 

            p(v-if="!showDesc" @click="showDesc = true").btn.btn--text.d-none.d-sm-block.company-info__expand Показать описание
            
            .company-info__desc.mt-2-sm(:class="{'d-sm-none': !showDesc}" v-text="company.desc")

            
          company-reviews-list(v-bind="company")




</template>

<script>
import Hat from '@/components/common/CommonHat'
import CompanyReviewsList from '@/components/company/CompanyReviewsList'
import ReviewsStats from '@/components/modules/ReviewsStats'
import ComputedProps from '@/components/mixins/ComputedProps'

export default {
  components: { Hat, CompanyReviewsList, ReviewsStats },
  mixins: [ComputedProps],
  head() {
    return {
      title: this.company
        ? this.company.title + ' | Ремонт Википедия'
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
  data: () => ({
    showDesc: false,
    showPricing: false
  }),
  computed: {},
  async asyncData(context) {
    let result = {}
    let id = context.route.params.id

    try {
      const res = await context.$axios.get(`/companies/${id}`)
      result.company = res.data
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
.company
  &__content
    margin-top: -364px

    .l-row
      align-items: flex-start

    .company-reviews
      width: 368px

      &__add
        display: none

      &__list
        .review-item:nth-child(4)
          display: none

  &__info
    background-color: #fff
    border-radius: 4px

  &__info
    padding: 32px 32px 80px 32px
    width: 800px
    margin-right: 32px

  &-info
    &__expand
      width: 100%
      text-align: center
      padding-top: 12px
      padding-bottom: 12px
    &__general
      display: flex
      align-items: center

    &__stats
      display: none !important

    &__head
      display: none

    &__logo
      height: 100px
      width: 100px
      min-width: 100px
      margin-right: 32px
      img
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center center
        border-radius: 4px

    &__title
      font-size: 32px
      font-family: 'PT Root UI', sans-serif
      font-weight: 500
      margin-top: 6px
      max-width: 100%

    &__rating
      margin-left: auto
      text-align: right

      .capture
        display: flex
        align-items: center
        color: #888
        img
          max-height: 14px
          max-width: 14px
          margin-right: 8px

      &-value
        font-size: 24px
        font-weight: 600
        margin-bottom: 2px

    &__details
      margin-top: 40px
      display: flex
      justify-content: space-between

    &__contact
      &-item
        display: flex
        align-items: flex-start
        font-size: 20px
        &.address
          font-size: 16px
          span
            margin-top: 3px
        &.empty
          color: $text-primary-l-4
        span
          max-width: 360px
        img
          max-height: 22px
          max-width: 22px
          margin-right: 14px
          margin-top: 3px
        &:not(:last-child)
          margin-bottom: 32px

    &__pricing
      &-item
        text-align: right
        .capture
          margin-bottom: 8px
        &:not(:last-child)
          margin-bottom: 20px

    &__desc
      margin-top: 40px
      font-size: 18px
      line-height: 150%

  @include respond-to(xl)
    &__content

      .company-reviews
        width: 100%
        padding-left: 20px
        padding-right: 20px

        &__list
          display: flex
          flex-wrap: wrap
          .review-item
            flex: auto 1 0
            &:nth-child(4)
              display: block

    &__info
      width: 100%
      margin-right: 0
      margin-bottom: 32px

  @include respond-to(lg)
    &-info
      &__contact
        &-item
          span
            max-width: 300px

    &__content
      margin-top: -324px
      .company-reviews
        &__list
          .review-item:nth-child(4)
            display: none

  @include respond-to(md)
    &__info
      padding: 16px 16px 24px 16px

    &__content
      margin-top: -280px

      .company-reviews
        padding-left: 0
        padding-right: 0

        .reviews-stats
          display: none

        &__add
          display: flex

        &__actions
          justify-content: center

    &-info
      &__head
        display: flex
        align-items: center
        justify-content: space-between
        margin-bottom: 12px

      &__logo
        height: 56px
        width: 56px
        min-width: 56px
        margin-right: 16px

      &__rating
        display: none

      &__title
        font-size: 18px
        margin-top: 0
        font-weight: 400

      &__stats
        margin-top: 4px
        display: flex !important

      &__details
        margin-top: 32px
        flex-wrap: wrap

      &__contact
        width: 100%
        &-item
          font-size: 18px

          &.address
            font-size: 16px

          &:not(:last-child)
            margin-bottom: 16px

          img
            max-height: 18px
            max-width: 18px

          span
            max-width: unset

      &__pricing
        margin-top: 32px
        &-item
          text-align: left

      &__desc
        margin-top: 32px
        font-size: 16px

  @include respond-to(sm)
    &__content
      margin-top: -168px
</style>
