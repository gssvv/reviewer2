<template lang="pug">
  .company-reviews
    .company-reviews__head
      .company-reviews__head-left
        h1.company-reviews__title(v-if="isFull" v-text="title")

        .d-flex
          .capture Отзывы
          .l-spacer
          a(v-if="isFull" @click="reviewModal = true").btn.btn--text.regular.company-reviews__add.d-none.d-md-block Добавить отзыв
      
      .company-reviews__head-right
        reviews-stats(:values="[reviewsCount, reviewsCountPos, reviewsCountNeg]" small :title="title")
        a(@click="reviewModal = true").btn.btn--text.regular.company-reviews__add Добавить отзыв


    .company-reviews__list
      review-item(v-for="(item, index) in isFull ? reviews : reviews.slice(0, 4)" :key="index" v-bind="item" :title="title")

      v-loading(v-if="loading")

      .empty-state(v-if="reviews.length == 0") 
        span(v-if="isFull") Пока что еще никто не оставил отзыв об этой компании :(
        span(v-else) Отзывов пока что нет :(
        .btn.btn--link.mt-4(@click="reviewModal = true") Добавить отзыв


    .company-reviews__actions 
      a(v-if="isFull && !allLoaded" @click="$emit('load-more')").btn.btn--text.regular.mx-auto Загрузить еще
      a(@click="reviewModal = true" v-if="!isFull").btn.btn--text.regular.d-md-none Добавить отзыв
      nuxt-link(v-if="!isFull" :to="{path: `/company/${companyId}/reviews`, query: {search: $route.query.search}}" v-text="`Все отзывы (${reviewsCount})`").btn.btn--text.regular

    v-modal(v-model="reviewModal" :width="580")
      add-review(:id="id")
      


</template>

<script>
import ReviewItem from '@/components/reviews/ReviewItem'
import AddReview from '@/components/company/CompanyAddReview'
import ReviewsStats from '@/components/modules/ReviewsStats'
import VModal from '@/components/modules/VModal'
import VLoading from '@/components/modules/VLoading'

export default {
  components: {
    ReviewsStats,
    ReviewItem,
    AddReview,
    VModal,
    VLoading
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    allLoaded: {
      type: Boolean
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    reviewsCountNeg: {
      type: Number,
      default: 0
    },
    reviewsCountPos: {
      type: Number,
      default: 0
    },
    companyId: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: ''
    },
    reviews: {
      type: Array,
      default: () => []
    },
    isFull: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data: () => ({
    reviewModal: false
  })
}
</script>

<style lang="sass">
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
