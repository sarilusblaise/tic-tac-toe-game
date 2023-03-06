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
		const i = action.payload;
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
		} else {
			nextSquares[i] = 'O';
		}
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		currentMove = nextHistory.length - 1;
		return { ...gameState, history: nextHistory, currentMove, status };
	}

	if (action.type === 'undo') {
		let { currentMove } = gameState;
		if (currentMove > 0) {
			currentMove = currentMove - 1;
			return { ...gameState, currentMove };
		}
		return gameState;
	}

	if (action.type === 'redo') {
		let { currentMove, history } = gameState;
		if (currentMove < history.length - 1) {
			currentMove = currentMove + 1;
			return { ...gameState, currentMove };
		}
		return gameState;
	}

	if (action.type === 'reset') {
		return {
			history: [Array(9).fill(null)],
			currentMove: 0,
		};
	}
}
