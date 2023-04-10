import { Square } from './Square';
import { calculateWinner } from '../helpers/calculateWinner';

interface BoardProps {
	xIsNext: boolean;
	squares: string[];
	onPlay: (squares: string[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares);
	}

	return (
		<div className="board">
			<div className="status">{status}</div>
			{[0, 1, 2].map((i) => (
				<div className="board-row" key={i}>
					{[0, 1, 2].map((j) => (
						<Square
							key={j}
							value={squares[i * 3 + j]}
							onSquareClick={() => handleClick(i * 3 + j)}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export { Board };
