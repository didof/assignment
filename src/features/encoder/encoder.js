import tokenize from '../../utils/tokenize';
import removeDuplicateFromList from '../../utils/remove_duplicate_from_array';

/*
The constructor of the encoder, which accepts a string, saves the result of the
tokenization operation in the "value" property.

[1]
Basically the tokenize function reads the string from the first character to
the last, creating a new Token object for each word encountered. 
Each token, in addition to exposing the word (to be clear, only letters and
numbers), exhibits several other properties, including "specials".
In this property the tokenizer saves special characters, noting whether they 
were at the beginning or at the end of the word. It also associates whitespaces
following the word.
In this way you can make any changes to the word itself, undisturbed by special
characters. However, once the desired operations are completed, it is easy to
read the tokens and recompose the encoded string keeping the position of the special
characters unchanged (as requested);
(see tokenize.js for more)

[2]
Thus, at the time of instantiation, the encoder has a token list.
The progress in the encoding process is entrusted to the encode method, callable
from the "outside" (precisely in the method "primaryActionHandler" in "App.js").

[3]
Rather than creating a fresh copy of the shuffled token list, I preferred to
delegate the shuffling and retention of the result to the token itself.

In order to fully appreciate the functioning of the following methods it is
necessary to observe the functioning of the token. (token.js)

[4]
From the outside, the output is required, ie a string where all words with
length greater than 4 are encoded, punctuation and whitespace are left untouched.
Considering the organization of the token object, it is easy to recompose the
final string by reading for each token first any special characters on the left,
then the word itself, the characters on the right, the spaces that follow.

	note: In the case of the first and only the first token, the getter
	"preWhiteSpaces" may or may not be present; this is due to the desire to
	keep any whitespace at the beginning of the input string. [4.A]

	note: Since a token whose word length is less than 4 (excluded) does not
	have the "shuffled" property, a "version" getter decides within the toke
	whether it is appropriate to provide "shuffled" rather than the original,
	"value". [4.B]

[5]
The functionality of the Decoder (decoder.js) is prerogative to receive a list
containing the words (only strings, not tokens!) that have actually been encoded.
It is easily obtained by filtering the list of tokens associated with the Encoder
and mapping the result to a list of strings.
*/

export default class Encoder {
	value;
	constructor(string) {
		// methods binding
		this.encode = this.encode.bind(this);
		this.getOutput = this.getOutput.bind(this);
		this.retrieveOriginalFromShuffled = this.retrieveOriginalFromShuffled.bind(
			this
		);

		// elaborating input
		this.value = tokenize(string); // [1]
	}

	encode() {
		// [2]
		this.value.forEach((token) => {
			token.shuffle(); // [3]
		});
	}

	getOutput() {
		// [4]
		let output = '';
		this.value.forEach((token) => {
			output += token.preWhiteSpaces; // [4.A]
			output += token.specials.leftSpecials;
			output += token.version; // [4.B]
			output += token.specials.rightSpecials;
			output += token.whitespaces;
		});
		return output;
	}

	retrieveOriginalFromShuffled() {
		// [5]
		const listWithDuplicate = this.value
			.filter((token) => {
				return 'shuffled' in token;
			})
			.map((token) => token.value);

		return removeDuplicateFromList(listWithDuplicate);
	}
}
