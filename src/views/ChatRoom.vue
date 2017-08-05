<template lang="pug">
  v-card.grey.lighten-4.elevation-0
    v-card-text
      h4 Chat Room
      v-subheader Let's Chat here 
      v-list(three-line)
          v-subheader Today
          v-divider
          template(v-for="item in chatlogs")
            v-list-tile(avatar, v-bind:key="item.user")
              v-list-tile-avatar
                img(v-bind:src="item.avatar")
              v-list-tile-content
                v-list-tile-title(v-html="item.user")
                v-list-tile-sub-title(v-html="item.message")
            v-divider
      v-container(fluid)
        v-layout(row)
          v-flex(xs12)
            v-text-field(name="input-1",label="Your message here..", textarea,v-model="newChat.message")
        v-layout(row)
          v-flex(xs6)
            v-text-field(name="username",label="Your name here..",v-model="newChat.user")
          v-flex(xs6)
            div
              v-btn(primary,dark,icon,@click="addChat")
                v-icon send
</template>

<script>
import db from '../db'
let chatLogs = db.ref('chatlogs')
export default {
	name: 'chat-room',
	firebase: {
  		chatlogs: chatLogs
	},
	data () {
	  return {
	    newChat: {
	      user: '',
	      message: '',
	      avatar: "https://randomuser.me/api/portraits/men/" + Math.ceil(Math.random()*100) + ".jpg"
	    },
	  }
	},
	methods: {
	  addChat: function () {
	  	if(this.newChat.message.trim() != '' && this.newChat.user.trim() != ''){
	  		chatLogs.push(this.newChat);
	    	this.newChat.message = '';
	  	} else {
	  		alert('Please Enter Message and your Name!');
	  	}
	   
	    window.scrollTo(0,document.body.scrollHeight);
	  }
	}
}
</script>