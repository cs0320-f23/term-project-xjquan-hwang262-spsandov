import { resolve } from "path";
import { REPLInputProps } from "../components/REPLInput";
import { mockBackendData } from "../mocked_data/mockedJson";

// Handle the 'load_csv' command and load a CSV file
export async function mockLoadCSV(args: string[]): Promise<string[][]> {
    const [filePath, ...flags] = args;
    if (flags.length !== 0) {
        return Promise.resolve([["Error - Extra Args after loadCSV that is not 'header'"]]);
    }
    if (typeof filePath === 'undefined') {
        return Promise.resolve([["Error - please specify a filepath"]]);
    }

    // Simulate the fetch call using the mock data
    const fetchData = async (): Promise<any> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const mockData = (mockBackendData as Record<string, any>)[filePath];
                if (mockData) {
                    resolve(mockData);
                } else {
                    resolve({
                        result: "error",
                        message: "Mock data not found for the specified file path"
                    });
                }
            }, 0); 
        });
    };

    try {
        const json = await fetchData();
        let result: string[][] = [[json.result]];
        console.log(result);
        if (result[0][0] !== "success") {
            result = [[json.result + ": " + json.message]];
        } else {
            result = json.data; // Use the mock data for successful requests
        }
        return result;
    } catch (e) {
        console.log(e);
        return [["Error with data fetching for load request"]];
    }
}