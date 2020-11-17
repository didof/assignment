const { default: Token } = require('./token');
const { default: Specials } = require('./specials');

describe('verify the correct behaviour of the disassembler method', () => {
	test('should return correct outcome', () => {
		const token = new Token('abcd', new Specials('', '', 0));
		const expected = {
			exempted: {
				first: 'a',
				last: 'd',
			},
			core: 'bc',
		};

		const outcome = token.disassembler();

		expect(outcome).toEqual(expected);
	});
});

describe('verify the correct behaviour of the shuffleCore method', () => {
	test('should be called with correct input', () => {
		const token = new Token('abcd', new Specials('', '', 0));
		const spy = jest.spyOn(token, 'shuffleCore');
		const expected = 'bc';

		token.shuffle();

		expect(spy).toBeCalledWith(expected);
	});

	test('should invert the core chars', () => {
		const token = new Token('abcd', new Specials('', '', 0));
		const expected = 'cb';

		const outcome = token.shuffleCore('bc');

		expect(outcome).toBe(expected);
	});

	test('should return one of some defined outputs', () => {
		const token = new Token('abcde', new Specials('', '', 0));
		const expectedCombinations = ['bcd', 'bdc', 'cbd', 'cdb', 'dbc', 'dcb'];

		const outcome = token.shuffleCore('bcd');

		expect(expectedCombinations).toContain(outcome);
	});
});

describe('verify the correct behaviour of the resassembler method', () => {
	test('should be called with correct input', () => {
		const token = new Token('abcd', new Specials('', '', 0));
		const disassembled = token.disassembler();
		const shuffledCore = token.shuffleCore(disassembled.core);

		const spy = jest.spyOn(token, 'reassembler');

		token.shuffle();

		expect(spy).toBeCalledWith(disassembled.exempted, shuffledCore);
	});
});

describe('verify the correct behaviour of the shuffle method', () => {
	describe('verify thath it triggers the right calling sequence', () => {
		test('shuffle of a 1 char token should only trigger doesntNeedToBeShuffled method', () => {
			const token = new Token('a', new Specials('', '', 0));
			const spy1 = jest.spyOn(token, 'doesntNeedToBeShuffled');
			const spy2 = jest.spyOn(token, 'disassembler');
			const spy3 = jest.spyOn(token, 'shuffleCore');
			const spy4 = jest.spyOn(token, 'reassembler');

			token.shuffle();

			expect(spy1).toHaveBeenCalled();
			expect(spy2).not.toHaveBeenCalled();
			expect(spy3).not.toHaveBeenCalled();
			expect(spy4).not.toHaveBeenCalled();
		});

		test('shuffle of a 2 char token should only trigger doesntNeedToBeShuffled method', () => {
			const token = new Token('ab', new Specials('', '', 0));
			const spy1 = jest.spyOn(token, 'doesntNeedToBeShuffled');
			const spy2 = jest.spyOn(token, 'disassembler');
			const spy3 = jest.spyOn(token, 'shuffleCore');
			const spy4 = jest.spyOn(token, 'reassembler');

			token.shuffle();

			expect(spy1).toHaveBeenCalled();
			expect(spy2).not.toHaveBeenCalled();
			expect(spy3).not.toHaveBeenCalled();
			expect(spy4).not.toHaveBeenCalled();
		});

		test('shuffle of a 3 char token should only trigger doesntNeedToBeShuffled method', () => {
			const token = new Token('abc', new Specials('', '', 0));
			const spy1 = jest.spyOn(token, 'doesntNeedToBeShuffled');
			const spy2 = jest.spyOn(token, 'disassembler');
			const spy3 = jest.spyOn(token, 'shuffleCore');
			const spy4 = jest.spyOn(token, 'reassembler');

			token.shuffle();

			expect(spy1).toHaveBeenCalled();
			expect(spy2).not.toHaveBeenCalled();
			expect(spy3).not.toHaveBeenCalled();
			expect(spy4).not.toHaveBeenCalled();
		});

		test('shuffle of a 4 char token should trigger all 4 methods involved', () => {
			const token = new Token('abcd', new Specials('', '', 0));
			const spy1 = jest.spyOn(token, 'doesntNeedToBeShuffled');
			const spy2 = jest.spyOn(token, 'disassembler');
			const spy3 = jest.spyOn(token, 'shuffleCore');
			const spy4 = jest.spyOn(token, 'reassembler');

			token.shuffle();

			expect(spy1).toHaveBeenCalled();
			expect(spy2).toHaveBeenCalled();
			expect(spy3).toHaveBeenCalled();
			expect(spy4).toHaveBeenCalled();
		});
	});
	describe('verify the correctness of the output', () => {
		test('property "shuffled" should not exist if value.length <= 3', () => {
			const token = new Token('abc', new Specials('', '', 0));
			token.shuffle();

			const outcome = token.shuffled;

			expect(outcome).toBeFalsy();
			expect(token).not.toHaveProperty('shuffled');
		});

		test('property "shuffled" should exist if value.length > 3', () => {
			const token = new Token('abcd', new Specials('', '', 0));

			token.shuffle();

			const outcome = token.shuffled;

			expect(outcome).toBeTruthy();
			expect(token).toHaveProperty('shuffled');
		});

		test('should save correct shuffled version in shuffled property', () => {
			const token = new Token('abcd', new Specials('', '', 0));
			const expected = 'acbd';

			token.shuffle();

			expect(token.shuffled).toBe(expected);
		});

		test('should save one of some defined outputs in shuffled property', () => {
			const token = new Token('abcde', new Specials('', '', 0));
			const expectedCombinations = [
				'abcde',
				'abdce',
				'acbde',
				'acdbe',
				'adbce',
				'adcbe',
			];

			token.shuffle();

			expect(expectedCombinations).toContain(token.shuffled);
		});
	});
});
