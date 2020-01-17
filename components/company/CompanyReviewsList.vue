<template lang="pug">
  .company-reviews
    .company-reviews__head
      .company-reviews__head-left
        h1.company-reviews__title(v-if="isFull") Химпромстрой
        .d-flex
          .capture Отзывы
          .l-spacer
          nuxt-link(to="/" v-if="isFull").btn.btn--text.regular.company-reviews__add.d-none.d-md-block Добавить отзыв
      .company-reviews__head-right
        reviews-stats(:values="[999, 888, 777]" small :title="title")
        nuxt-link(to="/").btn.btn--text.regular.company-reviews__add Добавить отзыв
    .company-reviews__list
      review-item(v-for="item in isFull ? 5 : 4" :key="item")

    .company-reviews__actions
      a.btn.btn--text.regular.d-md-none Добавить отзыв
      nuxt-link(to="/company/0/reviews").btn.btn--text.regular Все отзывы (25)

</template>

<script>
import ReviewsStats from '@/components/modules/ReviewsStats'
import ReviewItem from '@/components/reviews/ReviewItem'

export default {
  components: { ReviewsStats, ReviewItem },
  props: {
    title: {
      type: String,
      default: ''
    },
    isFull: {
      type: Boolean
    }
  }
}
</script>

<style lang="sass" scoped>
.company-reviews
  padding: 28px 0px 36px 0px
  width: 100%
  background-color: #fff
  border-radius: 4px

  &__head
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 20px
    padding: 0 20px

    &-right
      text-align: right

    .capture
      color: #888

  &__actions
    padding: 0 20px
    display: flex
    justify-content: space-between
    margin-top: 20px
    width: 100%

  &__title
    font-size: 24px
    font-family: 'PT Root UI', sans-serif
    max-width: 100%
    margin-bottom: 8px
    font-weight: 500
</style>
