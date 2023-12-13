import { REPLInputProps } from "../components/REPLInput";

export async function handleFind(args: string[]): Promise<string[][]> {
  if (!args || args.length === 0) {
    return [["Error - please specify a destination"]];
  }

  const locationString = makeLocationString(args);

  try {
    const response = await fetch(
      `http://localhost:3232/loadpath?location=${locationString}`
    );
    const json = await response.json();

    let result: string[][] = [[json.result]];
    if (result[0][0] !== "success") {
      result = [[json.result + ": " + json.message]];
    }
    let path: string[][] = [
      [capitalizeFirstLetterEachWord(json.path.join(", "))],
    ];
    console.log(path);
    return path;
  } catch (e) {
    console.log(e);
    return [["Error with data fetching for find request"]];
  }
}

function makeLocationString(myArray: string[]) {
  return myArray.join("%20");
}
function capitalizeFirstLetterEachWord(str: string): string {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}