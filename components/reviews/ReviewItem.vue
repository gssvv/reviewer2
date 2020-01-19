<template lang="pug">
  .review-item
    .review-item__wrapper(@click="showModal")
      .review-item__head
        img(src="/img/icons/smile-green.svg" alt="Позитивный отзыв о строительной компании").review-item__status
        span.review-item__author Анастасия
        .l-spacer
        span.review-item__date 23.03.2019

      .review-item__content Купила старую двушку, убитую, но зато недорого. Решила сделать ремонт, какие нет, мне составили смету. Решили полы переделать...

      .review-item__images
        .review-item__images-item: img(src="/img/room.jpg" alt="Фото работы строительной компании")
        .review-item__images-item: img(src="/img/room.jpg" alt="Фото работы строительной компании")
        .review-item__images-item: img(src="/img/room.jpg" alt="Фото работы строительной компании")
        span +5

    v-modal(v-model="modal")
      .review-item__modal
        .review-item__head
          img(src="/img/icons/smile-green.svg" alt="Позитивный отзыв о строительной компании").review-item__status
          span.review-item__author Анастасия
          .l-spacer
          span.review-item__date 23.03.2019

        .review-item__content Купила старую двушку, убитую, но зато недорого. Решила сделать ремонт, какие нет, мне составили смету. Решили полы переделать...

        .review-item__images-full
          img(src="/img/room.jpg" alt="Фото работы строительной компании")
          img(src="/img/room.jpg" alt="Фото работы строительной компании")
          img(src="/img/room.jpg" alt="Фото работы строительной компании")
        



</template>

<script>
import VModal from '@/components/modules/VModal'

export default {
  components: { VModal },
  data: () => ({
    modal: false
  }),
  methods: {
    showModal() {
      this.modal = true
    }
  }
}
</script>

<style lang="sass">
.review-item
  min-width: 280px
  max-width: 430px
  margin-bottom: 8px
  &__wrapper
    padding: 16px 20px 20px
    transition: .25s ease
    cursor: pointer
    border-radius: 4px
    &:hover
      background-color: #F5F5F5
    &:active
      transition: .1s ease
      background-color: #e4e4e4

  &__head
    display: flex
    align-items: center
    margin-bottom: 8px

  &__status
    max-height: 16px
    max-width: 16px
    margin-right: 8px

  &__author
    font-size: 18px
    font-weight: 500
    max-width: calc(100% - 24px - 80px)

  &__date
    font-size: 13px
    color: $text-primary-l-4

  &__content
    color: $text-primary-l-2
    font-size: 14px
    line-height: 1.4

  &__images-full
    margin-top: 28px
    img
      max-width: 100%
      margin-left: auto
      margin-right: auto
      display: block
      &:not(:last-child)
        margin-bottom: 20px

  &__images
    margin-top: 20px
    display: flex
    align-items: center

    &-item
      height: 60px
      width: 90px
      margin-right: 8px

      img
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center center

    span
      margin-left: 8px
      color: $text-primary-l-4

  @include respond-to(lg)
    max-width: unset

  @include respond-to(md)
    &__wrapper
      padding: 16px

    &:hover
      background-color: #fff

    &__images
      margin-top: 16px

      &-item
        width: 70px
        height: 46px
        margin-right: 6px
</style>
