<template>
	<div>
		<slot name="start" />

		<div v-html="options.content"></div>

		<slot name="end" />
	</div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'

export default {
	name: 'custom_html',
	props: ['options', 'element', 'api']
}
</script>
