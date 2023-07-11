export class Section {
	constructor({ renderer }, selector) {
		this._renderer = renderer;
		this._container = selector;
	}

	renderItems(res) {
		res.forEach(item => this._renderer(item))
	}

	addItem(element) {
		this._container.append(element);
	}

	addNewItem(element) {
		this._container.prepend(element)
	}
}