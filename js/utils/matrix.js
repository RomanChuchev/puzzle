import { state } from './constants.js';

export const getMatrixFromArray = (arr, matrixSideSize) => {
	const matrix = [];

	for (let i = 0; i < matrixSideSize; i++) {
		matrix.push([]);
	}

	let y = 0,
		x = 0;

	for (let i = 0; i < arr.length; i++) {
		if (x >= matrixSideSize) {
			y++;
			x = 0;
		}
		matrix[y][x] = arr[i];
		x++;
	}
	return matrix;
};

export const findItemCoords = (number, matrix) => {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == number) {
				return { y, x };
			}
		}
	}
	return null;
};

export const checkIsValidToSwap = (clicked, blank) => {
	const xDiff = Math.abs(clicked.x - blank.x);
	const yDiff = Math.abs(clicked.y - blank.y);

	return (
		(xDiff === 1 || yDiff === 1) &&
		(clicked.x === blank.x || clicked.y === blank.y)
	);
};

export const swapItems = (clicked, blank, matrix) => {
	const temp = matrix[clicked.y][clicked.x];
	matrix[clicked.y][clicked.x] = matrix[blank.y][blank.x];
	matrix[blank.y][blank.x] = temp;
};

export const isSuccess = (matrix) => {
	const matrixFlat = matrix.flat();
	for (let i = 0; i < matrixFlat.length; i++) {
		if (matrixFlat[i] !== state.winnerCombination[i]) {
			return false;
		}
	}
	return true;
};
