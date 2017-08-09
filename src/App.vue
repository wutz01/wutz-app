<template lang="pug">
  v-app(standalone)#wutz-app
    v-navigation-drawer(temporary, v-model="drawer", :mini-variant="mini", light, overflow, absolute)
      v-list.pa-0
        v-list-tile(v-if="mini", @click.native.stop="mini = !mini")
          v-list-tile-action
            v-icon(light) chevron_right
        v-list-tile(avatar, tag="div")
          v-list-tile-avatar
            img(:src="!logout ? user.photoURL : '' ")
          v-list-tile-content
            v-list-tile-title {{ !logout ? user.displayName : '' }}
          v-list-tile-action
            v-btn(icon, @click.native.stop="mini = !mini")
              v-icon chevron_left
      v-list.pt-0(dense)
        v-divider(light)
        v-list-tile(v-for="item in items", :key="item.title",:to="item.url", :exact="item.exact", router)
          //-
            instead of :href we have to use :to to bind the router-link to our view
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}

        v-list-tile(@click="logOut")
          v-list-tile-action
            v-icon fa-sign-out
          v-list-tile-content
            v-list-tile-title Log Out
    v-toolbar(fixed, light).blue.white--text
      v-toolbar-side-icon(@click.native.stop="drawer = !drawer",v-if="!logout")
      v-toolbar-title Nexus
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(flat,@click="redirectUrl('login')",v-if="logout") Login
        v-btn(flat,@click="redirectUrl('register')",v-if="logout") Register
    main
      v-container
        v-layout
          v-flex(md12)
            router-view
</template>

<script>
import router from './router'
import Firebase from 'firebase'
var test = 'can i access it on chatroom'
export default {
  name: 'app',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Overview', icon: 'fa-laptop', url: "/", exact: true },
        { title: 'Chat', icon: 'fa-weixin', url: "/chat", exact: false },
        { title: 'Library', icon: 'fa-book', url: "/library", exact: false },
        { title: 'Gallery', icon: 'fa-image', url: "/gallery", exact: false },
      ],
      mini: false,
      right: null,
      loginForm: false,
      logout: true,
      user: null,
    }
  },
  methods: {
    redirectUrl: function(url){
      router.push(url)
    },
    toggleLogin: function(){
      this.loginForm = true
    },
    closeLogin: function(){
      this.loginForm = false
    },
    logOut: function(){
      this.logout = !this.logout;
      Firebase.auth().signOut();
    }
  },
  created() {
    Firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
          this.logout = false
          this.user = firebaseUser
      } else {
          this.logout = true
          this.mini = false
          this.drawer = null
          this.right = null
          router.push('/login')
      }
    })
  }
}


</script>


<style>
  a {
    text-decoration: none;
  }

  #wutz-app .card {
    background: #ffffff
  }
</style>

<style lang="stylus">
  @import './assets/css/main'
</style>
