export function calculateWinner(arr) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let line of lines) {
		const [a, b, c] = line;
		if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
			return arr[a];
		}
	}

	return null;
}

export default function GameReducer(gameState, action) {
	if (action.type === 'move') {
		const { i } = action.payload;
		let { history, currentMove, status } = gameState;
		let currentSquares = history[currentMove];
		let nextSquares = currentSquares.slice();
		let xIsNext = currentMove % 2 === 0;
		let winner = calculateWinner(currentSquares);
		if (currentSquares[i] || winner) {
			return gameState;
		}

		if (xIsNext) {
			nextSquares[i] = 'X';
			/*let idO = setInterval(() => {
				setTimerO((timer) => timer - 1);
			}, 1000);
			clearInterval(idO);*/
		} else {
			nextSquares[i] = 'O';
			/*let idX = setInterval(() => {
				setTimerX((timer) => timer - 1);
			}, 1000);
			clearInterval(idX);*/
		}
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		currentMove = nextHistory.length - 1;
		return { ...gameState, history: nextHistory, currentMove, status };
	}

	if (action.type === 'undo') {
		const { currentMove } = gameState;
		if (currentMove > 0) {
			return currentMove - 1;
		}
		return currentMove;
	}

	if (action.type === 'redo') {
		let { currentMove } = gameState;
		if (currentMove < action.payload - 1) {
			return currentMove + 1;
		}
		return currentMove;
	}

	if (action.type === 'reset') {
	}
}
