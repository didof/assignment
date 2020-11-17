const { default: Specials } = require('../features/specials');
const { default: Token } = require('../features/token');
const { default: tokenize } = require('./tokenize');

describe('verifying the creation of single token', () => {
	test('should create a token from given word', () => {
		const token = tokenize('test')[0];
		const expected = new Token('test', new Specials('', '', 0));

		expect(token).toStrictEqual(expected);
	});

	test('should create a token with 2 whitespaces', () => {
		const token = tokenize('test  ')[0];
		const expected = new Token('test', new Specials('', '', 2));

		expect(token).toStrictEqual(expected);
	});

	test('should create a token keeping the whitespace that precedes it', () => {
		const token = tokenize('   test')[0];
		const expected = new Token('test', new Specials('', '', 0));
		expected.specials.pre = 3;

		expect(token).toStrictEqual(expected);
	});

	test('should create a token with specialRight "!"', () => {
		const token = tokenize('test!')[0];
		const expected = new Token('test', new Specials('', '!', 0));

		expect(token).toStrictEqual(expected);
	});

	test('should create a token with specialLeft "?"', () => {
		const token = tokenize('?test')[0];
		const expected = new Token('test', new Specials('?', '', 0));

		expect(token).toStrictEqual(expected);
	});

	test('should create a token with specialLeft "*" && specialRight "€', () => {
		const token = tokenize('!test€')[0];
		const expected = new Token('test', new Specials('!', '€', 0));

		expect(token).toStrictEqual(expected);
	});
});

describe('verifying the creation of more than one tokens', () => {
	test('should create an array that contains two separate tokens', () => {
		const tokens = tokenize('one two');
		const t1 = new Token('one', new Specials('', '', 1));
		const t2 = new Token('two', new Specials('', '', 0));

		expect(tokens).toStrictEqual([t1, t2]);
	});

	test('should create an array that contains two separate tokens, assigning specials to the right owner', () => {
		const tokens = tokenize('one! ?two%');
		const t1 = new Token('one', new Specials('', '!', 1));
		const t2 = new Token('two', new Specials('?', '%', 0));

		expect(tokens).toStrictEqual([t1, t2]);
	});
});
