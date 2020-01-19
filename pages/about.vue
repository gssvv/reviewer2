<template lang="pug">
  .about
    hat(v-bind="hat")
    
    .content-blocks.l-container
      .l-row
        .content-blocks__main
          p Наши цены на ремонт квартир формируются из сложности, площади, количества привлеченного персонала, оборудования и технологий. Основная стоимость - затраченный объем материалов и индивидуальные решения нестандартных вопросов.
          p Самостоятельный расчет возможен для стандартных работ, а стоимость согласования документации на ремонт инженерных систем квартиры рассчитывается для каждого объекта отдельно. Доставка строительных материалов и их закупка не входит в общий прайс.

        .content-blocks__contacts
          span.capture  Почта для связи: 
          a(href="mailto:info@site.com" target="_blank").email info@site.com

    
</template>

<script>
import Hat from '@/components/common/CommonHat'

export default {
  components: { Hat },
  data: () => ({
    hat: {
      title: 'О проекте'
    }
  })
}
</script>

<style lang="sass">
@import '@/assets/style/layout/_content-blocks.sass'

.about
</style>
