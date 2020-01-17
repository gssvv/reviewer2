<template lang="pug">
  .home
    hat(v-bind="hat")
    //- TODO: Make it stick to the top
    list-head(@togglePrice="togglePrice")

    .home__list(:class="{'show-price': showPrice}")
      .l-container
        .l-row
          company-card(v-for="(item, index) in companies" :key="index" v-bind="item")

</template>

<script>
import Hat from '@/components/common/CommonHat'
import ListHead from '@/components/home/HomeListHead'
import CompanyCard from '@/components/home/HomeCompanyCard'

export default {
  components: { Hat, ListHead, CompanyCard },
  data: () => ({
    showPrice: false,
    hat: {
      title: 'Рейтинг ремонтных <br> компаний в Москве',
      desc:
        'Помогаем найти действительно достойного и проверенного подрядчика, учитывая отзывы и рекомендации клиентов.'
    },
    companies: [
      {
        avatar: {
          url: '/uploads/be67d57652984dfea751a793801ea1f9.png'
        },
        title: 'Химпромстрой',
        companyId: 0,
        rating: 1,
        pricing: [
          {
            title: 'Косметический ремонт',
            value: 123
          },
          {
            title: 'Капитальный ремонт',
            value: 123
          },
          {
            title: 'Элитный ремонт',
            value: 123
          }
        ],
        reviews: 1,
        reviewsNeg: 0,
        reviewsPos: 1
      }
    ]
  }),
  methods: {
    togglePrice(val) {
      this.showPrice = val
    }
  }
}
</script>

<style lang="sass">
.home
  &__list
    margin-top: 40px
    width: 100%
    &.show-price
      .company-card__pricing
        display: flex

  @include respond-to(sm)
    &__list
      .l-container
        margin: 0
        max-width: 100%
</style>
