<template lang="pug">
	<!-- v-container(fluid, grid-list-md).grey.lighten-4 -->
	v-layout(row,wrap,lighten-4)
		v-flex(
			xs6,
			v-for="card in cards",
			:key="card.title"
		)
			cards(:card="card")
				span(slot="title") {{ card.title }}
				br
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
					{ description: 'Built using VueJs, Vuetify, and the database used is FireBase.', title: 'Chat App', visible: false },
				]
			}
		}
	}
</script>