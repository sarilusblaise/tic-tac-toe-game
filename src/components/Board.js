import { useState, useRef } from 'react';
import { useGlobalContext } from '../GameContext';

import GameTimer from './GameTimer';
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
	const { handleMove, gameState, currentSquares } = useGlobalContext();

	const { status } = gameState;
	return (
		<>
			<div className='status'>
				<span>{status}</span>
			</div>
			<GameTimer />
			<div className='board-row'>
				<Square value={currentSquares[0]} onSquareClick={() => handleMove(0)} />
				<Square value={currentSquares[1]} onSquareClick={() => handleMove(1)} />
				<Square value={currentSquares[2]} onSquareClick={() => handleMove(2)} />
			</div>
			<div className='board-row'>
				<Square value={currentSquares[3]} onSquareClick={() => handleMove(3)} />
				<Square value={currentSquares[4]} onSquareClick={() => handleMove(4)} />
				<Square value={currentSquares[5]} onSquareClick={() => handleMove(5)} />
			</div>
			<div className='board-row'>
				<Square value={currentSquares[6]} onSquareClick={() => handleMove(6)} />
				<Square value={currentSquares[7]} onSquareClick={() => handleMove(7)} />
				<Square value={currentSquares[8]} onSquareClick={() => handleMove(8)} />
			</div>
		</>
	);
}
