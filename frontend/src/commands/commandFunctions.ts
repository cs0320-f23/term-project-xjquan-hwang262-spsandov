import { REPLInputProps } from "../components/REPLInput";
import { handleModeCommand } from "../commands/modeCommand"
import { handleLoadCSV } from "../commands/loadCommand"
import { handleViewCommand } from "../commands/viewCommand"
import { handleSearchCommand } from "../commands/searchCommand"
import { handleBroadbandCommand } from "../commands/broadbandCommand";
import { mockLoadCSV } from "./mockload";
import { mockViewCommand } from "./mockview";
import { mockSearchCommand } from "./mocksearch";
import { mockbroadbandCommand } from "./mockbroadband";
import { helloWorldCommand } from "./helloWorldCommand";
import { handleRedlineCommand } from "./redlineCommand";
import { handleAreaCommand } from "./areaCommand";
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
registerCommand('view', handleViewCommand);
registerCommand('search', handleSearchCommand);
registerCommand('broadband', handleBroadbandCommand);
registerCommand('redline', handleRedlineCommand)
registerCommand('area', handleAreaCommand)
// registerCommand('mock_load', mockLoadCSV);
// registerCommand('mock_view', mockViewCommand);
// registerCommand('mock_search', mockSearchCommand);
// registerCommand('mock_broadband', mockbroadbandCommand);
// registerCommand('hello_world', helloWorldCommand);

