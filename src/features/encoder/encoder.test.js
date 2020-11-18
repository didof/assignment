const { default: Encoder } = require('./encoder');

describe('verify the correct behaviour of the Encoder class', () => {
	test('value property should contain an array of tokens after initialization', () => {
		const encoder = new Encoder('test, tests, more tests!');

		expect(encoder.value).toBeTruthy();
		expect(typeof encoder.value).toBe('object');
		expect(encoder.value.length).toEqual(4);
	});

	test('getOutput method should return a string', () => {
		const encoder = new Encoder('test');
		encoder.encode();

		const spy = jest.spyOn(encoder, 'getOutput');

		const outcome = encoder.getOutput();

		expect(outcome).toBeTruthy();
		expect(outcome).toStrictEqual('tset');
		expect(spy).toHaveBeenCalled();
	});

	test('retrieveOriginalFromShuffled method should return an array of strings', () => {
		const encoder = new Encoder('head body shoulders');
		const expected = ['head', 'body', 'shoulders'];

		encoder.encode();

		const spy = jest.spyOn(encoder, 'retrieveOriginalFromShuffled');
		const outcome = encoder.retrieveOriginalFromShuffled();

		expect(outcome).toBeTruthy();
		expect(outcome).toStrictEqual(expected);
		for (let i = 0; i < outcome.length; i++) {
			expect(typeof outcome[i]).toBe('string');
		}
		expect(spy).toHaveBeenCalled();
	});

	test('in case of duplicates the list should contain only one copy', () => {
		const encoder = new Encoder('clone clone clone');
		const expected = ['clone'];

		encoder.encode();
		const outcome = encoder.retrieveOriginalFromShuffled();

		expect(outcome).toStrictEqual(expected);
	});

	test('the list should not contain any word with less than 4 chars', () => {
		const encoder = new Encoder('a bc def fghi');
		const expected = ['fghi'];

		encoder.encode();
		const outcome = encoder.retrieveOriginalFromShuffled();

		expect(outcome).toStrictEqual(expected);
	});
});
