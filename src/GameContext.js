import { createContext, useContext, useState, useReducer, useRef } from 'react';
import GameReducer from './GameReducer';
import { calculateWinner } from './GameReducer';

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
	const { currentMove, history } = gameState;
	const winner = calculateWinner(history[currentMove]);
	const xIsNext = currentMove % 2 === 0;

	const handleMove = (i) => {
		if (!winner) {
			if (xIsNext) {
				intervalXRef.current = setInterval(() => {
					setTimerO((timer) => timer - 1);
				}, 1000);
				clearInterval(intervalORef.current);
			} else if (!xIsNext) {
				intervalORef.current = setInterval(() => {
					setTimerX((timer) => timer - 1);
				}, 1000);
				clearInterval(intervalXRef.current);
			}
			dispatch({ type: 'move', payload: i });
		}
	};

	const handleUndo = () => {
		if (currentMove > 0) {
			if (xIsNext) {
				intervalXRef.current = setInterval(() => {
					setTimerO((timer) => timer - 1);
				}, 1000);
				clearInterval(intervalORef.current);
			} else if (!xIsNext) {
				intervalORef.current = setInterval(() => {
					setTimerX((timer) => timer - 1);
				}, 1000);
				clearInterval(intervalXRef.current);
			}
		}
		dispatch({ type: 'undo' });
	};

	const handleRedo = () => {
		if (currentMove < history.length - 1) {
			if (xIsNext) {
				intervalXRef.current = setInterval(() => {
					setTimerO((timer) => timer - 1);
				}, 1000);
				clearInterval(intervalORef.current);
			} else if (!xIsNext) {
				intervalORef.current = setInterval(() => {
					setTimerX((timer) => timer - 1);
				}, 1000);
				clearInterval(intervalXRef.current);
			}
		}
		dispatch({ type: 'redo' });
	};

	const handleReset = () => {
		setTimerX(300);
		setTimerO(300);
		clearInterval(intervalORef.current);
		clearInterval(intervalXRef.current);
		dispatch({ type: 'reset' });
	};
	const formatTimerX = `${Math.floor(timerX / 60)}:${(((timerX / 60) % 1) * 60)
		.toFixed()
		.padStart(2, 0)}`;
	const formatTimerO = `${Math.floor(timerO / 60)}:${(((timerO / 60) % 1) * 60)
		.toFixed()
		.padStart(2, 0)}`;

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
