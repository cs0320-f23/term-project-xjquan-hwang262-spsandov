import "../styles/main.css";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import { commandsMap, registerCommand } from "../commands/commandFunctions"

// Define the shape of history entries
interface HistoryObject {
  command: string;
  result: string[][];
}

// Define the properties for the REPLInput component
export interface REPLInputProps {
  history: HistoryObject[];
  setHistory: Dispatch<SetStateAction<HistoryObject[]>>;
  outputMode: string;
  setOutputMode: Dispatch<SetStateAction<string>>;
}

// The REPLInput component for handling user input and command execution
export function REPLInput(props: REPLInputProps) {
  // Manage the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manage the state of CSV data loading
  const [csvloaded, setcsvload] = useState<boolean>(false);
  const [csvdata, setCsvData] = useState<string[][]>([[]]);
  const [header, setHeader] = useState<string[]>([]);
  const [isHeader, setIsHeader] = useState<boolean>(false);
  const [filePathSearch, setFilePath] = useState<string>("");

  // Handle the submission of a command string
  async function handleSubmit(commandString: string) {
    const Output: string[][] = await handleOutput(commandString);
    const newHistoryEntry: HistoryObject = {
      command: commandString,
      result: Output,
    };

    props.setHistory([...props.history, newHistoryEntry]);
    setCommandString("");

    // Handle the output for the given command
    async function handleOutput(commandString: string) {
      const [command, ...args] = commandString.split(" ");
      const mapFunc = commandsMap.get(command)
      if (typeof mapFunc !== 'undefined') {
        return await mapFunc(args, props);
      } else {
        return [["Invalid command: " + command]];
      }
    }
  }

  //onKeyDown={(key) => key.code == "Enter" ? handleSubmit(commandString): null}
  return (
    <div className="repl-input" onKeyDown={(key) => key.code == "Enter" ? handleSubmit(commandString): null}>
      <fieldset>
        <legend></legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button 
      id="button" 
      onClick={() => handleSubmit(commandString)}>
        Enter
      </button>
    </div>
  );
}