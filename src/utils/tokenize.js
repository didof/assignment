import Token from '../features/token';
import Specials from '../features/specials';

// TODO in the example: "test  !hello", the "!" is assignet to rightSpecials test
// block the reading of word not only on default chars, but also on specials

/*
The tokenizer receives a string as input. This is read iteratively, from the
first to the last character. According to its nature, different behaviors are
applied.
If it is a letter or a number, the character is added to a word variable [1]
When a space is encountered the space counter is incremented. [2]
If a new character (letter or number) or a special character is encountered
after a space, the word is finished. Therefore the token based on the actual
state is created and placed in the list that will be returned at the end [3]
When a special character is encountered, just check if the word variable is
different from an empty string: if it is, it means that the word is already
in progress and that the special character is at the end of the word.
Otherwise left. [4]
A caution is made regarding the first word. It is in fact the only one whose
token can have the prewhitespace property, therefore spaces to the left of the
word itself. After using the function that creates the token for the first time,
it is no longer possible to assign this property to any subsequent token. [5]
*/

export default function tokenize(input) {
	function addToken() {
		const token = new Token(
			word,
			new Specials(leftSpecials, rightSpecials, whiteSpaceMet)
		);
		if (isFirstWord && preWhitespace > 0) {
			// [5]
			token.specials.pre = preWhitespace;
		}
		tokens.push(token);
		reset();
	}

	function reset() {
		whiteSpaceMet = 0;
		leftSpecials = '';
		rightSpecials = '';
		word = '';

		isFirstWord = false; 	// [5]
		preWhitespace = 0; 		// [5]
	}

	function isSpecial(char) {
		switch (char) {
			case '!':
			case '?':
			case ',':
			case ';':
			case '.':
			case '"':
			case "'":
			case '$':
			case '%':
			case '&':
			case '/':
			case '\\':
			case '(':
			case ')':
			case '=':
			case '|':
			case '+':
			case '-':
			case '#':
			case '{':
			case '}':
			case 'ç':
			case '@':
			case '€':
				return true;
			default:
				return false;
		}
	}

	const splitted = input.split('');
	let tokens = [];

	let word = '';
	let isFirstWord = true;

	// applyed only on the first token
	let preWhitespace = 0;

	let whiteSpaceMet = 0;
	let leftSpecials = '';
	let rightSpecials = '';

	for (let i = 0; i < splitted.length; i++) {
		let char = splitted[i];

		if (char === ' ') {
			if (word.length !== 0) {
				whiteSpaceMet++; // [2]
			} else {
				if (isFirstWord) {
					preWhitespace++;
				}
			}
		} else if (isSpecial(char)) {
			if (word.length > 0) {
				if (whiteSpaceMet > 0) {
					addToken(); // [3]
					leftSpecials = char; // [4]
				} else {
					rightSpecials += char; // [4]
				}
			} else {
				leftSpecials += char;
			}
		} else {
			if (whiteSpaceMet > 0) {
				addToken(); // [3]
				word = char;
			} else {
				word += char; // [1]
			}
		}
	}
	addToken();
	return tokens;
}
