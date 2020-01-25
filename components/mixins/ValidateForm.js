export default {
  methods: {
    validateForm(formName) {
      let errors = 0
      let form = this[formName]

      for (let key in form) {
        // REQUIRED
        if (form[key].required && !form[key].value) {
          this[formName][key].error =
            (form[key].messages && form[key].messages.required) ||
            'Поле обязательно к заполнению'
          errors++

          continue
        } else {
          this[formName][key].error = ''
        }

        // MINLENGTH
        if (
          form[key].minLength &&
          form[key].value.length < form[key].minLength
        ) {
          this[formName][
            key
          ].error = `Значение должно быть не короче ${form[key].minLength} символов`
          errors++

          continue
        } else {
          this[formName][key].error = ''
        }

        // MAXLENGTH
        if (
          form[key].maxLength &&
          form[key].value.length > form[key].maxLength
        ) {
          this[formName][
            key
          ].error = `Значение должно быть не длиннее ${form[key].maxLength} символов`
          errors++

          continue
        } else {
          this[formName][key].error = ''
        }
      }

      return !errors
    }
  }
}
