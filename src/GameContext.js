import { createContext, useContext, useState, useReducer } from "react";
import GameReducer from "./GameReducer";

const GameContext = createContext(null);
const initialHistory = [Array(9).fill(null)];
export default function GameProvider({ children }) {
	const [history, dispatch] = useReducer(GameReducer, initialHistory);
	const [currentMove, setCurrentMove] = useState();
	const xIsNext = currentMove % 2 === 0;

	const handleMove = () => {
		dispatch({ type: "play" });
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
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GameContext);
