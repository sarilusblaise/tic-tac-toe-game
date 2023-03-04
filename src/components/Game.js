import GameControl from './GameControl';
import Board from './Board';

export default function Game() {
	return (
		<div className='game'>
			<header>
				<h1>Tic tac toe game</h1>
			</header>
			<div className='game-board'>
				<Board />
				<GameControl />
			</div>
		</div>
	);
}
