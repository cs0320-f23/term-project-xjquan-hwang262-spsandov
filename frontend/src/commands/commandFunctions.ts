import { REPLInputProps } from "../components/REPLInput";
import { handleModeCommand } from "../commands/modeCommand"
import { handleLoadCSV } from "../commands/loadCommand"
/**
 * A command-processor function for our REPL. The function returns a Promise   
 * which resolves to a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
    (args: Array<string>, props: REPLInputProps): Promise<string[][]>
}

export const commandsMap = new Map<string, REPLFunction>();

export function registerCommand(commandName: string, handlerFunction: REPLFunction) {
    commandsMap.set(commandName, handlerFunction);
}

registerCommand('mode', handleModeCommand);
registerCommand('load_file', handleLoadCSV);


