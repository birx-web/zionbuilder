<template>
	<Sortable
		tag="ul"
		class="znpb-wireframe-view-wrapper"
		v-model="templateItems"
		group="pagebuilder-wireframe-elements"
		:class="{
			[`znpb__sortable-container--${getSortableAxis}`]: isDragging
		}"
		:axis="getSortableAxis"
		@start="onSortableStart"
		@end="onSortableEnd"
		:allow-duplicate="true"
		:duplicate-callback="onSortableDuplicate"
	>
		<WireframeListItem
			v-for="element in templateItems"
			:element="element"
			:key="element.uid"
		/>

		<template #helper>
			<SortableHelper />
		</template>

		<template #placeholder>
			<SortablePlaceholder />
		</template>

		<template #end>
			<EmptySortablePlaceholder
				v-if="!element.content.length && element.isWrapper"
				:element="element"
				:parentUid="element.uid"
				:data="element"
			/>

			<div
				class="znpb-element-toolbox__add-element-button"
				@click="toggleAddElementsPopup"
				ref="addElementsPopupButton"
				v-if="showAdd"
			>
				<Icon
					icon="plus"
					:rounded="true"
				/>
			</div>
		</template>

	</Sortable>
</template>

<script>
import { computed } from 'vue'

import { useTreeViewList } from '../useTreeViewList'
import { useIsDragging } from '@composables'

// Utils
import { getOptionValue } from '@zb/utils'

export default {
	name: 'WireframeList',
	props: {
		element: {
			type: Object,
			required: true
		},
		showAdd: {
			type: Boolean,
			default: true
		}
	},
	setup (props) {
		const {
			addElementsPopupButton,
			templateItems,
			addButtonBgColor,
			toggleAddElementsPopup,
			sortableStart,
			sortableEnd
		} = useTreeViewList(props)
		const { isDragging, setDraggingState } = useIsDragging()

		const getSortableAxis = computed(() => {
			if (props.element.element_type === 'contentRoot') {
				return 'vertical'
			}

			let orientation = props.element.element_type === 'zion_column' ? 'vertical' : 'horizontal'

			// Check columns and section direction
			if (props.element.options.inner_content_layout) {
				orientation = props.element.options.inner_content_layout
			}

			// Check media settings
			const mediaOrientation = getOptionValue(props.element.options, '_styles.wrapper.styles.default.default.flex-direction')

			if (mediaOrientation) {
				orientation = mediaOrientation === 'row' ? 'horizontal' : 'vertical'
			}

			return orientation
		})

		function onSortableDuplicate (item) {
			return item.getClone()
		}

		function onSortableStart (event) {
			setDraggingState(true)
		}

		function onSortableEnd (event) {
			setDraggingState(false)
		}

		return {
			addElementsPopupButton,
			templateItems,
			toggleAddElementsPopup,
			sortableStart,
			sortableEnd,
			addButtonBgColor,
			getSortableAxis,
			isDragging,

			// Methods
			onSortableDuplicate,
			onSortableStart,
			onSortableEnd
		}
	}
}
</script>