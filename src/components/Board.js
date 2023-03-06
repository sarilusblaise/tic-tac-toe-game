import { useGlobalContext } from '../GameContext';
import { calculateWinner } from '../GameReducer';
import { v4 as uuidv4 } from 'uuid';

import GameTimer from './GameTimer';

//function for generating array in specific range

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
export default function Board() {
	const { handleMove, gameState, timerX, timerO, intervalORef, intervalXRef } =
		useGlobalContext();
	const { currentMove, history } = gameState;
	const updatedSquares = history[currentMove];
	let xIsNext = currentMove % 2 === 0;
	const winner = calculateWinner(updatedSquares);
	let status;
	if (timerX === 0) {
		status = 'winner: O';
		clearInterval(intervalORef.current);
		clearInterval(intervalXRef.current);
	} else if (timerO === 0) {
		status = 'winner: X';
		clearInterval(intervalORef.current);
		clearInterval(intervalXRef.current);
	} else if (winner) {
		status = 'Winner: ' + winner;
	} else if (!winner && currentMove < updatedSquares.length) {
		status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
	} else {
		status = 'draw!';
	}
	const generateRowSquares = (arr) => {
		return arr.map((i) => {
			return (
				<Square
					key={uuidv4()}
					value={updatedSquares[i]}
					onSquareClick={() => handleMove(i)}
				/>
			);
		});
	};
	return (
		<>
			<div className='status'>
				<span>{status}</span>
			</div>
			<GameTimer />
			<div className='board-row'>{generateRowSquares([0, 1, 2])}</div>
			<div className='board-row'>{generateRowSquares([3, 4, 5])}</div>
			<div className='board-row'>{generateRowSquares([6, 7, 8])}</div>
		</>
	);
}
