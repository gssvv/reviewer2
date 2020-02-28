<template lang="pug">
  .add-company
    hat(v-bind="hat")
    
    .content-blocks.l-container
      .l-row
        .content-blocks__main.add-company__form
          v-input(v-model="form.title.value" v-bind="form.title")
          .add-company__form-row
            v-input(v-model="form.phone.value" v-bind="form.phone")
            v-input(v-model="form.email.value" v-bind="form.email")
            v-input(v-model="form.address.value" v-bind="form.address")

          v-input(v-model="form.desc.value" v-bind="form.desc")

          v-file(v-model="form.avatar.value" v-bind="form.avatar" @input="fileLoaded").add-company__form-avatar
            template(v-slot:before)
              .add-company__form-avatar-image(v-if="form.avatar.file.src" @click="removeAvatar"): img(:src="form.avatar.file.src")
              .add-company__form-avatar-block(v-else)
                span 150x150px


          h4.add-company__form-title Цены

          .add-company__form-row.pricing
            v-input(v-model="form.price1.value" v-bind="form.price1")
            v-input(v-model="form.price2.value" v-bind="form.price2")
            v-input(v-model="form.price3.value" v-bind="form.price3")

          p(v-if="formStatus" v-text="formStatus").announce-block

          template(v-else)
            a(@click="sendForm").btn.btn--black.mt-9.mt-4-sm.add-company__form-submit Отправить на модерацию

            v-checkbox(v-model="form.policy.value" v-bind="form.policy").mt-5
              | Я ознакомился и согласен с 
              nuxt-link(to="/policy").underlined политикой конфиденциальности
          

        .content-blocks__contacts
          span.capture  Почта для связи: 
          a(href="mailto:info@site.com" target="_blank").email info@site.com

    
</template>

<script>
import Hat from '@/components/common/CommonHat'
import VInput from '@/components/modules/VInput'
import VFile from '@/components/modules/VFile'
import VCheckbox from '@/components/modules/VCheckbox'
import ValidateForm from '@/components/mixins/ValidateForm'

export default {
  components: { Hat, VInput, VFile, VCheckbox },
  mixins: [ValidateForm],
  data: () => ({
    formStatus: '',
    hat: {
      title: 'Добавить компанию'
    },
    form: {
      title: {
        name: 'Название компании',
        value: '',
        error: '',
        message: '',
        placeholder: 'Название компании',
        required: true
      },
      desc: {
        name: 'Описание',
        value: '',
        error: '',
        message: '',
        placeholder: 'Расскажите о вашей компании',
        textarea: true,
        minLength: 50,
        maxLength: 500,
        required: true
      },
      phone: {
        name: 'Телефон',
        value: '',
        error: '',
        message: '',
        placeholder: '+7 (000) 000-00-00',
        required: true,
        mask: `\\+\\7 (111) 111-1111`
      },
      email: {
        name: 'Email',
        value: '',
        error: '',
        message: '',
        placeholder: 'info@example.com',
        required: false
      },
      address: {
        name: 'Адрес',
        value: '',
        error: '',
        message: '',
        placeholder: 'г. Москва, ул. Ленина',
        required: true
      },
      price1: {
        name: 'Капитальный ремонт',
        value: '',
        error: '',
        message: '',
        placeholder: '1000',
        required: true,
        capture: 'руб/м²'
      },
      price2: {
        name: 'Косметический ремонт',
        value: '',
        error: '',
        message: '',
        placeholder: '1000',
        required: true,
        capture: 'руб/м²'
      },
      price3: {
        name: 'Элитный ремонт',
        value: '',
        error: '',
        message: '',
        placeholder: '1000',
        required: true,
        capture: 'руб/м²'
      },
      avatar: {
        value: null,
        required: true,
        error: '',
        name: 'Логотип',
        message: 'Максимальный размер – 1МБ',
        accept: '.png, .jpg, .jpeg',
        file: {}
      },
      policy: {
        value: true,
        error: '',
        messages: {
          required: 'Необходимо подтвердить согласие с политикой'
        },
        required: true
      }
    }
  }),
  head() {
    return {
      title: `Добавить компанию | Ремонт Википедия`
    }
  },
  methods: {
    async sendForm() {
      if (!this.validateForm('form')) return

      let payload = {}

      Object.keys(this.form).map((key) => {
        if (key == 'avatar') return
        payload[key] = this.form[key].value
      })

      payload.pricing = [
        {
          title: 'Косметический ремонт',
          value: payload.price1
        },
        {
          title: 'Капитальный ремонт',
          value: payload.price2
        },
        {
          title: 'Элитный ремонт',
          value: payload.price3
        }
      ]

      let formData = new FormData()

      formData.append(
        'files.avatar',
        this.form.avatar.file,
        this.form.avatar.file.name
      )
      formData.append('data', JSON.stringify(payload))

      try {
        await this.$axios.post('/companies', formData)
        this.formStatus =
          'Ваша заявка принята. Информация о компании будет опубликована на сайте после модерации.'
      } catch (e) {
        this.formStatus =
          'Возникла ошибка. Пожалуйста, попробуйте сделать заявку позже или свяжитесь с администрацией сайта.'
      }
    },
    fileLoaded(files) {
      this.form.avatar.error = ''
      let file = files[0]

      if (file.size > 1048576) {
        this.form.images.error = 'Размер файла должен быть не более 1МБ'
        return
      }

      let img = new Image()
      img.src = window.URL.createObjectURL(file)

      img.onload = () => {
        this.form.avatar.file = file
        this.form.avatar.file.src = img.src
      }
    },
    removeAvatar() {
      let src = this.form.avatar.file.src
      this.form.avatar.file = {}
      window.URL.revokeObjectURL(src)
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/style/layout/_content-blocks.sass'

.add-company
  &__form
    padding-bottom: 60px !important
    .v-input
      margin-bottom: 24px

    &-row
      display: flex
      flex-wrap: wrap
      margin: 0 -12px
      &>*
        width: calc(100% / 3 - 24px)
        margin: 0 12px

    &-title
      font-size: 24px
      font-weight: 600
      margin-bottom: 24px
      margin-top: 32px

    &-avatar
      display: flex
      flex-wrap: wrap
      &-block, &-image
        height: 100px
        width: 100px
        color: $text-primary-l-2
        font-size: 13px
        display: flex
        justify-content: center
        align-items: center
        border-radius: 4px
        margin-right: 20px
        margin-bottom: 20px

      &-block
        border: 1px $text-primary-l-4 dashed

      &-image
        position: relative
        cursor: pointer
        img
          height: 100%
          width: 100%
          object-fit: cover
          object-position: center center
          border-radius: 4px
        &:before
          content: ""
          position: absolute
          height: 100%
          width: 100%
          border-radius: 4px
          background-color: rgba(0, 0, 0,.8)
          background-image: url('/img/icons/close.svg')
          background-size: 24px 24px
          background-repeat: no-repeat
          background-position: center center
          transition: .25s ease
          opacity: 0
        &:hover:before
          opacity: 1

  @include respond-to(xl)
    .l-row
      flex-wrap: wrap !important
    &__form
      width: 100%
      margin-right: 0 !important
      margin-bottom: 32px !important
      flex: unset !important

  @include respond-to(lg)
    &__form
      &-row.pricing
        margin: 0
        .v-input
          width: 100%
          margin-left: 0
          margin-right: 0
          &__field
            max-width: 280px

  @include respond-to(md)
    &__form
      &-row
        margin: 0
        .v-input
          width: 100%
          margin-left: 0
          margin-right: 0

  @include respond-to(sm)
    &__form
      &-submit
        padding-left: 16px
        padding-right: 16px
        width: 100%
        text-align: center
</style>
