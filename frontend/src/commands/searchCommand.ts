import { REPLInputProps } from "../components/REPLInput";

// Handle the 'search' command and perform a search on the loaded CSV data
export function handleSearchCommand(args: Array<string>): Promise<string[][]> {
    if (args.length < 2) {
      return new Promise(resolve => { 
        resolve([[
          "Error - Too Few Arguments, Add a <column> and <value> to search",
        ]]);
      })
    } else {
      const [column, value, ...rest] = args;
      if (rest.length !== 0) {
        return new Promise(resolve => { 
          resolve([[
            "Error - Do Not Enter Args Other Than Column and Value",
          ]]);
        })
      } else {
       const OR = fetch(`http://localhost:8080/searchcsv?target=${value}&identifier=${column}`)
       .then(response => response.json())
       .then(json => {
        const data: string[][] = json.data
        if (typeof data === 'undefined') {
          const result : string[][] = [[json.result + ": " + json.message]]
          return result;
        }
        return data;
       })
       .catch(e => {
        console.log(e)
        return [["Error with data fetching for search request"]]
       })
       return OR;
      }
    }
  }