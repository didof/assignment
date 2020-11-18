// TODO change shuffled in encoded

/*
[1]
At the time of creation (which I remember, it happens when the Encoder is
instantiated) the word with its special characters on the left and right,
and also the white spaces following the word, are separated in several
properties. This makes it easy to find and use them.
i.g. 	input -> "!hello?%  "
		output -> {
			value: "hello",
			specials: {
				left: "!",
				right: "?%"
				whitespaces: 2,
			}
		}
	note: in reality the field specials uses an object, just Specials, but the
	same result could have been obtained with a plain object.

[2]
As in the case of the encoder, where the continuation is delegated to a
call made on the instance, the shuffling process must also be called in the
token.

[3]
First of all, a guard checks that the word actually needs to be shuffled.
Since the indications provided specify to leave the first and last letter
untouched, it follows that any word under 4 letters (excluding 4) should not
be touched. (see "doesntNeedToBeShuffled" method for clarification).

[4]
In the case of words that have passed the guard, it is necessary to exempt
the first and last letter, thus obtaining the core of the word.

[5]
So it is on this core that the characters are shuffled.
In the case of a 4 letter word, so a core of two, the result is only one:
for this reason I can "manually" swap the two letters. [5.A]
In any other case the shuffling is operated randomly thanks to the synergy of
Math.random and Array.prototype.sort [5.B]

Depending on the composition of the core there is a possibility that the
output equals the input. Therefore the shuffling operation is repeated until a
different result from the input is obtained. [5.C]
However in the case of a word like "abbba", no matter how many shufflings are
performed, the result will always be "abbba". Therefore, to avoid an infinite
loop I have set a maximum of 10 attempts.
It is arbitrary, however considering the average length of the words
(Italian and English language at least) I think it is prababilistically
appropriate.

note: Nothing detracts from the fact that an additional guard could be added to
check if the letters of the core are all the same, so if it is worth doing the
shuffle.

[6]
The various pieces are simply glued in the right order. It is important that the
result is saved in a new property, "shuffled"; this way you can still access the
original version of the word.
*/

export default class Token {
	value;
	specials;
	shuffled;
	decoded;
	constructor(value, specials) {
		// [1]
		this.value = value;
		this.specials = specials;
	}

	shuffle() {
		// [2]
		if (this.doesntNeedToBeShuffled()) return; // [3]

		const { exempted, core } = this.disassembler(); // [4]
		let shuffledCore = core;
		let chance = 10;
		while (chance !== 0 && shuffledCore === core) { // [5.C]
			shuffledCore = this.shuffleCore(core);
			chance--;
		}
		this.shuffled = this.reassembler(exempted, shuffledCore); // [6]
	}

	shuffleCore(core) {
		let outcome;
		switch (core.length) {
			case 1: // should never get here since there is a guard before this method
				outcome = core;
				break;
			case 2: // [5.A]
				outcome = core[1] + core[0]; 
				break;
			default: // [5.B]
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
