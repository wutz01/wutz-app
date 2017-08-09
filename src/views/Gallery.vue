<template lang="pug">
    v-card.elevation-0
      v-card-text
        h4.blue--text Library
        v-subheader VueJs & Firebase

        v-layout(row, justify-center)
          v-btn(primary, @click.native="dialog = !dialog") New Image
          v-dialog(v-model="dialog", persistent, width="600px")
            v-card
              v-card-title
                span.headline Image Upload
              v-card-text
                v-text-field(label="Title", required, v-model="newImage.title")
                v-text-field(label="Description", required, v-model="newImage.description")
                v-text-field(label="Author", required, v-model="newImage.author")
                file-upload(:input="setSrc")
              v-card-actions
                v-spacer
                v-btn.blue--text.darken-1(flat, @click.native="dialog = false") Close
                v-btn.darken-1(primary, @click.native="addImage") Save

        v-container(fluid, grid-list-md)
          v-layout(row,wrap)
            v-flex(
              v-bind="{ [`xs${books.flex}`]: true }",
              v-for="book in books",
              :key="book.title"
            )
              v-card.dark--text
                v-card-title(primary-title)
                  .headline(v-text="book.title")
                  v-divider
                  div(v-text="book.description")
                  small(v-text="book.author")
                v-divider
                v-card-actions.dark
                  v-spacer
                    v-btn(icon, @click="removeImage(book)").red--text
                      v-icon fa-trash
</template>
<script>
import db from '../db'
import FileUpload from '../components/FileUpload'
let booksRef = db.ref('images')

export default {
  name: 'gallery',
  firebase: {
    books: booksRef
  },
  components: {
    FileUpload
  },
  data () {
    return {
      newImage: {
          title: '',
          description: '',
          uploader: '',
          photoURL: ''
      },
      dialog: false,
    }
  },

  methods: {
    addImage: function () {
      booksRef.push(this.newImage);
      this.newImage.title = '';
      this.newImage.author = '';
      this.newImage.description = '';
      this.dialog = false
    },
    removeImage: function (book) {
      let x = confirm("Do you wish to delete this book?")
      if(x == true){
        booksRef.child(book['.key']).remove()
      }
    },
    setSrc: function(url){
      this.newImage.photoURL = url
      console.log('i got in')
    }
  },
  created() {
    this.$on('input', this.setSrc)
    this.$on('formData', this.setSrc)
  }
}
</script>
