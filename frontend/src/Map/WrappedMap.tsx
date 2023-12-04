import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";
import React, { useState, useEffect } from "react";
import { api_key } from "../Private/Token.js";
import { geoLayer, overlayData } from "./Overlay.js";
import { getFetchedData, overlaySpecialData } from "../commands/areaCommand.js";

/**
 * Functional component representing a map with overlays.
 */
function WrappedMap() {
  // Initial latitude, longitude, and zoom for Providence
  const [viewState, setViewState] = useState({
    longitude: -71.418884,
    latitude: 41.825226,
    zoom: 12,
  });
  // State to manage the overlay data
  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );
  

  /**
   * Effect hook to fetch overlay data and update the state.
   */
  useEffect(() => {
    const fetchData = async () => {
      // Get regular and special overlays
      const regularOverlay = overlayData();
      const specialOverlay = await overlaySpecialData();


      // Use the special overlay if there is fetched data, otherwise use the regular overlay
      setOverlay(getFetchedData() ? specialOverlay : regularOverlay);
    };
    fetchData();
  }, [getFetchedData(), overlaySpecialData(), overlayData()]);

  /**
   * Render the map component with overlays.
   */
  return (
    <Map
      longitude={viewState.longitude}
      latitude={viewState.latitude}
      zoom={viewState.zoom}
      mapboxAccessToken={api_key}
      onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
      style={{ width: window.innerWidth, height: window.innerHeight }}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
    >
      {/* Add a source and layer for the overlay data */}
      <Source id="geo_data" type="geojson" data={overlay}>
        <Layer {...geoLayer} />
      </Source>
    </Map>
  );
}

/**
 * Handler function for map click events.
 * @param {MapLayerMouseEvent} e - The map click event.
 */
function onMapClick(e: MapLayerMouseEvent) {
  console.log(e);
  console.log(e.lngLat.lat);
  console.log(e.lngLat.lng);
}

export default WrappedMap;