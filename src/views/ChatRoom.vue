<template lang="pug">
  v-card.elevation-0
    v-card-text(xs6)
      h4.blue--text Chat Room
      v-tabs(dark, fixed, icons, centered)
        v-tabs-bar(slot="activators").blue
          v-tabs-slider.yellow
          v-tabs-item(href="#tab-1",@click.native="e1 = 'general'")
            v-icon fa-briefcase
            p General
          v-tabs-item(href="#tab-2",@click.native="e1 = 'development'")
            v-icon fa-flash
            p Development
          v-tabs-item(href="#tab-3",@click.native="e1 = 'designs'")
            v-icon ondemand_video
            p Designs
        v-tabs-content(v-for="i in 3", :key="i", :id="'tab-'+ i")
          v-card(flat)
            v-card-text
              v-subheader You are now chatting in {{ capitalizeFirstLetter }}'s Channel
              v-container
                v-layout(row)
                  v-flex(xs6)
                    v-list(three-line)
                        v-subheader Today
                        v-divider
                        div.our-container#chatlogs
                          template(v-for="item in channelChat")
                            v-list-tile(avatar, v-bind:key="item.user")
                              v-list-tile-avatar
                                img(v-bind:src="item.avatar")
                              v-list-tile-content
                                v-list-tile-title(v-html="item.user")
                                v-list-tile-sub-title(v-html="item.message")
                              v-list-tile-action
                                v-btn(icon, ripple,@click="removeChat(item)",v-if="item.email === user.email")
                                  v-icon.red--text.text--lighten-2(style="font-size: 20px") fa-trash
                            v-divider
                  v-flex(xs6)
                    v-list(three-line)
                        v-subheader Subscribed in channel: {{ capitalizeFirstLetter }}
                        v-divider
                        v-icon(v-if="loading").fa-spin.pa-3 fa-spinner
                        div.our-container#chatlogs(v-else="!loading")
                          template(v-for="item in channelSubscribe")
                            template(v-if="item.online")
                              v-list-tile(avatar, v-bind:key="item.user")
                                v-list-tile-avatar
                                  img(v-bind:src="item.avatar")
                                v-list-tile-content
                                  v-list-tile-title(v-html="item.user")
                              v-divider
              v-container(fluid,height="500px")
                v-layout(row)
                  v-flex(xs6)
                    v-text-field(name="username",label="Name",v-model="newChat.user", readonly)
                v-layout(row)
                  v-flex(xs6)
                    v-text-field(name="input-1",label="Your message here..", textarea,v-model="newChat.message",@keyup.enter="addChat")
                v-layout(row)
                  v-flex(xs6)
                    v-btn(primary,dark,@click="addChat")
                      span Send
                        v-icon(style="font-size: 20px, line-height: 10px") send
</template>

<script>
import db from '../db'
import Firebase from 'firebase'
let auth = Firebase.auth()
let myRef = '', myKey = '', myPosition = ''
let usersRef = db.ref('users')
export default {
	name: 'chat-room',
	firebase: {
  		users: usersRef
	},
	data () {
	  return {
      user: null,
	    newChat: {
	      user: '',
        email: '',
	      message: '',
	      avatar: '',
        channel: ''
	    },
      e1: 'general',
      channelChat: null,
      channelSubscribe: null,
      loading: true,
      users: null
	  }
	},
	methods: {
	  addChat: function () {
	  	if(this.newChat.message.trim() != '' && this.newChat.user.trim() != ''){
	  		db.ref('chatlogs/'+this.e1).push(this.newChat);
	    	this.newChat.message = '';
	  	} else {
	  		alert('Please Enter Message and your Name!');
	  	}
	  },
    removeChat: function (chat) {
      let x = confirm("Do you wish to delete this message?")
      if(x == true){
        db.ref('chatlogs/'+this.e1).child(chat['.key']).remove()
      }
    },
    loadChannel: function(){
      var self = this;
      this.$bindAsArray('channelChat', db.ref('chatlogs/'+self.e1));

      if(myRef != '' || myRef != null){
        myRef = db.ref('users/'+myKey)
        myRef.update({location: self.e1, online: true})
      }
      this.$bindAsArray('channelSubscribe', db.ref('users').orderByChild('location').equalTo(self.e1));
    },
    getUserKey: function(){
    }
	},
  watch: {
    e1: function(){
      this.newChat.channel = this.e1
      this.loadChannel()
    }
  },
  computed: {
    capitalizeFirstLetter: function() {
        return this.e1.charAt(0).toUpperCase() + this.e1.slice(1);
    }
  },
  created() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
          this.user = firebaseUser
          this.newChat.email = this.user.email
          this.newChat.user = this.user.displayName
          this.newChat.avatar = this.user.photoURL
          this.newChat.channel = this.e1
          this.loadChannel()
      } else {
        myRef = db.ref('users/'+myKey)
        myRef.onDisconnect().update({online: false, location: ''});
      }
    })

    var self = this;
    var ref = db.ref('users')
    ref.on("value", function(snap){
      if(snap.val()){
        for(var i = 0; i < self.users.length; i++) {
          if(self.newChat.email == self.users[i].email){
            myKey = self.users[i][".key"]
            if(myRef == ''){
              myRef = db.ref('users/'+myKey)
              myRef.update({location: self.e1, online: true})
            } else {
              myRef.update({location: self.e1, online: true})
            }
          }
        }
      } else {
        console.log("not loading")
      }
    })


  },
  mounted: function() {
    var self = this;
    db.ref('users').orderByChild('location').equalTo(this.e1).on("value", function(snap){
      if(snap.val()){
        self.loading = false
        self.channelSubscribe = snap.val()
      }
    });

  },
  beforeDestroy: function() {
    myRef = db.ref('users/'+myKey)
    myRef.onDisconnect().update({online: false, location: ''});
  }
}
</script>

<style scoped>
  .our-container{
    height: 320px;
    overflow-y: auto;
  }

  .our-container li a {
    height: 50px !important;
    padding: 10px 10px;
  }
</style>
