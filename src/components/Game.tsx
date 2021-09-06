import * as React from 'react';
import produce from 'immer';

import { CellState } from '../types';
import { Cell } from './Cell';

const BOARD_SIZE = 100;

export const Game = () => {
  const [gameState, setGameState] = React.useState<CellState[][]>(
    Array(BOARD_SIZE)
      .fill(0)
      .map(() => Array(BOARD_SIZE).fill(CellState.Dead))
  );

  const toggleCell = (x: number, y: number) => {
    const nextGameState = produce(gameState, (draftGameState) => {
      draftGameState[x][y] = gameState[x][y] === CellState.Alive ? CellState.Dead : CellState.Alive;
    });
    setGameState(nextGameState);
  };

  React.useEffect(() => {
    toggleCell(10, 10);
    toggleCell(11, 10);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      toggleCell(Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE));
    }, 500);
    return () => {
      clearInterval(id);
    };
  });

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
