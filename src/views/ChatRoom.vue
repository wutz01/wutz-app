<template lang="pug">
  div
    v-card(height="50px")
      v-bottom-nav(absolute,value="true").transparent
        v-btn(flat,light,@click.native="e1 = 'general'", :value="e1 === 'general'").blue--text
          span General
          v-icon fa-briefcase
        v-btn(flat,light,@click.native="e1 = 'development'", :value="e1 === 'development'").blue--text
          span Development
          v-icon fa-flash
        v-btn(flat,light,@click.native="e1 = 'designs'", :value="e1 === 'designs'").blue--text
          span Designs
          v-icon ondemand_video
    v-card.elevation-0
      v-card-text(xs6)
        h4.blue--text Chat Room
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
                  div.our-container#chatlogs
                    template(v-for="item in channelSubscribe")
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
      for(var i = 0; i < this.users.length; i++) {
        if(this.newChat.email == this.users[i].email){
          myKey = this.users[i][".key"]
          if(myRef == ''){
            console.log(myKey)
            myRef = db.ref('users/'+myKey)
          } else {
            myRef.update({location: this.e1})
          }
        }
      }
      this.$bindAsArray('channelChat', db.ref('chatlogs/'+this.e1));
      this.$bindAsArray('channelSubscribe', db.ref('users').orderByChild('location').equalTo(this.e1));

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
      }
    })

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
