import { createContext, useContext, useState, useReducer, useRef } from 'react';
import GameReducer from './GameReducer';

const initialState = {
	history: [Array(9).fill(null)],
	currentMove: 0,
	status: 'Next Player: X',
};
const GameContext = createContext(null);
//const initialHistory = [Array(9).fill(null)];
export default function GameProvider({ children }) {
	//const [history, setHistory] = useState(initialHistory);
	//const [currentMove, dispatch] = useReducer(GameReducer, 0);
	const [gameState, dispatch] = useReducer(GameReducer, initialState);
	const [timerX, setTimerX] = useState(300);
	const [timerO, setTimerO] = useState(300);
	const intervalXRef = useRef();
	const intervalORef = useRef();
	const { currentMove } = gameState;

	const handleMove = (i) => {
		const xIsNext = currentMove % 2 === 0;
		if (xIsNext) {
			intervalXRef.current = setInterval(() => {
				setTimerO((timer) => timer - 1);
			}, 1000);
			clearInterval(intervalORef.current);
		} else {
			intervalORef.current = setInterval(() => {
				setTimerX((timer) => timer - 1);
			}, 1000);
			clearInterval(intervalXRef.current);
		}
		dispatch({ type: 'move', payload: i });
	};

	const handleUndo = () => {
		dispatch({ type: 'undo' });
	};

	const handleRedo = (historyLength) => {
		dispatch({ type: 'redo', payload: historyLength });
	};

	const handleReset = () => {
		dispatch({ type: 'reset' });
	};
	const formatTimerX = `${Math.floor(timerX / 60)}:0${(
		((timerX / 60) % 1) *
		60
	).toFixed()}`;
	const formatTimerO = `${Math.floor(timerO / 60)}:0${(
		((timerO / 60) % 1) *
		60
	).toFixed()}`;

	return (
		<GameContext.Provider
			value={{
				gameState,
				handleMove,
				handleUndo,
				handleRedo,
				handleReset,
				formatTimerX,
				formatTimerO,
				setTimerO,
				setTimerX,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GameContext);
