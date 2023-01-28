import { useState } from "react";

function Square() {
	const [value, setValue] = useState(null);
	const handleClick = (e) => {
		e.preventDefault();
		setValue("X");
	};
	return (
		<button className='square' onClick={handleClick}>
			{value}
		</button>
	);
}

export default function Board() {
	return (
		<>
			<div className='board-row'>
				<Square />
				<Square />
				<Square />
			</div>
			<div className='board-row'>
				<Square />
				<Square />
				<Square />
			</div>
			<div className='board-row'>
				<Square />
				<Square />
				<Square />
			</div>
		</>
	);
}
