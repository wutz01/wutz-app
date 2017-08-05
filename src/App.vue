<template lang="pug">
  v-app(standalone)
    v-navigation-drawer(absolute, permanent, light,:mini-variant.sync="mini", v-model="drawer", overflow)
      v-toolbar(flat).transparent
        v-list.pa-0
          v-list-tile(avatar, tag="div")
            v-list-tile-avatar
              img(src="https://randomuser.me/api/portraits/men/85.jpg")
            v-list-tile-content
              v-list-tile-title John Perez
            v-list-tile-action
              v-btn(icon, @click.native.stop="mini = !mini")
                v-icon chevron_left
      v-list(dense).pt-0
        v-divider

        router-link(to="/", exact)
          v-list-tile
            v-list-tile-action
              v-icon dashboard
            v-list-tile-action
              v-list-tile-title Overview
              
        router-link(to="/chat")
          v-list-tile
            v-list-tile-action
              v-icon message
            v-list-tile-action
              v-list-tile-title Chat
              
        router-link(to="/library")
          v-list-tile
            v-list-tile-action
              v-icon image
            v-list-tile-action
              v-list-tile-title Library

    v-toolbar(fixed,dark).indigo.darken-4
      v-toolbar-side-icon(@click.native.stop="drawer = !drawer")
      v-toolbar-title VueJs sample

    main
      v-container(fluid)
        router-view
  

    v-footer.pa-3
      v-spacer
      div © Wutz {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      drawer: false,
      mini: false,
      right: null
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
</style>