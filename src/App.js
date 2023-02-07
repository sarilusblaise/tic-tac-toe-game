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

function GameTimer() {
	return (
		<div className='players'>
			<div className='player'>
				<p>
					Player X <span className='timer'> 5:30</span>
				</p>
			</div>
			<div className='player'>
				<p>
					Player O <span className='timer'> 5:30</span>
				</p>
			</div>
		</div>
	);
}

function GameControl() {
	return (
		<>
			<div className='game-undo'>
				<div className='undo-container'>
					<AiOutlineUndo className='undo-btn' /> <p>undo</p>
				</div>
				<div className='reset undo-container'>reset</div>
				<div className='undo-container'>
					<AiOutlineRedo className='undo-btn' /> <p>redo</p>
				</div>
			</div>
		</>
	);
}

//component keep all the squares and allow them to communicate each other in order to determine
//when there is winner : this concept call lifting state in react : that means the state
//of one or more child is store in a the parent component.
function Board({ xIsNext, squares, onPlay }) {
	const winner = calculateWinner(squares);
	let status;

	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
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
			<div className='status'>{status}</div>
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

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<div className='game'>
			<header>
				<h1>Tic tac toe game</h1>
			</header>
			<div className='game-board'>
				<GameTimer />
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
				<GameControl />
				<div className='game-info'>
					<ol>{moves}</ol>
				</div>
			</div>
		</div>
	);
}
