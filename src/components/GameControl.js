function GameControl({ onUndo, onRedo, onReset, currentMove }) {
	return (
		<>
			<div className='game-undo'>
				<button type='button' className='btn' onClick={() => onUndo()}>
					<AiOutlineUndo className='btn-control' />
					undo
				</button>
				<button type='button' className='btn' onClick={() => onReset()}>
					reset
				</button>
				<button type='button' className='btn' onClick={() => onRedo()}>
					<AiOutlineRedo className='btn-control' /> redo
				</button>
			</div>
		</>
	);
}
