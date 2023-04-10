import { useState } from 'react';
import { Board } from './Board';

function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [isAscending, setIsAscending] = useState(true);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares: string[]) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove: number) {
		setCurrentMove(nextMove);
	}

	function sortHistory() {
		return isAscending ? 1 : -1;
	}

	const moves = history
		.slice()
		.sort(sortHistory)
		.map((squares, index) => {
			let description;
			const move = isAscending ? index : history.length - 1 - index;
			const isLastMove = history.length - 1 === move;
			if (isLastMove) {
				description = 'You are at move #' + move;
			} else if (move > 0) {
				description = 'Go to move #' + move;
			} else {
				description = 'Go to game start';
			}
			return (
				<li key={move}>
					{isLastMove ? (
						<span>{description}</span>
					) : (
						<button onClick={() => jumpTo(move)}>
							{description}
						</button>
					)}
				</li>
			);
		});

	function handleClickToggleHistory() {
		setIsAscending((prevValue) => !prevValue);
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
				/>
			</div>
			<div className="game-info">
				<div>
					<span>Sort history: </span>
					<button onClick={handleClickToggleHistory}>
						{isAscending ? (
							<span>&uarr;</span>
						) : (
							<span>&darr;</span>
						)}
					</button>
				</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

export { Game };
