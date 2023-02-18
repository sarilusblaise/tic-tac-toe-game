import { useState, useRef } from "react";
import GameTimer from "./GameTimer";
//square component represent the container for the move of each player.
function Square({ value, onSquareClick }) {
	return (
		<button className='square' onClick={onSquareClick}>
			{value}
		</button>
	);
}

//component keep all the squares and allow them to communicate each other in order to determine
//when there is winner : this concept call lifting state in react : that means the state
//of one or more child is store in a the parent component.
export default function Board({
	xIsNext,
	squares,
	onPlay,
	history,
	currentMove,
}) {
	const [timerX, setTimerX] = useState(300);
	const [timerO, setTimerO] = useState(300);
	let intervalIdX = useRef();
	let intervalIdO = useRef();
	const formatTimerX = `${Math.floor(timerX / 60)}:0${(
		((timerX / 60) % 1) *
		60
	).toFixed()}`;
	const formatTimerO = `${Math.floor(timerO / 60)}:0${(
		((timerO / 60) % 1) *
		60
	).toFixed()}`;
	const winner = calculateWinner(squares);
	let status;

	if (winner) {
		status = "Winner: " + winner;
	} else if (!winner && currentMove < squares.length) {
		status = "Next Player: " + (xIsNext ? "X" : "O");
	} else {
		status = "draw!";
	}

	function calculateWinner(arr) {
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
	function handleClick(i) {
		if (squares[i] || winner) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
			intervalIdO.current = setInterval(() => {
				setTimerO((timer) => timer - 1);
			}, 1000);
			clearInterval(intervalIdX.current);
		} else {
			nextSquares[i] = "O";
			intervalIdX.current = setInterval(() => {
				setTimerX((timer) => timer - 1);
			}, 1000);
			clearInterval(intervalIdO.current);
		}
		onPlay(nextSquares);
	}

	return (
		<>
			<div className='status'>
				<span>{status}</span>
			</div>
			<GameTimer formatX={formatTimerX} formatO={formatTimerO} />
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}
