<template lang="pug">
  .company-reviews__form
    h4.company-reviews__form-title.mb-9 Оставить отзыв
    v-tabs(v-model="form.positive.value" v-bind="form.positive").mb-7
    v-input(v-model="form.author.value" v-bind="form.author")
    v-input(v-model="form.content.value" v-bind="form.content")
    v-file(v-model="form.images.value" v-bind="form.images" @input="filesLoaded")
    
    .company-reviews__form-images
      .company-reviews__form-images-item(v-for="(item, index) in form.images.imagesLoaded" @click="removeImg(index)"): img(:src="item.src")

    a.btn.btn--black.mt-6 Отправить на модерацию
    v-checkbox(v-model="form.policy.value").mt-5
      | Я ознакомился и согласен с 
      nuxt-link(to="/policy").underlined политикой конфиденциальности
</template>

<script>
import VInput from '@/components/modules/VInput'
import VFile from '@/components/modules/VFile'
import VCheckbox from '@/components/modules/VCheckbox'
import VTabs from '@/components/modules/VTabs'

export default {
  components: {
    VInput,
    VFile,
    VCheckbox,
    VTabs
  },
  data: () => ({
    form: {
      author: {
        value: '',
        placeholder: 'Иван',
        error: '',
        name: 'Ваше имя'
      },
      content: {
        value: '',
        placeholder: 'Опишите ваш опыт работу с данной компанией',
        error: '',
        name: 'Текст отзыва',
        textarea: true
      },
      images: {
        value: null,
        name: 'Фотографии',
        error: '',
        message: 'Максимальный размер каждого – 2МБ. Не более 10 изображений.',
        accept: '.png, .jpg, .jpeg',
        multiple: true,
        imagesLoaded: []
      },
      policy: {
        value: true
      },
      positive: {
        value: true,
        name: 'Как вы оцениваете свой опыт?'
      }
    }
  }),
  methods: {
    filesLoaded(files) {
      let filesCounter = this.form.images.imagesLoaded.length
      this.form.images.error = ''

      for (let file of files) {
        if (filesCounter > 9) {
          this.form.images.error =
            'Можно прикрепить не более 10-ти изображений.'
          return
        }

        if (file.size > 2097152) {
          this.form.images.error = 'Размер файла должен быть не более 2МБ'
          continue
        }

        let img = new Image()
        img.src = window.URL.createObjectURL(file)

        filesCounter++

        img.onload = () => {
          this.form.images.imagesLoaded.push(file)
          this.form.images.imagesLoaded[
            this.form.images.imagesLoaded.length - 1
          ].src = img.src
        }
      }
    },
    removeImg(index) {
      let src = this.form.images.imagesLoaded[index].src
      this.form.images.imagesLoaded.splice(index, 1)
      window.URL.revokeObjectURL(src)
    }
  }
}
</script>

<style lang="sass" scoped>
.company-reviews__form
  padding-bottom: 36px
  &-title
    font-size: 24px
    font-weight: 600

  .v-input
    margin-top: 24px

  &-images
    display: flex
    flex-wrap: wrap
    margin: 20px -8px
    &-item
      margin: 4px
      width: 90px
      height: 60px
      position: relative
      cursor: pointer
      img
        height: 100%
        width: 100%
        border-radius: 4px
        object-fit: cover
        object-position: center center
        border: 1px #e5e5e5 solid
      &:before
        content: ""
        position: absolute
        height: 100%
        width: 100%
        border-radius: 4px
        background-color: rgba(34,34,34,.8)
        background-image: url('/img/icons/close.svg')
        background-size: 18px 18px
        background-repeat: no-repeat
        background-position: center center
        transition: .25s ease
        opacity: 0
      &:hover:before
        opacity: 1
</style>
