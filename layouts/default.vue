<template lang="pug">
  .l-app
    header-component
    .l-page-content
      nuxt
    footer-component

</template>

<script>
import HeaderComponent from '@/components/common/CommonHeader'
import FooterComponent from '@/components/common/CommonFooter'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>
