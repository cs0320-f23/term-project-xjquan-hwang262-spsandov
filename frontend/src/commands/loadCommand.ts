import { REPLInputProps } from "../components/REPLInput";

// Handle the 'load_csv' command and load a CSV file
export async function handleLoadCSV(args: string[]): Promise<string[][]> {
    var isHeaderCopy: boolean = false;
    const [filePath, ...flags] = args;
    if (flags.length !== 0) {
        return new Promise(resolve => { 
          resolve([[
            "Error - Extra Args after loadCSV that is not 'header'",
          ]]);
      })
    }
    if (typeof filePath === 'undefined') {
      return new Promise(resolve => { 
        resolve([[
          "Error - please specify a filepath",
        ]]);
      })
    }
    const OR = fetch(`http://localhost:8080/loadcsv?filepath=${filePath}`)
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
        return [["Error with data fetching for load request"]]
       })
      //setcsvload(true);
      return OR;
  }