<template lang="pug">
  .company
    hat
    
    .company__content
      .l-container
        .l-row
          nuxt-link(to="/").btn.btn--text.btn--back
            img(src="/img/icons/angle-left.svg" alt="Вернуться к рейтингу строительных компаний")
            span Рейтинг
      
        .l-row.mt-5.mt-4-sm
          .company__info
            .company-info__head
              .capture.primary.regular 1 место 
              .capture.regular.text-primary-l-2 Рейтинг 102.7

            .company-info__general
              .company-info__logo: img(src="/img/avatar.jpg" :alt="company.title")
              div
                .capture.primary.regular.d-md-none 1 место в рейтинге
                h1.company-info__title Химпромстрой
                reviews-stats(:values="[132, 888, 777]" small :title="company.title").company-info__stats
              .company-info__rating
                .company-info__rating-value 102.7
                .capture
                  img(src='/img/icons/question.svg' :alt="`Рейтинг строительной компании ${company.title}`")
                  span Рейтинг

            .company-info__details
              .company-info__contact
                .company-info__contact-item
                  img(src="/img/icons/phone.svg" :alt="`Телефон строительной компании ${company.title}`")
                  span +0 (000) 000-00-00

                .company-info__contact-item.empty
                  img(src="/img/icons/envelope.svg" :alt="`Почта строительной компании ${company.title}`")
                  span Не указано

                .company-info__contact-item.address
                  img(src="/img/icons/marker.svg" :alt="`Адрес строительной компании ${company.title}`")
                  span Москва, Высоковольтный проезд д. 1 стр. 49 БЦ "ВольтЦентр"

              .company-info__pricing
                .company-info__pricing-item
                  .capture Капитальный ремонт
                  p от 1200р./м²

                .company-info__pricing-item
                  .capture Капитальный ремонт
                  p от 1200р./м²

                .company-info__pricing-item
                  .capture Капитальный ремонт
                  p от 1200р./м²

            
            .company-info__desc Наши цены на ремонт квартир формируются из сложности, площади, количества привлеченного персонала, оборудования и технологий. Основная стоимость - затраченный объем материалов и индивидуальные решения нестандартных вопросов.

            //- .company-info__expand-btn

            
          company-reviews-list(v-bind="company")




</template>

<script>
import Hat from '@/components/common/CommonHat'
import CompanyReviewsList from '@/components/company/CompanyReviewsList'
import ReviewsStats from '@/components/modules/ReviewsStats'

export default {
  components: { Hat, CompanyReviewsList, ReviewsStats },
  data: () => ({
    company: {
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
      address: 'г. Москва, ул. Ленина, д.12',
      dateAdded: '2019-12-09T10:14:35.139Z',
      phone: '+2 (131) 231-23-12',
      reviews: [
        {
          author: 'Александр',
          work: 'Обои',
          content: 'Все очень хорошо.',
          positive: true,
          date: '2019-12-09T10:22:45.535Z',
          photos: [
            {
              url: '/uploads/29d826e801ab4e24bc76ca15f8b335ee.jpg'
            }
          ]
        }
      ],
      desc:
        'Наши цены на ремонт квартир формируются из сложности, площади, количества привлеченного персонала, оборудования и технологий. Основная стоимость - затраченный объем материалов и индивидуальные решения нестандартных вопросов.Самостоятельный расчет возможен для стандартных работ, а стоимость согласования документации на ремонт инженерных систем квартиры рассчитывается для каждого объекта отдельно. Доставка строительных материалов и их закупка не входит в общий прайс.',
      id: '5dee1e8b1b2deb29266595ec',
      reviewsCount: 1,
      reviewsCountNeg: 0,
      reviewsCountPos: 1
    }
  })
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
        .review-item:last-child
          display: none

  &__info
    background-color: #fff
    border-radius: 4px

  &__info
    padding: 32px 32px 80px 32px
    width: 800px
    margin-right: 32px

  &-info
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
          .review-item:last-child
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
          .review-item:last-child
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
