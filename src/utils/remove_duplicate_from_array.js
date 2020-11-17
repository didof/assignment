export default function removeDuplicateFromList(list) {
	return list.filter((v, i) => {
		return list.indexOf(v) === i;
	});
}
