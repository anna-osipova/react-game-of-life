import * as React from 'react';
import { Rect } from 'react-konva';
import { CellState } from '../types';

type CellProps = {
  xPos: number;
  yPos: number;
  status: CellState;
};

const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;

export const Cell = (props: CellProps) => {
  const { xPos, yPos, status } = props;
  return (
    <Rect
      x={xPos * CELL_WIDTH}
      y={yPos * CELL_HEIGHT}
      width={CELL_WIDTH}
      height={CELL_HEIGHT}
      fill={status === CellState.Dead ? 'black' : 'red'}
    />
  );
};
