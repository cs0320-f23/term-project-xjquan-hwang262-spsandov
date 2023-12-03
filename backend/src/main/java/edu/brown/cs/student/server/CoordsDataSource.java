package edu.brown.cs.student.server;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.types.FeatureCollection;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import okio.Buffer;

public class CoordsDataSource {

  private Cache<String, List<Double>> cache;
  private HashMap<String, List<Double>> coordsData;

  public CoordsDataSource() {
    this.cache = CacheBuilder.newBuilder()
        .expireAfterWrite(1, TimeUnit.HOURS)
        .build();
  }

  private static HttpURLConnection connect(
      URL requestURL) throws DataSourceException, IOException {
    URLConnection urlConnection = requestURL.openConnection();
    if (!(urlConnection instanceof HttpURLConnection)) {
      throw new DataSourceException("unexpected: result of connection wasn't HTTP");
    }
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect();
    if (clientConnection.getResponseCode() != 200) {
      throw new DataSourceException(
          "unexpected: API connection not success status " + clientConnection.getResponseMessage());
    }
    return clientConnection;
  }

  public Map<String, List<Double>> getCoords(List<String> locations) throws DataSourceException {
    try {
      String accessToken = System.getenv("ACCESS_TOKEN");
      Moshi moshi = new Moshi.Builder().build();
      this.coordsData = new HashMap<>();

      if (!locations.isEmpty()) {
        for (String location : locations) {
          List<Double> cachedCoords = cache.getIfPresent(location);
          if (cachedCoords == null) {
            URL requestURL = new URL(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location
                    + ".json?proximity=ip&access_token=" + accessToken);
            HttpURLConnection clientConnection = connect(requestURL);
            JsonAdapter<FeatureCollection> jsonAdapter = moshi.adapter(FeatureCollection.class);
            FeatureCollection featureCollection = jsonAdapter.fromJson(
                new Buffer().readFrom(clientConnection.getInputStream()));
            if (featureCollection != null && featureCollection.getFeatures() != null
                && !featureCollection.getFeatures()
                .isEmpty()) {
              List<Double> coordinates = featureCollection.getFeatures().get(0).getGeometry()
                  .getCoordinates();
              cache.put(location, coordinates);
              coordsData.put(location, coordinates);
            }
          } else {
            coordsData.put(location, cachedCoords);
          }
        }
        return coordsData;
      }
      throw new DataSourceException(
          "Location parameter is required. Please enter locations to search");
    } catch (MalformedURLException e) {
      throw new DataSourceException(e.getMessage());
    } catch (DataSourceException e) {
      throw new DataSourceException(e.getMessage());
    } catch (IOException e) {
      throw new DataSourceException(e.getMessage());
    }
  }

}
