<template lang="pug">
  .reviews
    hat
    
    .reviews__content
      .l-container
        .l-row
          nuxt-link(to="/company/0").btn.btn--text.btn--back
            img(src="/img/icons/angle-left.svg" alt="Вернуться к рейтингу строительных компаний")
            span О компании

        .l-row.mt-5.mt-4-sm
          company-reviews-list(:title="title" is-full)

</template>

<script>
import Hat from '@/components/common/CommonHat'
import CompanyReviewsList from '@/components/company/CompanyReviewsList'

export default {
  components: { Hat, CompanyReviewsList },
  data: () => ({
    title: 'Компания',
    reviews: []
  })
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

      &__actions
        display: none


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
