import { table } from './main.js';
import { darkBGscore, modalScore, showTopScore } from './modalScore.js';
import { saveGameState, state } from './utils/constants.js';
import { outPrint, startTimer, stopTimer } from './utils/counter.js';
import {
	createElem,
	createElemsArray,
	generateNewTable,
	generateSavedTable
} from './utils/createElements.js';
import {
	getLocalStorageItems,
	setLocalStorageItems
} from './utils/localStorage.js';

const controlButtonsArray = ['Top score', 'Save', 'New game'];
const frameSizeSelect = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];

export const counterContainer = createElem({
	tag: 'div',
	classN: 'counter__container'
});
export const counterTime = createElem({
	tag: 'div',
	classN: 'counter__container--time',
	parent: counterContainer,
	txtContent: 'Time: 00:00'
});
export const counterMoves = createElem({
	tag: 'div',
	classN: 'counter__container--moves',
	parent: counterContainer,
	txtContent: 'Moves: 0'
});

export const controlsContainer = createElem({
	tag: 'div',
	classN: 'controls__container'
});

const controlsSelectContainer = createElem({
	tag: 'div',
	classN: 'select-wrapper',
	parent: controlsContainer
});

const controlsSelect = createElem({
	tag: 'select',
	attributes: {
		name: 'frameSizeSelect'
	},
	parent: controlsSelectContainer
});

const controlsSelectOptions = createElemsArray({
	arraySize: frameSizeSelect.length,
	callback: (el, ind) => {
		el = createElem({
			tag: 'option',
			attributes: {
				value: ind + 3
			},
			txtContent: frameSizeSelect[ind]
		});
		if (ind === 1) el.selected = true;
		return el;
	},
	parent: controlsSelect
});

export const playSound = (sound) => {
	if (state.isSoundOn) {
		sound.currentTime = 0;
		sound.play();
	}
};

const disableControls = (flag) => {
	if (flag === true) {
		controlsSelect.style.pointerEvents = 'none';
		controlsNewGame.style.pointerEvents = 'none';
		controlsSave.style.pointerEvents = 'none';
	} else {
		controlsSelect.style.pointerEvents = 'all';
		controlsNewGame.style.pointerEvents = 'all';
		controlsSave.style.pointerEvents = 'all';
	}
};

controlsSelect.addEventListener('change', ({ target }) => {
	if (+target.value !== state.currentFrameSize) {
		disableControls(true);
		state.currentFrameSize = +target.value;
		playSound(shuffleAudio);

		table.classList.add('table--active');
		setTimeout(() => {
			playSound(shuffleAudio);
			startNewGame();
		}, 500);
		setTimeout(() => {
			table.classList.remove('table--active');
			disableControls(false);
		}, 1500);
	}
});

export const controlsContainerBottom = createElem({
	tag: 'div',
	classN: 'controls__container controls--bottom'
});

const controlsSound = createElem({
	tag: 'button',
	classN: 'controls__btn sound__btn',
	parent: controlsContainer
});

const [controlsTopScore, controlsSave, controlsNewGame] = createElemsArray({
	arraySize: controlButtonsArray.length,
	callback: (el, ind) => {
		el = createElem({
			tag: 'button',
			classN: 'controls__btn',
			txtContent: controlButtonsArray[ind]
		});
		return el;
	},
	parent: controlsContainerBottom
});

export const checkIsGameSaved = (() => {
	const data = getLocalStorageItems('savedGame');
	if (data) {
		state.isGameSaved = true;
		controlsSave.textContent = 'Continue';
		saveGameState();
		stopTimer();
	}
})();

export const checkIsTopScoreList = (() => {
	const topList = getLocalStorageItems('topScoreList');
	if (topList) {
		state.topScoreList = topList;
	}
})();

const soundIcon = createElem({
	tag: 'img',
	classN: 'sound__img',
	parent: controlsSound,
	attributes: {
		width: '20px',
		height: '20px',
		src: './assets/img/vol_max.svg'
	}
});

const shuffleAudio = new Audio('assets/sounds/shuffle.mp3');

controlsNewGame.addEventListener('click', () => {
	table.classList.add('table--active');
	disableControls(true);
	setTimeout(() => {
		playSound(shuffleAudio);
		startNewGame();
	}, 500);
	setTimeout(() => {
		table.classList.remove('table--active');
		disableControls(false);
	}, 1500);
});

export const startNewGame = () => {
	generateNewTable();
	state.time = 0;
	state.moves = 0;
	outPrint(counterMoves, 'Moves: ', '0');
	outPrint(counterTime, 'Time: ', '00:00');
	stopTimer();
	startTimer(0);
};

controlsSave.addEventListener('click', () => {
	if (state.isGameSaved) {
		table.classList.add('table--active');
		disableControls(true);
		setTimeout(() => {
			playSound(shuffleAudio);
			loadCurrentGame();
		}, 500);
		setTimeout(() => {
			table.classList.remove('table--active');
			disableControls(false);
		}, 1500);
	} else {
		saveCurrentGame();
	}
});

controlsTopScore.addEventListener('click', () => {
	stopTimer();
	showTopScore();
	document.body.classList.add('body-overflow');
	darkBGscore.classList.add('darkBG--active');
	modalScore.classList.add('modal-window--active');
});

controlsSound.addEventListener('click', () => {
	state.isSoundOn = !state.isSoundOn;
	if (state.isSoundOn) {
		soundIcon.src = './assets/img/vol_max.svg';
	} else {
		soundIcon.src = './assets/img/vol_muted.svg';
	}
});

const saveCurrentGame = () => {
	state.isGameSaved = true;
	controlsSave.textContent = 'Continue';
	saveGameState();
	setLocalStorageItems('savedGame', state.savedGame);
	stopTimer();
};

const loadCurrentGame = () => {
	state.isGameSaved = false;
	controlsSave.textContent = 'Save';
	state.savedGame = getLocalStorageItems('savedGame');
	state.time = state.savedGame.seconds;
	startTimer();
	state.moves = state.savedGame.moves;
	outPrint(counterMoves, 'Moves: ', state.moves);
	state.currentFrameSize = state.savedGame.frameSize;
	state.blankTableItem = state.savedGame.blankTableItem;
	controlsSelectOptions[state.currentFrameSize - 3].selected = true;
	generateSavedTable();
	localStorage.removeItem('savedGame');
};

export default controlsContainer;
