const { default: Specials } = require('../features/specials');
const { default: Token } = require('../features/token');
const { default: tokenize } = require('./tokenize');

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
	const token = tokenize('*test€')[0];
	const expected = new Token('test', new Specials('*', '€', 0));

	expect(token).toStrictEqual(expected);
});
