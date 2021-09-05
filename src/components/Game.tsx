import * as React from 'react';

import { CellState } from '../types';
import { Cell } from './Cell';

export const Game = () => {
  const [gameState, setGameState] = React.useState<CellState[][]>(
    Array(100)
      .fill(0)
      .map(() => Array(100).fill(CellState.Dead))
  );

  return (
    <>
      {gameState.map((row, xPos) =>
        row.map((cell, yPos) => (
          <Cell key={`${xPos}-${yPos}`} xPos={xPos} yPos={yPos} status={cell} />
        ))
      )}
    </>
  );
};
