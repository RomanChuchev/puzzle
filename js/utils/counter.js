import { counterMoves, counterTime } from '../controls.js';
import { state } from './constants.js';

const timeCounter = () => {
	state.time += 1;

	outPrint(counterTime, 'Time: ', getTimeFromSeconds());
};

export const getTimeFromSeconds = () => {
	const seconds = Math.floor(state.time) - Math.floor(state.time / 60) * 60;
	const minutes = Math.floor(state.time / 60);
	const message = `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
	return message;
};

export const startTimer = () => {
	if (!state.isGameStarted) {
		state.isGameStarted = setInterval(timeCounter, 1000);
	}
};

export const stopTimer = () => {
	clearInterval(state.isGameStarted);
	state.isGameStarted = null;
};

export const outPrint = (elem, text, number = 0) => {
	elem.textContent = text + number;
};

export const countMoves = () => {
	state.moves++;
	outPrint(counterMoves, 'Moves: ', state.moves);
};
