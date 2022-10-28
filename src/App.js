import logo from './logo.svg';
import './App.css';
import Main from 'Views/Main';
import { EntitiesStateProvider } from 'Context/entitiesStore'
import { ContextStateProvider } from 'Context/contextStore'

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
