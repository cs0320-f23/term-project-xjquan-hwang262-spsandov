import { mockBackendData } from "../mocked_data/mockedJson";

export async function mockViewCommand(args: string[]): Promise<string[][]> {
    if (args.length !== 0) {
        return Promise.resolve([["Error - View Should Not Include Other Args"]]);
    } else {
        // Simulate the fetch call using the mock data
        const fetchData = async (): Promise<any> => {
            return new Promise(resolve => {
                setTimeout(() => {
                    const mockData = (mockBackendData as Record<string, any>)["viewcsv"];
                    if (mockData) {
                        resolve(mockData);
                    } else {
                        resolve({
                            result: "error",
                            message: "Mock data not found for the viewcsv endpoint"
                        });
                    }
                }, 0); 
            });
        };

        try {
            const json = await fetchData();
            const data: string[][] = json.data;

            if (typeof data === 'undefined') {
                const result: string[][] = [[json.result + ": " + json.message]];
                return result;
            }

            console.log(data);
            return data;
        } catch (e) {
            console.log(e);
            return [["Error with data fetching for view request"]];
        }
    }
}