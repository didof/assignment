import tokenize from '../../utils/tokenize';
import pickRandomlyWithConstraints from '../../utils/pick_randomly_with_constraint';

/*
[1]
The instantiation of the decoder takes place via a factory. It needs the
encoded string, to be decoded, and a reference list containing the words
that have actually been encoded by the encoder.

	note: The threshold (default on 50%) is used in decreeing whether the
	supplied string can be considered actually encoded.

[2]
As in the encoder, the string is tokenized (see tokenize.js for more) and the
result compared with the list to decide if it is actually codified. [2.A]
Basically, all those whose word has less than 4 (excluded) characters are
excluded from the token list; it is the same principle used in the creation
of the word list with which the comparison is made. [2.B]
Subsequently, each word (of the token) is searched for in the list and if so,
a counter bears the sign. [2.C]
The percentage of non-coded words and the total number of words are calculated
(always excluding those less than 4 characters). [2.D]
If this percentage is less than the threshold, it results in the creation of an
invalid decoder. [2.E]
Otherwise the factory finalizes the creation of an active decoder. [2.F]

[3]
As in the case of the Encoder, the continuation of the functionality is
delegated to a method that can be called on the Decoder.
The following procedure is applied iteratively on each token. The decoding
operation (like the encoding one) makes the change directly in the token,
possibly adding a new "decoded" property.
Once the tokens that do not need to be decoded are excluded as they have not
been encrypted a priori ([3.A]), From the list of words provided, all those
that do not have the same initial letter and the same final letter of the token
under observation are filtered out. [3.B]
Immediately afterwards, it is checked whether only one of all the references
has survived. If yes, then the word must be coded to that. [3.C]
If there are still more references for the token, a skimming is made comparing
the length of the words with that of the token. [3.D]
Thus, again, it's check if only one reference stands.
As a last resort, a character is randomly extracted from the token core and
used as a discriminator in the search for those references that do not have it. [3.E]
However this is a process that can generate an infinite loop, so here too
(as in the encoder) I have arbitrarily assigned 10 max attempts per token. [3.F]
Reached the last attempt, the decoder decodes the token choosing among the remaining
references in a random way. [3.G]

[4]
The function that recomposes the token list is almost identical to that seen
in the encoder. The only difference is that in choosing the version of the word
to be returned, the token gives precedence to the one contained in the "decoded"
property. [4.A]
*/

export default class Decoder {
	isValid;
	value;
	originalList;

	constructor(tokenized, list, isValid = true) {
		this.value = tokenized;
		this.originalList = list;
		this.isValid = isValid;
	}

	static withCheck(encoded, list, threshold = 50) {
		// [1]
		const tokenized = tokenize(encoded); // [2]
		if (this.compare(tokenized, list, threshold)) {
			// [2.A]
			return new Decoder(tokenized, list); // [2.F]
		} else {
			return new Decoder(null, null, false); // [2.E]
		}
	}

	static compare(tokensFromEncoded, wordFromList, threshold) {
		const utilTokens = tokensFromEncoded.filter((token) => {
			// [2.B]
			return token.value.length > 3;
		});

		let notEncoded = 0;
		for (let i = 0; i < utilTokens.length; i++) {
			// [2.C]
			if (wordFromList.indexOf(utilTokens[i].value) >= 0) {
				notEncoded++;
			}
		}

		let rate = (notEncoded / utilTokens.length) * 100; // [2.D]

		// if the [notEncoded] words / (significant words number) is lower than
		// the threshold (default to 50), the input is considered not encoded,
		// thus it is raised an error
		return rate < threshold;
	}

	decode() {
		// [3]
		this.value.forEach((token) => {
			if (token.value.length <= 3) return; // [3.A]

			let references = [];

			references = this.refineReferencesByExcepts(token.value); // [3.B]
			if (this.checkIfIsDecoded(references, token)) return; // [3.C]

			references = this.refineReferenceByLength(token.value, references); // [3.D]
			if (this.checkIfIsDecoded(references, token)) return;

			const maxChances = 10; // [3.F]
			let chance = 0;
			while (chance < maxChances) {
				references = this.refineReferenceByCharSearch(token.value, references); // [3.E]
				if (this.checkIfIsDecoded(references, token)) return;
				chance++;
			}

			// [3.G]
			const random =
				references[pickRandomlyWithConstraints(0, references.length - 1)];
			token.decodedTo = random;
		});
	}

	checkIfIsDecoded(references, token) {
		if (references.length === 1) {
			token.decodedTo = references[0];
			return true;
		}
		return false;
	}

	refineReferencesByExcepts(input) {
		return this.originalList
			.filter((word) => {
				return word[0] === input[0];
			})
			.filter((word) => {
				return word[word.length - 1] === input[input.length - 1];
			});
	}

	refineReferenceByLength(input, referenceList) {
		return referenceList.filter((r) => {
			return r.length === input.length;
		});
	}

	refineReferenceByCharSearch(input, referenceList) {
		let coreIndex = pickRandomlyWithConstraints(1, input.length - 2);
		let randomCoreChar = input[coreIndex];
		return referenceList.filter((r) => {
			let charIsFound = false;
			for (let i = 0; i < r.length; i++) {
				if (r[i] === randomCoreChar) {
					charIsFound = true;
				}
			}
			return charIsFound;
		});
	}

	getOutput() {
		// [4]
		let output = '';
		this.value.forEach((token) => {
			output += token.preWhiteSpaces;
			output += token.specials.leftSpecials;
			output += token.version; // [4.A]
			output += token.specials.rightSpecials;
			output += token.whitespaces;
		});
		return output;
	}
}
