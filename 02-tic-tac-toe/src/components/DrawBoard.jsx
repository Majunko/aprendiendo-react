import { Square } from './Square.jsx';

export const DrawBoard = ({ board, updatedBoard }) => {
  return board.map((square, i) => {
    return (
      <Square key={i} index={i} updatedBoard={updatedBoard}>
        {square}
      </Square>
    );
  });
};
