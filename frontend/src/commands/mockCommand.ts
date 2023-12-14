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