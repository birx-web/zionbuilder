<template>
	<div class="znpb-empty-placeholder">
		<div
			class="znpb-empty-placeholder__add-element-button"
			@click="toggleAddElementsPopup"
			ref="addElementsPopupButton"
		>
			<Icon
				icon="plus"
				:rounded="true"
				class="znpb-empty-placeholder__tour-icon"
			/>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useAddElementsPopup } from '@composables'

export default {
	name: 'EmptySortablePlaceholder',
	props: {
		element: Object
	},
	setup(props) {
		const { showAddElementsPopup, shouldOpenPopup } = useAddElementsPopup()
		const showColumnTemplates = ref(false)
		const addElementsPopupButton = ref(null)

		onMounted(() => {
			if (shouldOpenPopup.value === true) {
				showAddElementsPopup(props.element, addElementsPopupButton)
				shouldOpenPopup.value = false
			}
		})


		function toggleAddElementsPopup () {
			showAddElementsPopup(props.element, addElementsPopupButton)
		}

		return {
			toggleAddElementsPopup,
			addElementsPopupButton,
			showColumnTemplates
		}
	}
}
</script>

<style lang="scss">
.znpb-empty-placeholder {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	min-height: 80px;

	&__add-element-button {
		position: relative;
		width: 34px;
		height: 34px;
		color: $surface;
		font-size: 10px;
		font-size: 14px;
		line-height: 1 !important;
		border-radius: 50%;
		// transition: all .2s;

		&::before {
			@extend %iconbg;
			background: $column-color;
			transition: all .2s;
		}

		.znpb-element__wrapper &::before {
			background-color: $elements-toolbox-color;
		}
		.zb-column &::before {
			background-color: $column-color;
		}

		.zb-section > .zb-section__innerWrapper > .znpb-empty-placeholder
		&::before {
			background-color: $section-color;
		}

		&:hover {
			&::before {
				transform: scale(1.1);
			}
		}
		.znpb-editor-icon-wrapper {
			position: relative;
			width: 34px;
			height: 34px;
			cursor: pointer;
		}
	}
}
</style>
