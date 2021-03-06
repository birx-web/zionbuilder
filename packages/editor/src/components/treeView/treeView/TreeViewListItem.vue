<template>
	<li
		class="znpb-tree-view__item"
		:class="{'znpb-tree-view__item--hidden': !element.isVisible}"
		:id="element.uid"
		@mouseover.stop="element.highlight"
		@mouseout.stop="element.unHighlight"
		@click.stop.left="onItemClick"
		@contextmenu.stop.prevent="showElementMenu"
	>
		<div
			class="znpb-tree-view__item-header"
			:class="{'znpb-panel-item--active': isActiveItem}"
		>
			<Icon
				icon="select"
				class="znpb-tree-view__item-header-item znpb-tree-view__item-header-expand znpb-utility__cursor--pointer"
				:class="{
					'znpb-tree-view__item-header-expand--expanded': expanded
				}"
				@click.stop="expanded = !expanded"
				v-if="element.isWrapper"
			/>

			<InlineEdit
				class="znpb-tree-view__item-header-item znpb-tree-view__item-header-rename"
				v-model="element.name"
				v-model:active="element.activeElementRename"
			/>

			<Tooltip
				:content="$translate('enable_hidden_element')"
				placement="top"
				v-if="!element.isVisible"
				class="znpb-tree-view__item-enable-visible"
			>

				<transition name="fade">
					<Icon
						icon="visibility-hidden"
						class="znpb-editor-icon-wrapper--show-element"
						@click="element.toggleVisibility()"
					/>
				</transition>

			</Tooltip>

			<div
				class="znpb-element-options__container"
				@click.stop="showElementMenu"
				ref="elementOptionsRef"
			>
				<Icon
					class="znpb-element-options__dropdown-icon znpb-utility__cursor--pointer"
					icon="more"
				/>
			</div>
		</div>
		<TreeViewList
			v-if="expanded"
			:element="element"
		/>
	</li>
</template>

<script lang="ts">
import { ref, PropType, defineComponent, computed } from "vue";
import { on } from "@zb/hooks";
import { Element } from "@composables";
import { useTreeViewItem } from "../useTreeViewItem";

export default defineComponent({
	props: {
		element: Object as PropType<Element>,
	},
	setup(props) {
		const {
			showElementMenu,
			elementOptionsRef,
			isActiveItem,
		} = useTreeViewItem(props);

		const expanded = ref(false);
		const onItemClick = () => {
			props.element.focus;
			props.element.scrollTo = true;
		};

		return {
			expanded,
			showElementMenu,
			elementOptionsRef,
			isActiveItem,
			onItemClick,
		};
	},
});
</script>
<style lang="scss">
.znpb-tree-view__item {
	.znpb-element-options__dropdown-icon {
		cursor: pointer;

		&:hover {
			color: darken($font-color, 15%);
		}
	}

	&--hidden {
		.znpb-tree-view__item-header-item {
			transition: opacity .5s ease;
			opacity: .5;
		}
	}
	&-header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5px;
		background-color: $surface-variant;
		border-radius: 3px;

		&:hover {
			background-color: darken($surface-variant, 3%);
		}

		&.znpb-panel-item--active {
			color: $surface;
			background-color: $secondary;
		}

		&-item {
			padding-left: 15px;

			&:hover {
				cursor: pointer;
				.znpb-editor-icon-wrapper {
					color: darken($primary-color--accent, 10%);
				}
			}
		}
		&-rename {
			position: relative;
			flex-grow: 1;
			padding-top: 15px;
			padding-right: 15px;
			padding-bottom: 15px;
			cursor: text;
			&:focus {
				outline: 0;
			}
		}

		&-expand, &-more {
			padding: 15px;
		}

		&-expand {
			padding-right: 0;

			& > .zion-icon {
				transition: none;
			}

			&.-rotated > .zion-icon {
				transform: rotate(180deg);
			}

			&--expanded svg {
				transform: rotate(180deg);
			}
		}

		&-options-container {
			& > span {
				transition: all .2s ease;
				opacity: .7;
			}
			&:hover {
				& > span {
					opacity: 1;
				}
			}
		}
	}
}
</style>
