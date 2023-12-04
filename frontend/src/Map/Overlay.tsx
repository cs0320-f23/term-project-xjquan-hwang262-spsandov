import { FeatureCollection } from "geojson";
import { FillLayer } from "react-map-gl";

let GeoData: FeatureCollection | undefined; // Variable to store GeoJSON data

function isFeatureCollection(json: any): json is FeatureCollection {
  return json && json.type === "FeatureCollection";
}

export function overlayData(): FeatureCollection {
  if (!GeoData) {
    fetch("http://localhost:8080/redline")
      .then((response) => response.json())
      .then((json) => {
        if (isFeatureCollection(json)) {
          GeoData = json;
        } else {
          console.error(
            "Error: Fetched data is not a valid GeoJSON FeatureCollection"
          );
          GeoData = { type: "FeatureCollection", features: [] };
        }
      })
      .catch((error) => {
        console.error("Error with data fetching for overlay:", error);
        GeoData = { type: "FeatureCollection", features: [] };
      });
  }

  return GeoData as FeatureCollection;
}

const propertyName = "holc_grade";
export const geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#5bcc04",
      "B",
      "#04b8cc",
      "C",
      "#e9ed0e",
      "D",
      "#d11d1d",
      "#ccc",
    ],
    "fill-opacity": 0.2,
  },
};
