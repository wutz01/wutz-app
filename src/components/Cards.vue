<template lang="pug">
v-card.dark--text
	v-card-title(primary-title)
		.headline
			slot(name="title")
		br
		div.content
			slot
	v-divider
	v-card-actions.dark
		v-spacer
			v-btn(icon, @click.native="card.visible = !card.visible")
				v-icon {{ card.visible ? 'fa-chevron-up' : 'fa-chevron-down' }}
</template>
<script>
	export default {
		name: 'cards',
		props: ['card'],
	}
</script>