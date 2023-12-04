import { REPLInputProps } from "../components/REPLInput";

// handle the 'broadband' command and retrieve census API data for specific county and state combinations
export function handleBroadbandCommand(args: Array<string>): Promise<string[][]> {
    if (args.length < 2) {
      return new Promise(resolve => { 
        resolve([[
          "Error - Too Few Arguments, Add a <state> and <county> for broadband retrieval",
        ]]);
      })
    } else {
      const [state, county, ...rest] = args;
      if (rest.length !== 0) {
        return new Promise(resolve => { 
          resolve([[
            "Error - Do Not Enter Args Other Than State and County",
          ]]);
        })
      } else {
       const OR = fetch(`http://localhost:8080/broadband?state=${state}&county=${county}`)
       .then(response => response.json())
       .then(json => {
        console.log(json)
        const broadband: string[][] = [["broadband", "date & time"], [json.broadband, json["date & time"]]]
        console.log(broadband)
        console.log(typeof broadband)
        if (typeof broadband[1][0] === 'undefined') {
            const result : string[][] = [[json.result + ": " + json.message]]
            return result;
        }
        return broadband;
       })
       .catch(e => {
        console.log(e)
        return [["Error with data fetching for broadband request"]]
       })
       return OR;
      }
    }
  }