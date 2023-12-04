import * as mockedBroadbandData from '../mocked_data/mockedbroadband.json';

export function mockbroadbandCommand(args: Array<string>): Promise<string[][]> {
  return new Promise(resolve => {
    if (args.length < 2) {
      resolve([["Error - Too Few Arguments, Add a <state> and <county> for broadband retrieval"]]);
    } else {
      const [state, county, ...rest] = args;
      if (rest.length !== 0) {
        resolve([["Error - Do Not Enter Args Other Than State and County"]]);
      } else {
        const key = `${state}_${county}`;
        const broadbandData = mockedBroadbandData[key];
        if (broadbandData) {
          const broadband: string[][] = [["broadband", "date & time"], [broadbandData.broadband.S2802_C03_022E, broadbandData["date & time"]]];
          resolve(broadband);
        } else {
          resolve([["No broadband data found for the specified state and county"]]);
        }
      }
    }
  });
}
