<template lang="pug">
	v-container
		v-layout(row,v-for="card in cards", :key="card.title").overview-list
			v-flex(xs10, offset-xs1)
				cards(:card="card")
					p(slot="title") {{ card.title }}
					p(v-show="card.visible") {{ card.description }}
</template>

<script>
	import Cards from '../components/Cards'
	export default {
		name: 'overview',
		components: {
			Cards
		},
		data() {
			return {
				cards: [
					{ description: 'Hey, I\'m John. I just started learning vue. I have been always a back-end developer, so this kind of stuffs is new to me. This gives me a chance to showcase my attitude towards working and learning. I am eager to learn and to build wonderful Apps.', title: 'Overview', visible: true },
					{ description: 'Built using VueJs, Vuetify, and the database used is FireBase. A user can join any of our channels and view each messages from each channels that they are subscribed to.', title: 'Chat App', visible: false },
				]
			}
		}
	}
</script>

<style scoped>
	.overview-list{
		padding-bottom: 30px;
	}
</style>