<template lang="pug">
  .review-item
    .review-item__wrapper(@click="showModal")
      .review-item__head
        img(
          :src="`/img/icons/${positive ? 'smile-green' : 'sad-red'}.svg`" 
          :alt="`${positive ? 'Позитивный' : 'Негативный'} отзыв о строительной компании ${title}`").review-item__status
        span(v-text="author").review-item__author
        .l-spacer
        span(v-text="$dayjs(date).format('DD.MM.YYYY')").review-item__date

      .review-item__content(v-text="content")

      .review-item__images
        .review-item__images-item(v-for="(photo, index) in photos.slice(0, 3)" :key="index"): img(:src="$axios.defaults.baseURL + photo.url" :alt="`Фото работы строительной компании ${title}`")
        span(v-if="photos.length > 3" v-text="`+${photos.length - 3}`")

    v-modal(v-model="modal")
      .review-item__modal
        .review-item__head
          img(
          :src="`/img/icons/${positive ? 'smile-green' : 'sad-red'}.svg`" 
          :alt="`${positive ? 'Позитивный' : 'Негативный'} отзыв о строительной компании ${title}`").review-item__status
          span(v-text="author").review-item__author
          .l-spacer
          span(v-text="$dayjs(date).format('DD.MM.YYYY')").review-item__date

        .review-item__content(v-text="content")

        .review-item__images-full(v-if="photos.length")
          img(v-for="(photo, index) in photos" :src="$axios.defaults.baseURL + photo.url" :alt="`Фото работы строительной компании ${title}`")


</template>

<script>
import VModal from '@/components/modules/VModal'

export default {
  components: { VModal },
  props: {
    positive: Boolean,
    author: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    work: {
      type: String,
      default: ''
    },
    photos: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
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
