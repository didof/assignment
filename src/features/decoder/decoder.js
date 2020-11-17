import tokenize from '../../utils/tokenize';
import pickRandomlyWithConstraints from '../../utils/pick_randomly_with_constraint';
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
		const tokenized = tokenize(encoded);
		if (this.compare(tokenized, list, threshold)) {
			return new Decoder(tokenized, list);
		} else {
			return new Decoder(null, null, false);
		}
	}

	static compare(tokensFromEncoded, wordFromList, threshold) {
		// since token with less than 3 char surely are not present in
		// wordFromList, it's more performant to filter them out.
		const utilTokens = tokensFromEncoded.filter((token) => {
			return token.value.length > 3;
		});

		let notEncoded = 0;
		for (let i = 0; i < utilTokens.length; i++) {
			if (wordFromList.indexOf(utilTokens[i]) >= 0) {
				notEncoded++;
			}
		}

		let rate = (notEncoded / utilTokens.length) * 100;

		// if the [notEncoded] words / (significant words number) is lower than
		// the threshold (default to 50), the input is considered not encoded,
		// thus it is raised an error
		return rate < threshold;
	}

	get isNotValid() {
		return !this.isValid;
	}

	decode() {
		this.value.forEach((token) => {
			if (token.value.length <= 3) return;

			let references = [];

			// 1. first round
			references = this.refineReferencesByExcepts(token.value);
			if (this.checkIfIsDecoded(references, token)) return;

			// 2. second round
			references = this.refineReferenceByLength(token.value, references);
			if (this.checkIfIsDecoded(references, token)) return;

			// 3. third round
			const maxChances = 3;
			let chance = 0;
			while (chance < maxChances) {
				references = this.refineReferenceByCharSearch(token.value, references);
				if (this.checkIfIsDecoded(references, token)) return;
				chance++;
			}

			// 4. last stand, pick randomly among the last references
			const random =
				references[pickRandomlyWithConstraints(0, references.length - 1)];
			console.log(random);
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
		let output = '';
		this.value.forEach((token) => {
			output += token.specials.leftSpecials;
			output += token.version;
			output += token.specials.rightSpecials;
			output += token.whitespaces;
		});
		return output;
	}
}
