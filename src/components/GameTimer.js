import { useGlobalContext } from '../GameContext';
export default function GameTimer() {
	const { formatTimerX, formatTimerO } = useGlobalContext();
	return (
		<div className='players'>
			<div className='player'>
				<p>
					Player X <span className='timer'>{formatTimerX}</span>
				</p>
			</div>
			<div className='player'>
				<p>
					Player O <span className='timer'>{formatTimerO}</span>
				</p>
			</div>
		</div>
	);
}
