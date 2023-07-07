export class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
		this._authorization = config.headers.authorization;
	}

	getUserData() {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

    sendUserData(userData) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name: userData.profileName,
				about: userData.profileJob
			})
		})
			.then(this._handleResponse)
	}

    sendAvatarData(userAvatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				avatar: userAvatar.imageAvatar
			})
		})
			.then(this._handleResponse)
	}

	addNewCard({ name, link }) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ name, link })
		})
			.then(this._handleResponse)
	}

	getCards() {
		return fetch(`${this._url}/cards`, {
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

    putLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	// Удаление лайка
	deleteLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}
	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: '94c10f33-d262-4a4c-9a4b-3d7349d0a01e',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	_handleResponse(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Возникла ошибка: ${res.status}`)
		}
	}
}