import { state } from './constants.js';
import { getMatrixFromArray } from './matrix.js';

export const randomNum = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffleArray = (unshuffledArr) => {
	let shuffledArr = unshuffledArr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
	while (!isSolvable(shuffledArr)) {
		shuffledArr = unshuffledArr
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	}
	return shuffledArr;
};

const isSolvable = (arr) => {
	let count = 0;
	const trueArray = arr.filter((el) => el !== arr.length);
	for (let i = 0; i < trueArray.length; i++) {
		const currentCount = trueArray.filter((el, ind) => {
			return el < trueArray[i] && ind > i;
		}).length;
		count += currentCount;
	}
	const tempMatrix = getMatrixFromArray(arr, state.currentFrameSize);
	const blankPosition =
		tempMatrix.indexOf(
			tempMatrix.filter((el) => el.includes(arr.length))[0]
		) + 1;
	if (arr.length % 2 === 1) {
		return count % 2 === 0;
	} else {
		count += blankPosition;
		return count % 2 === 0;
	}
};
