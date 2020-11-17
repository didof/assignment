export default class CustomString {
	value;
	constructor(value) {
		this.value = value;
	}

	removeLastChar() {
		let stringToArray = this.value.split('');
		stringToArray.pop();
		return stringToArray.join('');
	}
}
