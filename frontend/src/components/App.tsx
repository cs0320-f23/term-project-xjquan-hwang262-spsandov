import WrappedMap from '../Map/WrappedMap';
import '../styles/App.css';
import Input from './Input';
import REPL from './REPL';
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

      {/* Render the .bruno-maps and .plan-trips directly under .App */}
      <h1 className="bruno-maps">Bruno Maps</h1>
      <h2 className="plan-trips">
        Plan your trips around Brown effortlessly with our Travel Planner
      </h2>

      <div className="row">
        <div className="replColumn">Enter your desired locations
        <REPL />
        </div>
        <div className="mapColumn">
          Your best path is:
          <REPL />
        </div>
      </div>
    </div>
  );
}

export default App;