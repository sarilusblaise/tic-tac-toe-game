export default function GameTimer({ formatX, formatO }) {
	return (
		<div className='players'>
			<div className='player'>
				<p>
					Player X <span className='timer'>{formatX}</span>
				</p>
			</div>
			<div className='player'>
				<p>
					Player O <span className='timer'>{formatO}</span>
				</p>
			</div>
		</div>
	);
}
