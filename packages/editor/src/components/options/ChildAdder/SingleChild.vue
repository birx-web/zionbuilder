<template>
	<div class="znpb-options-childs__element">
		<div class="znpb-options-childs__element-inner">
			<div class="znpb-options-childs__element-title">{{ element.options[itemOptionName] || 'ITEM' }}</div>
			<div class="znpb-options-childs__element-action">
				<Icon
					icon="copy"
					@click.stop="element.duplicate()"
				/>
				<Icon
					icon="delete"
					v-if="showDelete"
					@click.stop="element.delete()"
				/>
				<Icon
					icon="edit"
					@click.stop="editElement(element)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { usePanels, useEditElement } from '@composables'

export default {
	name: 'SingleChild',
	props: {
		element: {
			type: Object,
			required: true
		},
		itemOptionName: {
			type: String,
			required: true
		},
		showDelete: {
			type: Boolean,
			default: true
		}
	},
	setup (props) {
		const { openPanel } = usePanels()
		const { editElement } = useEditElement()

		return {
			openPanel,
			editElement,
			element: props.element
		}
	}
}
</script>
<style lang="scss">
.znpb-options-childs__element {
	background-color: $surface-variant;


	&-inner {
		z-index: 9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 12px 15px;
		margin-bottom: 5px;
		border-radius: 3px;
		cursor: pointer;
	}

	.znpb-editor-icon-wrapper {
		padding: 5px;
	}

	&-title {
		color: $surface-active-color;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.4;
	}

	&-action {
		flex-shrink: 0;
	}
}
</style>
