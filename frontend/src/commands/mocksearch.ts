import { mockedSearchResults } from "../mocked_data/mockedSearchJson"; // Import your mock data

export async function mockSearchCommand(args: Array<string>): Promise<string[][]> {
  const fetchData = async (): Promise<any> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const [column, value, ...rest] = args;
        if (rest.length !== 0) {
          resolve({
            result: "error",
            message: "Invalid search command format"
          });
        } else {
          const searchKey = `${column}.csv-results`;
          const searchResult = mockedSearchResults[searchKey];
          if (searchResult) {
            resolve({
              result: "success",
              data: searchResult
            });
          } else {
            resolve({
              result: "error",
              message: "No results found for the specified search criteria"
            });
          }
        }
      }, 0); 
    });
  };

  try {
    const json = await fetchData();
    const data: string[][] = json.result === "success" ? json.data : [["Error: " + json.message]];
    return data;
  } catch (e) {
    console.log(e);
    return [["Error with data fetching for search request"]];
  }
}
