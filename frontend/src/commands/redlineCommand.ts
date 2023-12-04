export function handleRedlineCommand(
  args: Array<string>
): Promise<string[][]> {
  if (args.length < 6) {
    return new Promise((resolve) => {
      resolve([
        [
          "Error - Too Few Arguments, Add a <minLong>, <maxLong>, <minLat>, and <maxLat> for successful retrieval",
        ],
      ]);
    });
  } else {
    const [minLong, maxLong, minLat, maxLat, ...rest] = args;
    if (rest.length !== 0) {
      return new Promise((resolve) => {
        resolve([["Error - Do Not Enter Args Other Than State and County"]]);
      });
    } else {
      const OR = fetch(
        `http://localhost:8080/redline?minLong=${minLong}&maxLong=${maxLong}&minLat=${minLat}&maxLat=${maxLat}`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const redlined: string[][] = [
            ["redlined regions", "information"],
            [json["redlined regions"], json.information,]
          ];
          console.log(redlined);
          console.log(typeof redlined);
          if (typeof redlined[1][0] === "undefined") {
            const result: string[][] = [[json.result + ": " + json.message]];
            return result;
          }
          return redlined;
        })
        .catch((e) => {
          console.log(e);
          return [["Error with data fetching for redline request"]];
        });
      return OR;
    }
  }
}
