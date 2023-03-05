import { AiOutlineUndo } from 'react-icons/ai';
import { AiOutlineRedo } from 'react-icons/ai';
import { useGlobalContext } from '../GameContext';

export default function GameControl() {
	const { handleUndo, handleRedo, handleReset } = useGlobalContext();
	return (
		<>
			<div className='game-undo'>
				<button type='button' className='btn' onClick={() => handleUndo()}>
					<AiOutlineUndo className='btn-control' />
					undo
				</button>
				<button type='button' className='btn' onClick={() => handleReset()}>
					reset
				</button>
				<button type='button' className='btn' onClick={() => handleRedo()}>
					<AiOutlineRedo className='btn-control' /> redo
				</button>
			</div>
		</>
	);
}
