<template lang="pug">
  .home
    hat(v-bind="hat")
    //- TODO: Make it stick to the top
    list-head(@togglePrice="togglePrice" @search="search" :searchLoading="searchLoading")

    .home__list(:class="{'show-price': showPrice}")
      .l-container
        .l-row
          company-card(v-if="!searchLoading" v-for="(item, index) in companies" :key="index" v-bind="item" :searchText="searchText")
          v-loading(v-if="loading")
          .empty-state(v-if="!companies.length && !loading") Компании не найдены
</template>

<script>
import Hat from '@/components/common/CommonHat'
import ListHead from '@/components/home/HomeListHead'
import CompanyCard from '@/components/home/HomeCompanyCard'
import VLoading from '@/components/modules/VLoading'

export default {
  components: { Hat, ListHead, CompanyCard, VLoading },
  head: () => ({
    title: 'Рейтинг ремонтных компаний в Москве | Ремонт Википедия',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Помогаем найти действительно достойного и проверенного подрядчика, учитывая отзывы и рекомендации клиентов.'
      }
    ]
  }),
  data: () => ({
    hat: {
      title: 'Рейтинг ремонтных <br> компаний в Москве',
      desc:
        'Помогаем найти действительно достойного и проверенного подрядчика, учитывая отзывы и рекомендации клиентов.'
    },
    showPrice: false,
    companies: [],
    loading: false,
    queryStart: 10,
    stopPagination: false,
    searchLoading: false,
    searchText: ''
  }),
  async asyncData(context) {
    let search = context.route.query.search
    let query = '/companies?_limit=10'
    if (search) query += `&title_contains=${search}`

    let result = { searchText: search }

    try {
      const res = await context.$axios.get(query)
      result.companies = res.data
      result.queryStart = res.data.length
      if (res.data.length < 10) result.stopPagination = true
    } catch (e) {
      console.log(e)
    }

    return result
  },
  mounted() {
    this.initLoadOnScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    togglePrice(val) {
      this.showPrice = val
    },
    async search(text) {
      this.searchLoading = true
      this.loading = true
      this.companies = []
      try {
        const res = await this.$axios.get(
          `/companies?title_contains=${text}&_limit=10`
        )
        let query = text ? `?search=${text}` : ''
        history.pushState({}, null, this.$route.path + query)

        this.companies = res.data
        this.searchLoading = false
        this.loading = false
        this.searchText = text
        this.queryStart = res.data.length
        this.stopPagination = res.data.length < 10
      } catch (e) {
        console.log(e)
      }
    },
    async initLoadOnScroll() {
      window.addEventListener('scroll', this.scrollHandler)
    },
    async scrollHandler() {
      if (this.loading || !this.companies.length || this.stopPagination) return

      let rect = document.querySelector('.home__list').getBoundingClientRect()
      let blockHeight = document.querySelector('.home__list').clientHeight
      let scrollTop = window.pageYOffset

      let triggerHeight = rect.top + scrollTop + blockHeight
      let bottomScroll = scrollTop + window.innerHeight

      if (triggerHeight <= bottomScroll) {
        try {
          this.loading = true
          const res = await this.$axios.get(
            `/companies?title_contains=${this.searchText ||
              ''}&_limit=10&_start=${this.queryStart}`
          )
          this.queryStart += res.data.length

          if (res.data.length == 0) this.stopPagination = true

          this.companies.push(...res.data)

          this.loading = false
        } catch (e) {
          console.log(e)
        }
      }
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
