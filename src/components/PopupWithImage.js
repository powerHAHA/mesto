import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
	constructor(popupElement) {
		super(popupElement);

		this._nameCard = this._popup.querySelector('.popup__caption');
		this._srcCard = this._popup.querySelector('.popup__img');
	}

	open(imageData) {
		this._nameCard.textContent = imageData.name;
		this._srcCard.src = imageData.link;
		this._srcCard.alt = imageData.name;
 		super.open();
	}
}