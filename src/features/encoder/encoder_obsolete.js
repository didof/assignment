/// My first approach was to work on input in text form.
// I switched to a tokenization - based approach of words,
// associating each with a metadata package that brings info about whitespace
// and punctuation.

// export default class EncoderBasedOnString {
// 	input;
// 	output = '';
// 	shuffledWords = [];
// 	constructor(input) {
// 		this.input = input;

// 		this.totalTrim = this.totalTrim.bind(this);
// 		this.coreShuffle = this.coreShuffle.bind(this);
// 		this.addShuffledWord = this.addShuffledWord.bind(this);
// 	}

// 	static removeCharAtIndex(index) {
// 		console.log(`removing at ${index}`);
// 		this.input.splice(index, 1);
// 	}

// 	totalTrim() {
// 		const arr = this.input
// 			.trim()
// 			.split(' ')
// 			.filter((word) => {
// 				return word !== '';
// 			});
// 		this.input = arr.join(' ');
// 	}

// 	coreShuffle() {
		// function disassembler(input) {
		// 	const arr = input.split('');
		// 	const exempted = { first: arr[0], last: arr[arr.length - 1] };
		// 	arr.pop();
		// 	arr.shift();
		// 	return [exempted, arr.join('')];
		// }

		// function riassembler(exempted, core) {
		// 	return exempted.first + core + exempted.last;
		// }

		// function shuffle(input, original) {
		// 	let outcome;
		// 	switch (input.length) {
		// 		case 1:
		// 			outcome = input;
		// 			break;
		// 		case 2:
		// 			outcome = input[1] + input[0];
		// 			this.addShuffledWord(original);
		// 			break;
		// 		default:
		// 			outcome = input
		// 				.split('')
		// 				.sort(() => Math.random() - 0.5)
		// 				.join('');
		// 			// if (outcome === input) outcome = shuffle(input);
		// 			this.addShuffledWord(original);
		// 	}
		// 	return outcome;
		// }

// 		const arrWords = this.input.split(' ');
// 		const shuffledWords = arrWords.map((word) => {
// 			if (word.length <= 2) return word;
// 			let disassembled = disassembler(word);
// 			let shuffled = shuffle.call(this, disassembled[1], word);
// 			return riassembler(disassembled[0], shuffled);
// 		});
// 		this.output = shuffledWords.join(' ');
// 	}

// 	addShuffledWord(word) {
// 		this.shuffledWords.push(word);
// 	}

// 	getInput(log) {
// 		if (log) console.log(`input: ${this.input}`);
// 		return this.input;
// 	}

// 	getOutput(log) {
// 		if (log) console.log(`output: ${this.output}`);
// 		return this.output;
// 	}

// 	getShuffledWords(log) {
// 		if (log)
// 			console.log(
// 				`shuffledWords: ${
// 					this.shuffledWords.length > 0 ? this.shuffledWords : 'none'
// 				}`
// 			);
// 		return this.shuffledWords;
// 	}
// }
