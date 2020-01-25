<template lang="pug">
  .v-loading
    img(src="/img/icons/loading.svg")
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.v-loading
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 20px 20px 60px 20px
  img
    height: 42px
    width: 42px
    object-fit: cover
    object-position: contain
    animation: rotate 1.5s linear infinite
</style>
