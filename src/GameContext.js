import { createContext, useContext, useState, useReducer } from "react";
import GameReducer from "./GameReducer";

const GameContext = createContext(null);
const initialHistory = [Array(9).fill(null)];
export default function GameProvider({ children }) {
	const [history, dispatch] = useState(initialHistory);
	const [currentMove, setCurrentMove] = useReducer(GameReducer, 0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	const handleMove = (nextHistory) => {
		dispatch({ type: "move", payload: nextHistory });
	};

	const handleUndo = () => {
		dispatch({ type: "undo" });
	};

	const handleRedo = () => {
		dispatch({ type: "redo" });
	};

	const handleReset = () => {
		dispatch({ type: "reset" });
	};

	return (
		<GameContext.Provider
			value={{
				handleMove,
				handleUndo,
				handleRedo,
				handleReset,
				currentMove,
				setCurrentMove,
				currentSquares,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GameContext);
