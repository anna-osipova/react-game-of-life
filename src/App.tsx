import * as React from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';

import { Game } from './components/Game';

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Hello world" />
        <Star fill="#99ccff" numPoints={5} innerRadius={10} outerRadius={20} />
        {/* <Game /> */}
      </Layer>
    </Stage>
  );
}

export default App;
