<template>
	<div
		class="znpb-icon-pack-modal"
		:class="{['znpb-icon-pack-modal--has-special-filter'] : specialFilterPack}"
	>
		<div class="znpb-icon-pack-modal__search">
			<InputSelect
				:modelValue="activeCategory"
				@update:modelValue="activeCategory = $event"
				:options="packsOptions"
				class="znpb-icons-category-select"
				placement="bottom-start"
			/>
			<BaseInput
				v-model="searchModel"
				:placeholder="getPlaceholder"
				:clearable="true"
				icon="search"
			/>

		</div>
		<div class="znpb-icon-pack-modal-scroll znpb-fancy-scrollbar">
			<IconPackGrid
				v-for="(pack,i) in filteredList"
				:key=i
				:icon-list="pack.icons"
				:family="pack.name"
				@icon-selected="selectIcon($event,pack.name)"
				@update:modelValue="insertIcon($event,pack.name)"
				:active-icon="iconValue.name"
				:active-family="iconValue.family"
			/>
		</div>
	</div>

</template>

<script>
import { useDataSets, IconPackGrid } from '@zb/components'

export default {
	name: 'IconsLibraryModalContent',
	components: {
		IconPackGrid
	},
	props: {
		modelValue: {
			type: Object,
			required: false
		},
		specialFilterPack: {
			type: Array,
			required: false
		}
	},
	setup () {
		const { dataSets } = useDataSets()

		return {
			dataSets
		}
	},
	data () {
		return {
			keyword: '',
			activeIcon: null,
			activeCategory: 'all'
		}
	},
	methods: {
		selectIcon (event, name) {
			this.activeIcon = event
			let icon = {
				family: name,
				name: this.activeIcon.name,
				unicode: this.activeIcon.unicode
			}
			this.$emit('update:modelValue', icon)
		},
		insertIcon (event, name) {
			this.activeIcon = event
			let icon = {
				family: name,
				name: this.activeIcon.name,
				unicode: this.activeIcon.unicode
			}
			this.$emit('selected', icon)
		}
	},
	computed: {
		iconValue () {
			return this.modelValue || {}
		},
		getPacks () {
			return this.dataSets.icons !== undefined ? this.dataSets.icons : []
		},
		searchModel: {
			get () {
				return this.keyword
			},
			set (newVal) {
				this.keyword = newVal
			}
		},
		filteredList () {
			let self = this
			if (this.keyword.length > 0) {
				let filtered = []
				for (const pack of this.packList) {
					let copyPack = { ...pack }
					const b = copyPack.icons.filter(icon =>
						icon.name.includes(self.keyword.toLowerCase())
					)
					copyPack.icons = [...b]
					filtered.push(copyPack)
				}
				return filtered
			} else return this.packList
		},
		getPlaceholder () {
			let a = `${this.$translate('search_for_icons')} ${this.getIconNumber} ${this.$translate('icons')}`
			return a
		},
		getIconNumber () {
			let iconNumber = 0
			for (const pack of this.packList) {
				let packNumber = pack.icons.length
				iconNumber = iconNumber + packNumber
			}
			return iconNumber
		},
		packList () {
			if (this.specialFilterPack !== undefined && this.specialFilterPack.length) {
				return this.specialFilterPack
			}
			if (this.activeCategory === 'all') {
				return this.getPacks
			} else {
				let newArray = []
				for (const pack of this.getPacks) {
					if (pack.id === this.activeCategory) {
						newArray.push(pack)
					}
				}
				return newArray
			}
		},
		packsOptions () {
			let options = [
				{
					name: 'All',
					id: 'all'
				}
			]
			if (this.specialFilterPack === undefined || !this.specialFilterPack.length) {
				this.getPacks.forEach((pack) => {
					let a = {
						name: pack.name,
						id: pack.id
					}
					options.push(a)
				})
			}

			return options
		}

	}
}
</script>
<style lang="scss">
.znpb-icon-pack-modal {
	display: flex;
	flex-direction: column;
	min-height: 500px;
	max-height: 470px;
	margin: 10px;

	&__search {
		display: flex;
		padding: 10px 10px 0;
		margin-bottom: 20px;

		.znpb-baseselect-overwrite {
			margin-right: 10px;
		}

		& > .znpb-editor-icon-wrapper {
			padding: 0 14px;
			cursor: pointer;
		}
	}
	&--has-special-filter {
		.znpb-icon-pack-modal__icons {
			min-height: 500px;
		}
	}
}
.znpb-icons-category-select {
	ul.znpb-baseselect-list {
		padding: 8px 0;
	}

	.znpb-baseselect-list__option {
		white-space: nowrap;
	}
}
</style>
