import { useState } from "react";
//square component represent the container for the move of each player.
function Square({ value }) {
	return <button className='square'>{value}</button>;
}

/* component keep all the square and allow them to communicate each other in to determine 
when there is winner : this concept call lifting state in react : that means the state 
of one or more child is store in a the parent component.*/
export default function Board() {
	const [squares, setSquare] = useState(Array(9).fill(null));
	return (
		<>
			<div className='board-row'>
				<Square value={squares[0]} />
				<Square value={squares[1]} />
				<Square value={squares[2]} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} />
				<Square value={squares[4]} />
				<Square value={squares[5]} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} />
				<Square value={squares[7]} />
				<Square value={squares[8]} />
			</div>
		</>
	);
}
