import * as React from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';

import { Game } from './components/Game';

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Game />
      </Layer>
    </Stage>
  );
}

export default App;
