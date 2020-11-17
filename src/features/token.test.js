const { default: Token } = require('./token');
const { default: Specials } = require('./specials');

describe('verifying the shuffling in different-length token', () => {
	test('shuffle should check if the token deserves to be shuffled', () => {
		const token = new Token('a', new Specials('', '', 0));
		const spy = jest.spyOn(token, 'doesntNeedToBeShuffled');

		token.shuffle();

		expect(spy).toHaveBeenCalled();
	});

	test('1 char text should not be shuffled', () => {
		const token = new Token('a', new Specials('', '', 0));
		const spy = jest.spyOn(token, 'doesntNeedToBeShuffled');

		token.shuffle();

		expect(spy).toBeTruthy();
	});

	test('2 chars text should not be shuffled', () => {
		const token = new Token('ab', new Specials('', '', 0));
		const spy = jest.spyOn(token, 'doesntNeedToBeShuffled');

		token.shuffle();

		expect(spy).toBeTruthy();
	});

	test('3 chars text should not be shuffled', () => {
		const token = new Token('ab', new Specials('', '', 0));
		const spy = jest.spyOn(token, 'doesntNeedToBeShuffled');

		token.shuffle();

		expect(spy).toBeTruthy();
	});

	test('4+ chars text should not be shuffled', () => {
		const token = new Token('a', new Specials('', '', 0));
		const spy = jest.spyOn(token, 'doesntNeedToBeShuffled');

		token.shuffle();

		expect(spy).toBeFalsy();
	});
});
