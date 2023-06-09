import { Square } from './Square';
import { calculateWinner } from '../helpers/calculateWinner';

interface BoardProps {
	xIsNext: boolean;
	squares: (string | null)[];
	onPlay: (squares: (string | null)[], row: number, col: number) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
	const { winner, combination } = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	function handleClick(i: number, row: number, col: number) {
		if (squares[i] || calculateWinner(squares)?.winner) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares, row, col);
	}

	return (
		<div className="board">
			<div className="status">{status}</div>
			{[0, 1, 2].map((i) => (
				<div className="board-row" key={i}>
					{[0, 1, 2].map((j) => (
						<Square
							key={j}
							isInWinnerCombination={
								i * 3 + j === combination?.a ||
								i * 3 + j === combination?.b ||
								i * 3 + j === combination?.c
							}
							value={squares[i * 3 + j]}
							onSquareClick={() => handleClick(i * 3 + j, i, j)}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export { Board };
