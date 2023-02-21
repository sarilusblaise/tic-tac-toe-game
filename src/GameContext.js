import { createContext, useContext, useState, useReducer } from "react";
import GameReducer from "./GameReducer";

const GameContext = createContext(null);

function GameProvider({ children }) {
	const [history, dispatch] = useReducer(GameReducer, null);
	const [currentMove, setCurrentMove] = useState();
	return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
}
