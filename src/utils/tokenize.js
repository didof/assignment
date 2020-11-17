import Token from '../features/token';
import Specials from '../features/specials';

// TODO in the example: "test  !hello", the "!" is assignet to rightSpecials test
// block the reading of word not only on default chars, but also on specials

export default function tokenize(input) {
	function addToken() {
		const token = new Token(
			word,
			new Specials(leftSpecials, rightSpecials, whiteSpaceMet)
		);
		if (preWhitespace > 0) {
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

	// applyed only on the first token
	let preWhitespace = 0;

	let whiteSpaceMet = 0;
	let leftSpecials = '';
	let rightSpecials = '';

	for (let i = 0; i < splitted.length; i++) {
		let char = splitted[i];

		if (char === ' ') {
			if (word.length !== 0) {
				whiteSpaceMet++;
			} else {
				preWhitespace++;
			}
		} else if (isSpecial(char)) {
			if (word.length > 0) {
				if (whiteSpaceMet > 0) {
					addToken();
					leftSpecials = char;
				} else {
					rightSpecials += char;
				}
			} else {
				leftSpecials += char;
			}
		} else {
			if (whiteSpaceMet > 0) {
				addToken();
				word = char;
			} else {
				word += char;
			}
		}
	}
	addToken();
	return tokens;
}
