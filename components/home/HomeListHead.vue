<template lang="pug">
  .list-head-wrapper(ref="listHeadWrapper")
    .list-head(ref="listHead" :class="className")
      .l-container
        .l-row.list-head__row
          v-input(v-model="search.value" v-bind="search" :loading="searchLoading" @submit="searchQuery").search
          v-switch(v-model="showPrice.value" v-bind="showPrice")
          .l-spacer
          nuxt-link(to="/add-company").btn.btn--text.d-lg-none Добавить компанию
          nuxt-link(to="/add-company").btn.btn--icon.d-none.d-lg-flex: img(src="/img/icons/plus.svg" alt="Добавить компанию")
  
</template>

<script>
import VInput from '@/components/modules/VInput'
import VSwitch from '@/components/modules/VSwitch'

export default {
  components: {
    VInput,
    VSwitch
  },
  props: {
    searchLoading: Boolean
  },
  data: () => ({
    search: {
      value: '',
      placeholder: 'Поиск по названию...',
      icon: 'search',
      class: 'flat search',
      iconClickable: true
    },
    showPrice: {
      value: false,
      name: 'Показать цены'
    },
    className: '',
    stickyBlockTop: 0
  }),
  created() {
    let search = this.$route.query.search
    if (search) this.search.value = search
  },
  mounted() {
    this.stickyBlockTop = this.$refs.listHeadWrapper.getBoundingClientRect()
    window.addEventListener('scroll', this.stickHead)
  },
  watch: {
    'showPrice.value': function(val) {
      this.$emit('togglePrice', val)
    }
  },
  methods: {
    stickHead() {
      if (window.pageYOffset - this.stickyBlockTop.top >= 0) {
        this.className = 'sticky'
      } else {
        this.className = ''
      }
    },
    searchQuery(val) {
      this.$emit('search', val)
    }
  }
}
</script>

<style lang="sass">
.list-head
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1)
  padding: 24px 0
  background-color: #fff
  &-wrapper
    min-height: 72px
  &.sticky
    z-index: 5
    width: 100%
    position: fixed
    left: 0
    top: 0
  &__row
    align-items: center
  .v-input.search
    max-width: 284px
    width: 100%
    margin-right: 48px

  @include respond-to(md)
    .v-input.search
      max-width: 230px
      margin-right: 24px

  @include respond-to(sm)
    .v-input.search
      width: 100%
      max-width: unset
      margin-right: 0
      order: 0
      margin-bottom: 24px
    .v-input__icon
      right: 0
    &.sticky
      position: initial
</style>
