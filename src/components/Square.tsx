interface SquareProps {
	value: string | null;
	isInWinnerCombination: boolean;
	onSquareClick: () => void;
}

function Square({ value, isInWinnerCombination, onSquareClick }: SquareProps) {
	return (
		<button
			className={
				'square ' + (isInWinnerCombination ? 'square_highlighted' : '')
			}
			onClick={onSquareClick}
		>
			{value}
		</button>
	);
}

export { Square };
