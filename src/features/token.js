// TODO change shuffled in encoded

export default class Token {
	value;
	specials;
	shuffled;
	decoded;
	constructor(value, specials) {
		this.value = value;
		this.specials = specials;
	}

	shuffle() {
		if (this.doesntNeedToBeShuffled()) return;
		const { exempted, core } = this.disassembler();
		const shuffledCore = this.shuffleCore(core);
		this.shuffled = this.reassembler(exempted, shuffledCore);
	}

	shuffleCore(core) {
		let outcome;
		switch (core.length) {
			case 1:
				outcome = core;
				break;
			case 2:
				outcome = core[1] + core[0];
				break;
			default:
				outcome = core
					.split('')
					.sort(() => Math.random() - 0.5)
					.join('');
		}
		return outcome;
	}

	disassembler() {
		const arr = this.value.split('');
		const exempted = { first: arr[0], last: arr[arr.length - 1] };
		arr.pop();
		arr.shift();
		const core = arr.join('');
		return { exempted, core };
	}

	reassembler(exempted, core) {
		return exempted.first + core + exempted.last;
	}

	doesntNeedToBeShuffled() {
		// 1. a     -> [do not shuffle]
		// 2. ab    -> [do not shuffle]
		// 3. abc   -> [do not shuffle]
		// 4. abcd  -> acbd
		// 5. abcde -> dynamically shuffle
		return this.value.length < 4;
	}

	get props() {
		return [this.value, this.specials, this.shuffled];
	}

	get version() {
		if ('decoded' in this) {
			return this.decoded;
		} else if ('shuffled' in this) {
			return this.shuffled;
		} else {
			return this.value;
		}
	}

	get whitespaces() {
		return this.specials.whitespaceChars;
	}

	get preWhiteSpaces() {
		let outcome = '';
		for (let i = 0; i < this.specials.pre; i++) {
			outcome += ' ';
		}
		return outcome;
	}

	set decodedTo(input) {
		this.decoded = input;
	}
}
