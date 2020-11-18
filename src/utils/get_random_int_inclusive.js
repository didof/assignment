/*
This function helper, provided with a minimum and a maximum, returns a
randomly chosen integer within the min-max range, including extremes.
*/

export default function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
