<template lang="pug">
    v-card.elevation-0
      v-card-text
        h4.blue--text Library
        v-subheader VueJs & Firebase

        v-layout(row, justify-center)
          v-btn(primary, @click.native="dialog = !dialog") New Book
          v-dialog(v-model="dialog", persistent, width="600px")
            v-card
              v-card-title
                span.headline Book Details
              v-card-text
                v-text-field(label="Title", required, v-model="newBook.title")
                v-text-field(label="Description", required, v-model="newBook.description")
                v-text-field(label="Author", required, v-model="newBook.author")
              v-card-actions
                v-spacer
                v-btn.blue--text.darken-1(flat, @click.native="dialog = false") Close
                v-btn.darken-1(primary, @click.native="addBook") Save

        v-container(fluid, grid-list-md, fill-height)
          v-layout(row,wrap, fill-height)
            v-flex(
              xs6,
              v-for="book in books",
              :key="book.title"
            )
              v-card.dark--text
                v-card-media.white--text(height="200", src="https://www.peacefuldumpling.com/wp-content/uploads/2017/05/the-power-of-now.jpg")
                v-card-title(primary-title)
                  div
                    h5.headline.mb-0(v-text="book.title")
                    br
                    div(v-text="book.description")
                    small(v-text="book.author")
                v-divider
                v-card-actions.dark
                  v-spacer
                    v-btn(icon, @click="removeBook(book)").red--text
                      v-icon fa-trash
</template>
<script>
import db from '../db'
let booksRef = db.ref('books')

export default {
  name: 'book-shelf',
  firebase: {
    books: booksRef
  },

  data () {
    return {
      newBook: {
          title: '',
          description: '',
          author: ''
      },
      dialog: false,
    }
  },

  methods: {
    addBook: function () {
      booksRef.push(this.newBook);
      this.newBook.title = '';
      this.newBook.author = '';
      this.newBook.description = '';
      this.dialog = false
    },
    removeBook: function (book) {
      let x = confirm("Do you wish to delete this book?")
      if(x == true){
        booksRef.child(book['.key']).remove()
      }
    }
  }
}
</script>
