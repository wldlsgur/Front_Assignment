import React from 'react';
import StyleProvider from './provider/StyleProvider';
import { Board } from '@/widgets/board';

function App() {
  return (
    <StyleProvider>
      <Board />
    </StyleProvider>
  );
}

export default App;
