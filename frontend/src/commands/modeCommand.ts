import { REPLInputProps } from "../components/REPLInput";

// Handle the 'mode' command and switch the output mode
export async function handleModeCommand(args: string[], props: REPLInputProps): Promise<string[][]> {
    return new Promise(resolve=> {
      if (args.length !== 0) {
        resolve([["Error - Mode Should Not Include Other Args"]]);
      } else {
        let newMode;
        props.setOutputMode((prevMode) => {
          newMode = prevMode === "brief" ? "verbose" : "brief";
          return newMode;
        });
        resolve([[`Output mode switched to ${newMode}`]]);
      }
    });
}