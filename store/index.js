export default {
  state: () => ({
    contacts: ''
  }),
  getters: {
    getEmail(state) {
      return state.contacts.email
    }
  },
  actions: {
    async nuxtServerInit({ state }) {
      try {
        const res = await this.$axios.get(`/contacts`)
        state.contacts = res.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
