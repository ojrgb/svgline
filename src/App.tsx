
import './App.css';
import Main from 'Views/Main';
import { FlowProvider } from 'Context/flowStore';
import { ContextStateProvider } from 'Context/contextStore'
import ModalFactory from 'Components/Dialog/ModalFactory'
import 'globalFunctions' 
import React from 'react'; // Import React
import { LoadStateProvider } from 'Context/loadStore';

function App() {
  return (
    <div className="App">
      <FlowProvider>
        <ContextStateProvider>
          <LoadStateProvider>
          <Main/>
          <ModalFactory/>
          </LoadStateProvider>
        </ContextStateProvider>
      </FlowProvider>
    </div>
  );
}

export default App;
