
import './App.css';
import Main from 'Views/Main';
import { EntitiesStateProvider } from 'Context/entitiesStore'
import { ContextStateProvider } from 'Context/contextStore'
import ModalFactory from 'Components/Dialog/ModalFactory'
import 'globalFunctions' 
import React from 'react'; // Import React

function App() {
  return (
    <div className="App">
      <EntitiesStateProvider>
        <ContextStateProvider>
          <Main/>
          <ModalFactory/>
        </ContextStateProvider>
      </EntitiesStateProvider>
    </div>
  );
}

export default App;
