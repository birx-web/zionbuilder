<template>
	<div class="znpb-gradient-dragger-wrapper">
		<Tooltip
			:show="showPicker"
			:trigger="null"
			placement="top"
		>
			<span
				ref="gradientCircle"
				class="znpb-gradient-dragger"
				:style="colorPosition"
				@dblclick="openColorPicker"
			/>

			<template v-slot:content>
				<ColorPicker
					v-if="showPicker"
					ref="colorpickerHolder"
					:parent-position="parentPosition"
					:model="computedValue.color"
					@color-changed="colorValue = $event"
					:show-library="false"
				/>
			</template>
		</Tooltip>

	</div>
</template>
<script>
import { ColorPicker } from '../Colorpicker'
import { Tooltip } from '@zionbuilder/tooltip'

export default {
	name: 'GradientDragger',
	components: {
		ColorPicker,
		Tooltip
	},
	props: {
		modelValue: {
			type: Object
		}
	},
	data () {
		return {
			showPicker: false,
			circlePos: null
		}
	},
	computed: {
		computedValue: {
			get () {
				return this.modelValue
			},
			set (newValue) {
				this.$emit('update:modelValue', newValue)
			}
		},
		colorValue: {
			get () {
				return this.computedValue.color
			},
			set (newValue) {
				this.computedValue = {
					...this.computedValue,
					color: newValue
				}
			}
		},
		colorPosition () {
			const cssStyles = {
				left: this.computedValue.position + '%',
				background: this.computedValue.color
			}
			return cssStyles
		},
		parentPosition () {
			return {
				left: this.circlePos.left,
				top: this.circlePos.top
			}
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.circlePos = this.$refs.gradientCircle.getBoundingClientRect()
		})
	},
	methods: {
		openColorPicker () {
			this.showPicker = true
			this.$emit('color-picker-open', true)
			document.addEventListener('mousedown', this.closePanelOnOutsideClick)
		},
		closePanelOnOutsideClick (event) {
			if (!this.$refs.colorpickerHolder.$el.contains(event.target)) {
				this.showPicker = false

				document.removeEventListener('mousedown', this.closePanelOnOutsideClick)
				this.$emit('color-picker-open', false)
			}
		}
	},

	unmounted () {
		document.removeEventListener('mousedown', this.closePanelOnOutsideClick)
	}
}
</script>
<style lang="scss" scoped>
.znpb-gradient-dragger {
	@include circlesimple(12px);
	position: absolute;
	top: 0;
	left: 0;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
	border: 2px solid #fff;
	transform: translate(-50%, 150%);
}
</style>
