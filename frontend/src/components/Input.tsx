export default function Input() {
    return (
      <div className="input">

        <REPLHistory history={history} outputMode={outputMode} />
        <hr></hr>
        {/* CHANGED */}
        <REPLInput
          history={history}
          setHistory={setHistory}
          outputMode={outputMode}
          setOutputMode={setOutputMode}
        />
      </div>
    );
}