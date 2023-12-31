/**
 * The mock handler for our route mapping. The user inputs the command "mock" followed by whatever input they want
 * and the return should be the same inputs following "Result:"
 */
export async function handleMock(args: string[]): Promise<string[][]> {
  if (!args || args.length === 0) {
    return [["Error - please specify a destination"]];
  }

  try {
    let path: string[][] = [[args.join(", ")]];
    return path;
  } catch (e) {
    console.log(e);
    return [["Error with mocking"]];
  }
}
