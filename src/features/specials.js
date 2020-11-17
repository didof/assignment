export default class Specials {
	leftSpecials;
	rightSpecials;
	whitespaces;
	preWhitespace; // only present on first token
	constructor(left, right, white) {
		this.leftSpecials = left;
		this.rightSpecials = right;
		this.whitespaces = white;
	}

	set pre(num) {
		this.preWhitespace = num;
	}

	get pre() {
		return this.preWhitespace;
	}

	get whitespaceChars() {
		let output = '';
		for (let i = 0; i < this.whitespaces; i++) {
			output += ' ';
		}
		return output;
	}
}
