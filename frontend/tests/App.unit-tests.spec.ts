// import { registerCommand, commandsMap } from "../src/commands/commandFunctions";
// import { test, expect } from '@playwright/test';
// import { REPLInputProps } from "../src/components/REPLInput";

// test("can register and clear function", async () => {
//   async function handleTestCommand(args: string[], props: REPLInputProps): Promise<string[][]> {
//     return new Promise(resolve=> {
//         resolve([["Test function output"]]);
//     });
//   }
//   registerCommand("testCommand", handleTestCommand);
//   expect(commandsMap.keys()).toContain("testCommand");
//   console.log(commandsMap.keys());
//   console.log(commandsMap);
//   expect(commandsMap.size).toBe(9); // change to 10 after broadband is implemented

//   async function handleRandomCommand(args: string[], props: REPLInputProps): Promise<string[][]> {
//     return new Promise(resolve=> {
//         resolve([["Random output"]]);
//     });
//   }
//   registerCommand("randomCommand", handleRandomCommand);
//   expect(commandsMap.keys()).toContain("randomCommand");
//   expect(commandsMap.size).toBe(10); // change to 11 after broadband is implemented
// });