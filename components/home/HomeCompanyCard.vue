<template lang="pug">
  nuxt-link(:to="`/company/${companyId}`" tag="div").company-card
    .company-card__avatar: img(src="/img/avatar.jpg" :alt="title")
    .company-card__group.wide
      span.capture.regular.primary 1 место
      h4 Химпромстрой

    .company-card__group.rating
      span.capture Рейтинг
      span 102.7
    
    .company-card__group
      span.capture Ценовой сегмент
      span.company-card__price-seg ₽₽₽₽

    .company-card__group.mr-0
      span.capture Отзывы
      reviews-stats(:values="[991,992,993]")

    .company-card__pricing
      .company-card__group.wide.font-size-14.text-primary-l-2.line-height-150 Москва, Высоковольтный проезд д. 1 стр. 49 БЦ "ВольтЦентр"

      .company-card__group
        span.capture Косметический ремонт
        span от 1200р./м²
      .company-card__group
        span.capture Капитальный ремонт
        span от 1200р./м²
      .company-card__group
        span.capture Элитный ремонт
        span от 1200р./м²



  
</template>

<script>
import ReviewsStats from '@/components/modules/ReviewsStats'

export default {
  components: {
    ReviewsStats
  },
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
