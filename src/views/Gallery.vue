<template lang="pug">
    v-card.elevation-0
      v-card-text
        h4.blue--text Gallery
        v-subheader Share your images!

        v-layout(row, justify-center)
          v-btn(primary, @click.native="dialog = !dialog") New Image
          v-dialog(v-model="dialog", persistent, width="600px")
            v-card
              v-card-title
                span.headline Image Upload
              v-card-text
                v-text-field(label="Title", required, v-model="newImage.title")
                v-text-field(label="Description", required, v-model="newImage.description")
                file-upload(@input="setFilename",@formData="acceptForm")
              v-card-actions
                v-spacer
                v-btn.blue--text.darken-1(flat, @click.native="dialog = false") Close
                v-btn.darken-1(primary, @click.native="addImage",:loading="loading", :disabled="loading",:class="loading ? 'blue--text' : ''") Save

        v-container(fluid, grid-list-md)
          v-layout(row,wrap)
            v-flex(
              xs6,
              v-for="image in gallery",
              :key="image.title"
            )
              v-card.dark--text
                v-card-media.white--text(height="200", :src="image.photoURL")
                v-card-title(primary-title)
                  div
                    h3.headline(v-text="image.title")
                    div(v-text="image.description")
                v-divider
                v-card-actions.dark
                  v-spacer
                    v-btn(icon, @click="removeImage(image)").red--text
                      v-icon fa-trash
</template>
<script>
import Firebase from 'firebase'
import db from '../db'
import FileUpload from '../components/FileUpload'
let galleryRef = db.ref('images')
let storageRef = Firebase.storage().ref('images');
export default {
  name: 'gallery',
  firebase: {
    gallery: galleryRef
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
          photoURL: '',
      },
      dialog: false,
      file: '',
      filename: '',
      loading: false,
      loader: null
    }
  },
  methods: {
    addImage: function () {
      var vm = this;

      if(vm.newImage.title === '' && vm.newImage.description === '' && vm.filename === ''){
        alert('Enter title, description and choose your image to upload.')
        return;
      }

      vm.loading = true
      vm.loader = 'loading3'
      storageRef.child(vm.filename).put(vm.file).then(function(snapshot){
        // console.log(snapshot.downloadURL)
        vm.newImage.photoURL = snapshot.downloadURL
        galleryRef.push(vm.newImage);
        vm.newImage.title = ''
        vm.newImage.description = ''
        vm.newImage.photoURL = ''
        vm.file = ''
        vm.filename = ''
        vm.dialog = false
        vm.loading = false
        vm.loader = null
      });
      // save the image first on firebase then once done / success then save the gallery data into our firebase database.
      // we do this because we need to get the url first of the image then update the newImage data photoURL


    },
    removeImage: function (image) {
      let x = confirm("Do you wish to delete this image?")
      if(x == true){
        galleryRef.child(image['.key']).remove()
      }
    },
    setFilename: function(filename){
      this.filename = filename
    },
    acceptForm: function(form){
      this.file = form
    }
  }
}
</script>
