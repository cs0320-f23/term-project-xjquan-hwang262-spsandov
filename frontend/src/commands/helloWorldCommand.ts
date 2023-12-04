import { REPLInputProps } from "../components/REPLInput";

// Handle the 'mode' command and switch the output mode
export async function helloWorldCommand(args: string[], props: REPLInputProps): Promise<string[][]> {
    return new Promise(resolve=> {
        resolve([["Hello World!"]])
    });
}