import * as React from 'react';

import { CellState } from '../types';
import { Cell } from './Cell';

const BOARD_SIZE = { width: 11, height: 11 };

interface GameState {
  game: CellState[][];
  cellsToCheck: { [key: number]: { [key: number]: boolean } };
}

export const Game = (): React.ReactNode => {
  const [turn, setTurn] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<GameState>({
    game: Array.from({ length: BOARD_SIZE.width }, () =>
      Array.from({ length: BOARD_SIZE.height }, () => CellState.Dead)
    ),
    cellsToCheck: {}
  });

  const toggleCells = (toToggle: [number, number][]): CellState[][] => {
    const newState = gameState.game.map((row) => [...row]);
    toToggle.forEach(([x, y]) => {
      newState[x][y] = newState[x][y] === CellState.Alive ? CellState.Dead : CellState.Alive;
    });
    return newState;
  };

  const getNeighbours = (x: number, y: number): CellState[] => {
    const neighbours: CellState[] = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) continue;
        if (x + i < 0 || x + i >= BOARD_SIZE.width || y + j < 0 || y + j >= BOARD_SIZE.width)
          continue;
        neighbours.push(gameState.game[x + i][y + j]);
      }
    }
    return neighbours;
  };

  const getLiveNeighbours = (x: number, y: number): number => {
    const neighbours = getNeighbours(x, y);
    return neighbours.reduce((total, cell) => total + cell, 0);
  };

  const nextTurn = () => {
    const aliveCells: [number, number][] = [];
    const toToggle: [number, number][] = [];

    gameState.game.forEach((row, x) => {
      row.forEach((cell, y) => {
        const liveNeighbours = getLiveNeighbours(x, y);

        if (cell && liveNeighbours < 2) {
          toToggle.push([x, y]);
        } else if (cell && liveNeighbours > 3) {
          toToggle.push([x, y]);
        } else if (!cell && liveNeighbours === 3) {
          toToggle.push([x, y]);
          aliveCells.push([x, y]);
        } else if (cell) {
          aliveCells.push([x, y]);
        }
      });
    });

    const nextCellsToCheck = {};
    aliveCells.forEach(([x, y]) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x + i >= 0 && x + i < BOARD_SIZE.width && y + j >= 0 && y + j < BOARD_SIZE.height) {
            nextCellsToCheck[x + i] = nextCellsToCheck[x + i] ?? {};
            nextCellsToCheck[x + i][y + j] = true;
          }
        }
      }
    });
    const newState = toggleCells(toToggle);
    setGameState({
      game: newState,
      nextCellsToCheck
    });
  };

  React.useEffect(() => {
    const newState = toggleCells([
      [5, 4],
      [5, 5],
      [5, 6]
    ]);
    setGameState({ game: newState });
  }, []);

  React.useEffect(() => {
    const id = setTimeout(() => {
      nextTurn();
      setTurn(turn + 1);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [gameState]);

  return (
    <>
      {gameState.game.map((row, xPos) =>
        row.map((cell, yPos) => (
          <Cell key={`${xPos}-${yPos}`} xPos={xPos} yPos={yPos} status={cell} />
        ))
      )}
    </>
  );
};
