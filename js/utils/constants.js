export const state = {
	currentFrameSize: 4,
	blankTableItem: 16,
	winnerCombination: [],
	currentMatrix: [],
	isGameStarted: null,
	time: 0,
	moves: 0,
	topScore: '',
	isSoundOn: true,
	isGameSaved: false,
	savedGame: {
		seconds: 0,
		moves: 0,
		frameSize: 0,
		matrix: [],
		winnerCombination: [],
		blankTableItem: null
	}
};

export const saveGameState = () => {
	state.savedGame = {
		seconds: state.time,
		moves: state.moves,
		frameSize: state.currentFrameSize,
		matrix: state.currentMatrix,
		winnerCombination: state.winnerCombination,
		blankTableItem: state.blankTableItem
	};
};
