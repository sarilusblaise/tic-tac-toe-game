import { useState } from "react";
import { AiFillForward } from "react-icons/ai";
import { AiFillBackward } from "react-icons/ai";
import { AiOutlineUndo } from "react-icons/ai";
import { AiOutlineRedo } from "react-icons/ai";
import mouseCartoon from "./mouseCartoon.png";

//square component represent the container for the move of each player.
function Square({ value, onSquareClick }) {
	return (
		<button className='square' onClick={onSquareClick}>
			{value}
		</button>
	);
}

function GameTimer({ formatX, formatO }) {
	return (
		<div className='players'>
			<div className='player'>
				<p>
					Player X <span className='timer'>{formatX}</span>
				</p>
			</div>
			<div className='player'>
				<p>
					Player O <span className='timer'>{formatO}</span>
				</p>
			</div>
		</div>
	);
}

function GameControl({ onUndo, onRedo, onReset, currentMove }) {
	return (
		<>
			<div className='game-undo'>
				<button type='button' className='btn' onClick={() => onUndo()}>
					<AiOutlineUndo className='btn-control' />
					undo
				</button>
				<button type='button' className='btn' onClick={() => onReset()}>
					reset
				</button>
				<button type='button' className='btn' onClick={() => onRedo()}>
					<AiOutlineRedo className='btn-control' /> redo
				</button>
			</div>
		</>
	);
}

//component keep all the squares and allow them to communicate each other in order to determine
//when there is winner : this concept call lifting state in react : that means the state
//of one or more child is store in a the parent component.
function Board({ xIsNext, squares, onPlay, history, currentMove }) {
	const [timerX, setTimerX] = useState(300);
	const [timerO, setTimerO] = useState(300);
	const formatTimerX = `${Math.floor(timerX / 60)}:0${
		((timerX / 60) % 1) * 60
	}`;
	const formatTimerO = `${Math.floor(timerO / 60)}:0${
		((timerO / 60) % 1) * 60
	}`;
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
		} else {
			nextSquares[i] = "O";
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
