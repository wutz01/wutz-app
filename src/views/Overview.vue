<template lang="pug">
	v-container
		v-layout(row,v-for="card in cards", :key="card.title").overview-list
			v-flex(xs10, offset-xs1)
				cards(:card="card").blue.white--text
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
					{ description: 'Nexus is a chat app that has channels that you can join. This apps helps everyone to have a conversation and share ideas.', title: 'Overview', visible: true },
					{ description: 'A collection of everyone\'s favorite books, you can also add image to show everyone the front page of the book you\'ve shared.', title: 'Library', visible: false },
					{ description: 'A collection of everyone\'s images, you can also add description to share with everyone how you feel about the image you\'ve shared.', title: 'Gallery', visible: false },
					{ description: 'Hey, I\'m John, 24 yrs of age.I have a 3yrs background in Back-end Development using PHP and 18 months of that span of 3 yrs are focused in using Laravel Framework. I just started learning VueJs and it gives me a feeling of excitement since as what I have said, I am a back-end developer. This opportunity will help me be a full stack or might be a change of course since I am starting to love front-end development.', title: 'About the developer', visible: false },
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
