import { FeatureCollection } from "geojson";
import { FillLayer } from "react-map-gl";
import React, { useState, useEffect } from "react";

let fetchedData: FeatureCollection | undefined; // Variable to store fetched GeoJSON data

// Handle the 'area' command and perform a search on the loaded CSV data for the given area keyword
export function handleAreaCommand(args: Array<string>): Promise<string[][]> {
  if (args.length < 1) {
    return Promise.resolve([
      ["Error - Too Few Arguments, Add an <area> value to area"],
    ]);
  } else {
    const [area, ...rest] = args;
    if (rest.length !== 0) {
      return Promise.resolve([
        ["Error - Do Not Enter Args Other Than AreaValue"],
      ]);
    } else {
      const OR = fetch(`http://localhost:8080/area?areaIdentifier=${area}`)
        .then((response) => response.json())
        .then((json) => {
          if (isFeatureCollection(json as FeatureCollection)) {
            fetchedData = json as FeatureCollection;
            return [["Search Successful"]];
          } else {
            console.error(
              "Error: Fetched data is not a valid GeoJSON FeatureCollection"
            );
            return [
              ["Error: Fetched data is not a valid GeoJSON FeatureCollection"],
            ];
          }
        })
        .catch((e) => {
          return [["Error with data fetching for area request"]];
        });
      return OR;
    }
  }
}

// Function to check if JSON is FeatureCollection
function isFeatureCollection(json: any): json is FeatureCollection {
  return json && json.type === "FeatureCollection";
}

// Function to overlay data using stored GeoJSON value
export function overlaySpecialData(): FeatureCollection | undefined {
  return isFeatureCollection(fetchedData) ? fetchedData : undefined; 
}

const propertyName = "holc_grade";
export const geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": ["match", ["get", propertyName], "A", "#800080"],
    "fill-opacity": 0.2,
  },
};

export function getFetchedData(): FeatureCollection | undefined {
  return fetchedData;
}
