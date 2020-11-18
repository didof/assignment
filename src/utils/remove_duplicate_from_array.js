/*
Array.prototype.filter can be used to remove duplicates from a list.
In its callback, the element under evaluation is received in first position and,
optionally, the index in second position.
Therefore by setting up a test that uses indexOf (which I remember,
it starts reading from left to right) it is possible to exclude any duplication.
i.g. 	const list = ['A', 'B', 'C', 'A'];
In this case, at the fourth iteration, the reading element (A) has associated
index 3. However, an identical element is already present in the list, but
in position 0. Therefore the test will fail and this element will be filtered
out.
*/

export default function removeDuplicateFromList(list) {
	return list.filter((v, i) => {
		const test = list.indexOf(v) === i;
		return test;
	});
}
