import WrappedMap from '../Map/WrappedMap';
import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Maps</h1>
        <p> by jake stifelman + jerry quan</p>
      </p>
      <div className="row">
        <div className="replColumn">
          <REPL />
        </div>
        <div className="mapColumn">
          <WrappedMap/>
        </div>
      </div>
    </div>
  );
}

export default App;
