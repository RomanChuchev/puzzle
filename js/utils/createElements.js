import { btnMatrix, table, tableBtns, tableBtnValues } from '../main.js';
import { setMatrixBtnsPosition } from './btnPositioning.js';
import { state } from './constants.js';
import { getMatrixFromArray } from './matrix.js';
import { randomNum, shuffleArray } from './randomizer.js';

export const createElem = ({
	tag,
	classN,
	parent = '',
	attributes = '',
	inner = '',
	txtContent = '',
	data = ''
}) => {
	const elem = document.createElement(tag);
	if (classN) elem.className = classN;
	if (inner) elem.innerHtml = inner;
	if (txtContent) elem.textContent = txtContent;
	if (attributes) {
		for (let attr in attributes) {
			elem.setAttribute(attr, attributes[attr]);
		}
	}
	if (data) {
		for (let attr in data) {
			elem.dataset[attr] = data[attr];
		}
	}
	if (parent) parent.appendChild(elem);
	return elem;
};

export const createElemsArray = ({ arraySize, callback, parent = '' }) => {
	const array = [...Array(arraySize)].map(callback);
	if (parent) {
		for (let elem of array) {
			parent.appendChild(elem);
		}
	}
	return array;
};

export const generateBtnsCallback = (el, ind, arr) => {
	el = createElem({
		tag: 'button',
		classN: 'table__btn',
		txtContent: ind + 1,
		data: {
			matrixId: ind + 1
		},
		attributes: {
			style: `width:${100 / state.currentFrameSize}%; height:${
				100 / state.currentFrameSize
			}%; background-image:url("./assets/img/wood${randomNum(
				1,
				7
			)}.jpg")`,
			draggable: 'true',
			tabIndex: '-1'
		}
	});
	if (arr.length < 10) el.style.fontSize = '7em';
	else if (arr.length < 17) el.style.fontSize = '4.65em';
	else if (arr.length < 26) el.style.fontSize = '3.3em';
	else if (arr.length < 37) el.style.fontSize = '2.75em';
	else if (arr.length < 50) el.style.fontSize = '2em';
	else if (arr.length < 65) el.style.fontSize = '1.7em';
	if (ind === arr.length - 1) el.style.display = 'none';
	return el;
};

export const generateNewTable = () => {
	table.innerHTML = '';
	tableBtns.value = createElemsArray({
		arraySize: state.currentFrameSize * state.currentFrameSize,
		callback: generateBtnsCallback,
		parent: table
	});
	state.blankTableItem =
		tableBtns.value[tableBtns.value.length - 1].dataset.matrixId;
	tableBtnValues.value = tableBtns.value.map((el) => +el.dataset.matrixId);
	state.winnerCombination = tableBtnValues.value;
	btnMatrix.value = getMatrixFromArray(
		shuffleArray(tableBtnValues.value),
		state.currentFrameSize
	);
	state.currentMatrix = btnMatrix.value;

	setMatrixBtnsPosition(btnMatrix.value, tableBtns.value);
};

export const generateSavedTable = () => {
	table.innerHTML = '';
	tableBtns.value = createElemsArray({
		arraySize: state.currentFrameSize * state.currentFrameSize,
		callback: generateBtnsCallback,
		parent: table
	});
	state.winnerCombination = state.savedGame.winnerCombination;

	btnMatrix.value = state.savedGame.matrix;
	state.currentMatrix = state.savedGame.matrix;

	setMatrixBtnsPosition(state.currentMatrix, tableBtns.value);
};
