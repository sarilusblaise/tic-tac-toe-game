export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0; // square with even number have to be always true
	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function handleReset() {
		setHistory([Array(9).fill(null)]);
		setCurrentMove(0);
	}

	function handleUndo() {
		if (currentMove > 0) {
			setCurrentMove(currentMove - 1);
		}
	}

	function handleRedo() {
		if (currentMove < history.length - 1) {
			setCurrentMove(currentMove + 1);
		}
	}

	return (
		<div className='game'>
			<header>
				<h1>Tic tac toe game</h1>
			</header>
			<div className='game-board'>
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
					history={history}
					currentMove={currentMove}
				/>
				<GameControl
					onUndo={handleUndo}
					onRedo={handleRedo}
					onReset={handleReset}
					currentMove={currentMove}
				/>
			</div>
		</div>
	);
}
