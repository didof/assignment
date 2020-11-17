import tokenize from '../../utils/tokenize';
import removeDuplicateFromList from '../../utils/remove_duplicate_from_array';
export default class Encoder {
	value;
	constructor(value) {
		// methods binding
		this.encode = this.encode.bind(this);
		this.getOutput = this.getOutput.bind(this);
		this.retrieveOriginalFromShuffled = this.retrieveOriginalFromShuffled.bind(
			this
		);

		// elaborating input
		this.value = tokenize(value);
	}

	encode() {
		this.value.forEach((token) => {
			token.shuffle();
		});
	}

	getOutput() {
		let output = '';
		this.value.forEach((token) => {
			output += token.preWhiteSpaces;
			output += token.specials.leftSpecials;
			output += token.version;
			output += token.specials.rightSpecials;
			output += token.whitespaces;
		});
		return output;
	}

	retrieveOriginalFromShuffled() {
		const listWithDuplicate = this.value
			.filter((token) => {
				return 'shuffled' in token;
			})
			.map((token) => token.value);

		return removeDuplicateFromList(listWithDuplicate);
	}
}
