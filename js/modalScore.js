import { tableBtns } from './main.js';
import { state } from './utils/constants.js';
import { startTimer } from './utils/counter.js';
import { createElem, createElemsArray } from './utils/createElements.js';
import { getLocalStorageItems } from './utils/localStorage.js';

export const darkBGscore = createElem({
	tag: 'div',
	classN: 'darkBG'
});

export const modalScore = createElem({
	tag: 'div',
	classN: 'modal-window',
	parent: darkBGscore
});

const scoreRadioContainer = createElem({
	tag: 'div',
	classN: 'radio__container',
	parent: modalScore
});
const scoreSizeBtns = createElemsArray({
	arraySize: 6,
	callback: (el, ind) => {
		el = createElem({
			tag: 'label',
			classN: 'controls__btn radio__btn',
			parent: scoreRadioContainer
		});
		const radioBtn = createElem({
			tag: 'input',
			classN: 'radio__round',
			attributes: {
				type: 'radio',
				name: 'scoreFrame',
				value: `${ind + 3}`
			}
		});
		ind === 0 ? (radioBtn.checked = true) : false;
		radioBtn.addEventListener('change', (e) => {
			checkAndDisplayResults(e.target.value);
		});
		el.append(radioBtn);
		createElem({
			tag: 'span',
			classN: ' radio__text',
			txtContent: `${ind + 3}x${ind + 3}`,
			parent: el
		});
	}
});

const scoreInfoContainer = createElem({
	tag: 'div',
	classN: 'modal__info-container',
	parent: modalScore
});

export const showTopScore = () => {
	checkAndDisplayResults(
		[...document.querySelectorAll('.radio__round')].find(
			(el) => el.checked === true
		).value
	);
};

const checkAndDisplayResults = (value) => {
	const data = getLocalStorageItems('topScoreList');
	scoreInfoContainer.innerHTML = '';
	if (data && data[`frame${value}`].length) {
		const winnersNum = data[`frame${value}`].length;
		const topScoreHeader = createElem({
			tag: 'h2',
			classN: 'modal__grats modal__grats--score',
			txtContent: `Top ${winnersNum} ${
				winnersNum == 1 ? 'winner' : 'winners'
			}`,
			parent: scoreInfoContainer
		});
		const topScoreMessage = createElem({
			tag: 'p',
			classN: 'modal__message',
			txtContent: `Sorted by time`,
			parent: scoreInfoContainer
		});
		const topScoreList = createElem({
			tag: 'ol',
			classN: 'modal__list',
			parent: scoreInfoContainer
		});

		for (let item of data[`frame${value}`]) {
			const listItem = createElem({
				tag: 'li',
				classN: 'modal__list-item',
				parent: topScoreList
			});
			createElem({
				tag: 'h4',
				classN: 'winner__name',
				txtContent: `<${item.name}>: `,
				parent: listItem
			});
			createElem({
				tag: 'p',
				classN: 'winner__info',
				txtContent: item.info,
				parent: listItem
			});
		}
	} else {
		const noScoreMessage = createElem({
			tag: 'h2',
			classN: 'modal__grats',
			txtContent: 'No winners yet!',
			parent: scoreInfoContainer
		});
	}
};

darkBGscore.addEventListener('click', ({ target }) => {
	if (!target.closest('.modal-window')) {
		darkBGscore.classList.remove('darkBG--active');
		modalScore.classList.remove('modal-window--active');
		document.body.classList.remove('body-overflow');
		// scoreInfoContainer.innerHTML = '';
		if (
			!state.isGameSaved &&
			!tableBtns.value.some((el) =>
				el.classList.contains('table__btn--disabled')
			)
		)
			startTimer();
	}
});
