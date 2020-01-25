<template lang="pug">
  nuxt-link(:to="link" tag="div").company-card
    .company-card__avatar: img(:src="avatar ? $axios.defaults.baseURL + avatar.url : $axios.defaults.baseURL + '/uploads/default.png'" :alt="title")
    .company-card__group.wide
      span(v-text="`${rating} место`").capture.regular.primary
      h4(v-text="title")

    .company-card__group.rating
      span.capture Рейтинг
      span(v-text="rankingRate")
    
    .company-card__group
      span.capture Ценовой сегмент
      span(v-text="priceSegment").company-card__price-seg

    .company-card__group.mr-0
      span.capture Отзывы
      reviews-stats(:values="[reviews,reviewsPos, reviewsNeg]")

    .company-card__pricing
      .company-card__group.wide.font-size-14.text-primary-l-2.line-height-150(v-text="address")

      .company-card__group(v-for="(price, index) in pricing" :key="index")
        span.capture(v-text="price.title")
        span(v-text="price.value + ' р./м²'") 



  
</template>

<script>
import ReviewsStats from '@/components/modules/ReviewsStats'
import ComputedProps from '@/components/mixins/ComputedProps'

export default {
  components: {
    ReviewsStats
  },
  mixins: [ComputedProps],
  props: {
    avatar: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    companyId: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    },
    pricing: {
      type: Array,
      default: () => []
    },
    reviews: {
      type: Number,
      default: 0
    },
    reviewsNeg: {
      type: Number,
      default: 0
    },
    reviewsPos: {
      type: Number,
      default: 0
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  computed: {
    link() {
      let link = { path: `/company/${this.companyId}` }
      link.query = this.searchText ? { search: this.searchText } : undefined
      return link
    }
  }
}
</script>

<style lang="sass" scoped>
.company-card
  background-color: #fff
  border-radius: 4px
  padding: 28px 32px
  width: 100%
  display: flex
  flex-wrap: wrap
  cursor: pointer
  transition: box-shadow .25s ease, background .1s ease
  &:not(:last-child)
  margin-bottom: 20px
  &:hover
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1)
  &:active
    background-color: #F5F7FA

  &__group
    display: flex
    flex-direction: column
    font-size: 18px
    margin-right: 80px

    .capture
      color: $text-primary-l-2
      margin-bottom: 8px

    &.wide
      width: 334px
      .capture
        margin-bottom: 6px

  &__pricing
    width: 100%
    padding-left: 80px
    margin-top: 24px
    display: none
    .company-card__group
      font-size: 16px
      &:not(:first-child)
        margin-right: 40px
      &:last-child
        margin-right: 0

  &__avatar
    height: 56px
    width: 56px
    margin-right: 24px
    img
      height: 100%
      width: 100%
      object-fit: cover
      object-position: center center
      border-radius: 4px

  &__price-seg
    line-height: 25px
    letter-spacing: .1em
    font-size: 20px

  @include respond-to(xl)
    &__group
      margin-right: 40px

      &.wide
        width: 220px
    &__pricing
      .company-card__group
        &:first-child
          flex: 1
          visibility: hidden
          font-size: 1px !important

  @include respond-to(lg)
    &__group
      margin-right: 40px
      margin-top: 24px

      &.rating
        margin-left: 80px

      &.wide
        width: calc(100% - 84px)
        margin-right: 0
        margin-top: 0

    &__pricing
      margin-top: 0
      .company-card__group
        &:first-child
          display: none


  @include respond-to(md)
    &:hover
      box-shadow: none

    &__group
      &.rating
        margin-left: 0

    &__pricing
      padding-left: 0
      flex-wrap: wrap
      margin-top: 12px
      .company-card__group
        margin-right: 0
        width: 100%

  @include respond-to(sm)
    padding: 20px 16px 28px
    &__group
      margin-top: 20px
    &__avatar
      margin-right: 20px
</style>
