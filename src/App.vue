<template lang="pug">
  v-app(standalone)#wutz-app
    v-navigation-drawer(temporary, v-model="drawer", :mini-variant="mini", light, overflow, absolute)
      v-list.pa-0
        v-list-tile(v-if="mini", @click.native.stop="mini = !mini")
          v-list-tile-action
            v-icon(light) chevron_right
        v-list-tile(avatar, tag="div")
          v-list-tile-avatar
            img(src="https://randomuser.me/api/portraits/men/85.jpg")
          v-list-tile-content
            v-list-tile-title {{ user ? user.email : "Wutz App" }}
          v-list-tile-action
            v-btn(icon, @click.native.stop="mini = !mini")
              v-icon chevron_left
      v-list.pt-0(dense)
        v-divider(light)
        v-list-tile(v-for="item in items", :key="item.title",:to="item.url", :exact="item.exact")
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
    v-toolbar(fixed, light)
      v-toolbar-side-icon(@click.native.stop="drawer = !drawer",v-if="!logout")
      v-toolbar-title Wutz App
      v-spacer
      v-toolbar-items.hidden-sm-and-down
        v-btn(flat,@click="toggleLogin",v-if="logout") Login
        v-btn(flat,@click="redirectUrl('register')",v-if="logout") Register
    main
      v-container(fluid, fill-height)
        v-layout
          v-flex(xs10 offset-xs1)
            v-card(height="1000px", style="padding-top: 10px;")
              router-view
              login(:loginForm="loginForm", v-on:closeParentLogin="closeLogin")
</template>

<script>
import router from './router'
import Login from './views/Login'
import Firebase from 'firebase'
export default {
  name: 'app',
  components: {
    Login
  },
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Overview', icon: 'fa-laptop', url: "/", exact: true },
        { title: 'Chat', icon: 'fa-weixin', url: "/chat", exact: false },
        { title: 'Library', icon: 'fa-book', url: "/library", exact: false },
        // { title: 'Log Out', icon: 'fa-sign-out', url: "/logout", exact: false },
      ],
      mini: false,
      right: null,
      loginForm: false,
      logout: false,
      user: null
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
          router.push('/')
          this.user = firebaseUser
      } else {
          this.logout = true
          console.log('not loggend in');
          this.loginForm = true
          this.mini = false
          this.drawer = null
          this.right = null
          router.push('/register')
          // document.getElementById('btnLogout').style.display = 'none';
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