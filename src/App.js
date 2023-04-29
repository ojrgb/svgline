import logo from './logo.svg';
import './App.css';
import Main from 'Views/Main.js';
import { EntitiesStateProvider } from 'Context/entitiesStore.js'
import { ContextStateProvider } from 'Context/contextStore.js'
import 'globalFunctions.js' 



function App() {
  return (
    <div className="App">
      <EntitiesStateProvider>
        <ContextStateProvider>
          <Main/>
        </ContextStateProvider>
      </EntitiesStateProvider>
    </div>
  );
}

export default App;
