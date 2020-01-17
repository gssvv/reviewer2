<template lang="pug">
  .list-head
    .l-container
      .l-row.list-head__row
        v-input(v-model="search.value" v-bind="search" @submit="searchQuery").search
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
    }
  }),
  watch: {
    'showPrice.value': function(val) {
      this.$emit('togglePrice', val)
    }
  },
  methods: {
    searchQuery() {
      console.log(123)
    }
  }
}
</script>

<style lang="sass">
.list-head
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1)
  padding: 24px 0
  background-color: #fff
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
</style>
