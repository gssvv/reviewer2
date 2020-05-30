export default {
  computed: {
    rankingRate() {
      if (this.company)
        return 10 + this.company.reviewsCountPos - this.company.reviewsCountNeg

      return 10 + this.reviewsPos - this.reviewsNeg
    },
    priceSegment() {
      let price = (this.pricing[0] && this.pricing[0].value) || ''

      if (price <= 2000) return '₽'
      if (price <= 3500) return '₽₽'
      if (price <= 5000) return '₽₽₽'
      if (price <= 8500) return '₽₽₽₽'

      return '₽₽₽₽₽'
    }
  }
}
