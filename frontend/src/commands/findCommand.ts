import { REPLInputProps } from "../components/REPLInput";

/**
 * The main handler for our route mapping. The user inputs the command "find" followed by the destinations
 * that they want to pass through, with the first inputted destination as the starting location.
 */
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

    console.log("dog = " + locationString);

    let result: string[][] = [[json.result]];
    if (result[0][0] !== "success") {
      result = [[json.result + ": " + json.message]];
    }
    const pathUrl = googleMapsStringify(json.path);
    const pathWithUrl: string[][] = [
      [capitalizeFirstLetterEachWord(json.path.join(", ")) + ", and the Google Maps link to this input is: " + pathUrl],
    ];
    return pathWithUrl;
  } catch (e) {
    console.log(e);
    return [["Error with data fetching for find request"]];
  }
}
/**
 * A method that joins all spaces on the given input of array of strings with the %20 symbol to indicate spacing and 
 * joins the array of strings into one string to be entered into the URL
 * @param myArray the original array of strings
 * @returns a single string with spaces separated by %20
 */
function makeLocationString(myArray: string[]) {
  return myArray.join("%20");
}
/**
 * A method that returns an inputted string with the first letter capitalized.
 * @param str the string to be capitalized
 * @returns a capitalized string
 */
function capitalizeFirstLetterEachWord(str: string): string {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function googleMapsStringify(waypoints: string[]): string {
  if (waypoints.length < 2) {
    return "Error - please provide at least two waypoints";
  }

  const apiEndpoint = "https://www.google.com/maps/dir/?api=1";

  const origin = waypoints.shift() || "";
  const originString = `&origin=${origin},Providence,RI`;

  const waypointsString = `&waypoints=${waypoints
    .map((wp) => encodeURIComponent(wp + ",Providence,RI 02912"))
    .join("%7C")
    .replace(/%20/g, "")}`;
  return apiEndpoint + originString + waypointsString;
}