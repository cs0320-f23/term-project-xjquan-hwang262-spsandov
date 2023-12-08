import { REPLInputProps } from "../components/REPLInput";

// Handle the 'find' command and find the distance between the locations
export async function handleFind(args: string[]): Promise<string[][]> {

    console.log(args);
    
    if (typeof args === 'undefined') {
      return new Promise(resolve => { 
        resolve([[
          "Error - please specify a destination",
        ]]);
      })
    }
    const OR = fetch(`http://localhost:8080/loadpath?location=${args}`)
      .then(response => 
        response.json())
      .then(json => {
        let result : string[][] = [[json.result]]
        if (result[0][0] !== "success") {
          result = [[json.result + ": " + json.message]]
        }
        console.log(result);
        return result;
      })
      .catch(e => {
        console.log(e)
        return [["Error with data fetching for find request"]]
       })
      //setcsvload(true);
      return OR;
  }