// mockedJson.js
export const mockBackendData = {
  "file1.csv": {
    "result": "success",
    "data": [
      ["Column1", "Column2", "Column3"],
      ["Value1", "Value2", "Value3"],
      ["Value4", "Value5", "Value6"]
    ]
  },
  "file2.csv": {
    "result": "success",
    "data": [
      ["Header1", "Header2", "Header3"],
      ["Data1", "Data2", "Data3"],
      ["Data4", "Data5", "Data6"]
    ]
  },
  // Add more file paths and mock data as needed
  "file3.csv": {
    "result": "error",
    "message": "File not found"
  },
  "viewcsv": {
    "result": "success",
    "message": "Mock data fetched successfully",
    "data": [
      ["Column1", "Column2", "Column3"],
      ["Value1", "Value2", "Value3"],
      ["Value4", "Value5", "Value6"],
      ["Value7", "Value8", "Value9"]
    ]
  }
};
