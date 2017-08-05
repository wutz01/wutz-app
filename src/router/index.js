import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Overview from '@/views/Overview';
import ChatRoom from '@/views/ChatRoom';
import BookShelf from '@/views/BookShelf';

export default new Router({
  routes: [
    { path: '/', component: Overview },
	{ path: '/chat', component: ChatRoom },
	{ path: '/library', component: BookShelf }
  ],
  mode: 'history',
  linkActiveClass: 'is-active',
})
