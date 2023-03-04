import Game from "./components/Game";
import GameProvider from "./GameContext";

export default function App() {
	return (
		<GameProvider>
			<div className='game'>
				<Game />
			</div>
		</GameProvider>
	);
}
