<template lang="pug">
v-card.blue-grey.darken-2.white--text
	v-card-title(primary-title)
		.headline
			slot(name="title")
		div
			slot
	v-card-actions.white
		v-spacer
			v-btn(icon)
				v-icon more_vert
</template>
<script>
	export default {
		name: 'cards'
	}
</script>