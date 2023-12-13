import WrappedMap from '../Map/WrappedMap';
import '../styles/App.css';
import REPL from './REPL';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css?family=League Spartan"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Libre Baskerville"
        rel="stylesheet"
      ></link>
      <p className="App-header">
        <img
          width="180px"
          height="99px"
          flex-shrink="0"
          src="Brown-University-Logo.png"
          alt="Brown Logo"
        />
      </p>
      <h1 className="bruno-maps">Bruno Maps</h1>
      <h2 className="plan-trips">
        Plan your trips around Brown effortlessly with our Travel Planner
      </h2>

      <div className="row">
          {/* Enter your desired locations */}
        <REPL />
        </div>
        {/* <div className="mapColumn">
          Your best path is:
          <REPLHistory />
        </div> */}
      </div>
    // </div>
  );
}

export default App;