import * as React from 'react';

import { CellState } from '../types';
import { Cell } from './Cell';

const BOARD_SIZE = { width: 10, height: 10 };

export const Game = () => {
  const [gameState, setGameState] = React.useState<CellState[][]>(
    Array.from({ length: BOARD_SIZE.width }, () =>
      Array.from({ length: BOARD_SIZE.height }, () => CellState.Dead)
    )
  );
  const [lastToggle, setLastToggle] = React.useState<[number, number][]>([]);

  const toggleCells = (toToggle: [number, number][]) => {
    toToggle.forEach(([x, y]) => {
      gameState[x][y] = gameState[x][y] === CellState.Alive ? CellState.Dead : CellState.Alive;
    });
  };

  const getNeighbours = (x: number, y: number): CellState[] => {
    const neighbours: CellState[] = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) continue;
        if (x + i < 0 || x + i >= BOARD_SIZE.width || y + j < 0 || y + j >= BOARD_SIZE.width)
          continue;
        neighbours.push(gameState[x + i][y + j]);
      }
    }
    return neighbours;
  };

  const getLiveDeadNeighbours = (x: number, y: number): number => {
    const neighbours = getNeighbours(x, y);
    return neighbours.reduce((total, cell) => total + cell, 0);
  };

  const nextTurn = () => {
    const toToggle: [number, number][] = [];

    gameState.forEach((row, x) => {
      row.forEach((cell, y) => {
        const liveNeighbours = getLiveDeadNeighbours(x, y);

        if (cell && liveNeighbours < 2) {
          toToggle.push([x, y]);
        } else if (cell && liveNeighbours > 3) {
          toToggle.push([x, y]);
        } else if (!cell && liveNeighbours === 3) {
          toToggle.push([x, y]);
        }
      });
    });
    toggleCells(toToggle);
    setLastToggle(toToggle);
  };

  React.useEffect(() => {
    toggleCells([
      [5, 4],
      [5, 5],
      [5, 6]
    ]);

    const id = setInterval(() => {
      nextTurn();
    }, 800);
    return () => {
      clearInterval(id);
    };
  }, []);

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
