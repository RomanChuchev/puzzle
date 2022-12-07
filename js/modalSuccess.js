import { tableBtns } from './main.js';
import { state } from './utils/constants.js';
import { getTimeFromSeconds, stopTimer } from './utils/counter.js';
import { createElem } from './utils/createElements.js';
import {
	getLocalStorageItems,
	setLocalStorageItems
} from './utils/localStorage.js';

export const darkBGWin = createElem({
	tag: 'div',
	classN: 'darkBG'
});

export const modalWin = createElem({
	tag: 'div',
	classN: 'modal-window',
	parent: darkBGWin
});

const winMessage = createElem({
	tag: 'h2',
	classN: 'modal__grats',
	txtContent: 'Congratulations!',
	parent: modalWin
});

const winScoreMessage = createElem({
	tag: 'p',
	classN: 'modal__message',
	txtContent: `Your stats are:`,
	parent: modalWin
});

const winScore = createElem({
	tag: 'p',
	classN: 'modal__message',
	txtContent: `${state.moves} moves and ${getTimeFromSeconds()} minutes`,
	parent: modalWin
});

const winSaveMessage = createElem({
	tag: 'p',
	classN: 'modal__message-save',
	txtContent: `Enter your name to save the result`,
	parent: modalWin
});

const winForm = createElem({
	tag: 'form',
	classN: 'modal__form',
	parent: modalWin
});

const winNameInput = createElem({
	tag: 'input',
	classN: 'modal__name-input',
	attributes: {
		placeholder: 'Enter your name',
		required: 'true',
		maxlength: '18'
	},
	parent: winForm
});

const winSubmit = createElem({
	tag: 'button',
	classN: 'modal__submit',
	txtContent: `Submit`,
	attributes: {
		type: 'submit'
	},
	parent: winForm
});

const winSaveMessageSmall = createElem({
	tag: 'p',
	classN: 'modal__message-small',
	txtContent: `Hooray! You solved the puzzle in ${getTimeFromSeconds()} and ${
		state.moves
	} moves!`,
	parent: modalWin
});

export const updateLocalStorageTopScore = (frameSize) => {
	if (getLocalStorageItems('topScoreList')) {
		const topList = getLocalStorageItems('topScoreList');
		const currentResult = {
			name: winNameInput.value || 'Anonymous',
			info: `${state.moves} moves, ${getTimeFromSeconds()}`,
			value: state.time
		};
		topList[`frame${frameSize}`].push(currentResult);
		topList[`frame${frameSize}`].sort((a, b) => a.value - b.value);
		topList[`frame${frameSize}`].splice(10);
		setLocalStorageItems('topScoreList', topList);
		winNameInput.value = '';
	} else {
		const topList = {
			frame3: [],
			frame4: [],
			frame5: [],
			frame6: [],
			frame7: [],
			frame8: []
		};

		const currentResult = {
			name: winNameInput.value || 'Anonymous',
			info: `${state.moves} moves, ${getTimeFromSeconds()}`,
			value: state.time
		};

		topList[`frame${frameSize}`].push(currentResult);

		setLocalStorageItems('topScoreList', topList);
		winNameInput.value = '';
	}
};

winForm.addEventListener('submit', (e) => {
	e.preventDefault();
	updateLocalStorageTopScore(state.currentFrameSize);
	tableBtns.value.forEach((el) => el.classList.add('table__btn--disabled'));
	darkBGWin.classList.remove('darkBG--active');
	modalWin.classList.remove('modal-window--active');
	document.body.classList.remove('body-overflow');
});

export const showModalSuccess = () => {
	setTimeout(() => {
		document.body.classList.add('body-overflow');
		darkBGWin.classList.add('darkBG--active');
		modalWin.classList.add('modal-window--active');
		winScore.textContent = `${
			state.moves
		} moves and ${getTimeFromSeconds()}`;
		winSaveMessageSmall.textContent = `Hooray! You solved the puzzle in ${getTimeFromSeconds()} and ${
			state.moves
		} moves!`;
		stopTimer();
	}, 300);
};

darkBGWin.addEventListener('click', ({ target }) => {
	if (!target.closest('.modal-window')) {
		darkBGWin.classList.remove('darkBG--active');
		modalWin.classList.remove('modal-window--active');
		document.body.classList.remove('body-overflow');
		updateLocalStorageTopScore(state.currentFrameSize);

		tableBtns.value.forEach((el) =>
			el.classList.add('table__btn--disabled')
		);
	}
});
