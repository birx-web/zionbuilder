import Model from './Model'
import { forEach, find, filter } from 'lodash-es'
import { reactive } from 'vue'

export default class Collection {
	models: Model[] = reactive([])

	constructor(data = []) {
		this.add(data)
	}

	getModel() {
		return Model
	}

	add(data: { [key: string]: any }): void
	add(data: Model): void {
		const validModel = this.getModel()
		if (typeof data === typeof validModel) {
			this.models.push(data)
		} else if (Array.isArray(data)) {
			forEach(data, (value) => {
				this.models.push(new validModel(value, this))
			})
		} else {
			this.models.push(new validModel(data, this))
		}
	}

	remove(data: Model): void {
		const validModel = this.getModel()
		let index = validModel.indexOf(data)
		if (index !== -1) {
			validModel.splice(index, 1)
		}
	}

	find(where) {
		return find(this.models, where);
	}

	filter(where) {
		return filter(this.models, where);
	}
}