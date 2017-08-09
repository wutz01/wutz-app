import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Overview from '@/views/Overview';
import ChatRoom from '@/views/ChatRoom';
import BookShelf from '@/views/BookShelf';
import Register from '@/views/Register';
import Signin from '@/views/Signin';
import Gallery from '@/views/Gallery';

export default new Router({
  routes: [
    { path: '/', component: Overview },
  	{ path: '/chat', component: ChatRoom },
  	{ path: '/library', component: BookShelf },
  	{ path: '/register', component: Register },
  	{ path: '/login', component: Signin },
  	{ path: '/gallery', component: Gallery },
  ],
  mode: 'history',
  linkActiveClass: 'is-active',
})
