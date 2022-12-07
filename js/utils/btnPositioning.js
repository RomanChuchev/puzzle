const setBtnPosition = (btn, x, y) => {
	const shift = 100;
	btn.style.transform = `translate3D(${x * shift}%, ${y * shift}%, 0)`;
};

export const setMatrixBtnsPosition = (matrix, btns) => {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const value = matrix[y][x];
			const btn = btns[value - 1];
			setBtnPosition(btn, x, y);
		}
	}
};
