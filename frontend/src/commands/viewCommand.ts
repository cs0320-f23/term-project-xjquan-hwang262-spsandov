import { REPLInputProps } from "../components/REPLInput";

// Handle the 'view' command and display the loaded CSV data
export async function handleViewCommand(args: string[]): Promise<string[][]> {
    if (args.length !== 0) {
      return new Promise(resolve => { 
        resolve([[
          "Error - View Should Not Include Other Args",
        ]]);
      })
    } else {
      const OR = fetch(`http://localhost:8080/viewcsv`).
      then(response => response.json())
      .then(json => {
        const data : string[][] = json.data
        console.log(data);
        if (typeof data === 'undefined') {
            const result : string[][] = [[json.result + ": " + json.message]]
            return result;
        }
        console.log(data);
        return data;
      })
      .catch(e => {
        console.log(e)
        return [["Error with data fetching for view request"]]
       })
      return OR
    }
  }