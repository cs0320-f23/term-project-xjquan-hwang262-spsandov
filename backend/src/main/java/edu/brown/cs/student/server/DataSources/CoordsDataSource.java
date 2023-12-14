package edu.brown.cs.student.server.DataSources;

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

/**
 * Class that handles most of the coords API call and returns data to the handler
 */
public class CoordsDataSource {

  private Cache<String, List<Double>> cache;
  private HashMap<String, List<Double>> coordsData;

  /**
   * Constructor that instantiates a cache and sets it to expire after 1 hour
   */
  public CoordsDataSource() {
    // set up cache, will delete every 1 hour
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

  /**
   * Method returning user inputted locations to its corresponding coordinates
   * @param locations inputs from user
   * @return map containing the location and its coordinates
   * @throws DataSourceException
   */
  public Map<String, List<Double>> getCoords(List<String> locations) throws DataSourceException {
    try {
      String accessToken = System.getenv("ACCESS_TOKEN");
      Moshi moshi = new Moshi.Builder().build();
      this.coordsData = new HashMap<>();

      if (!locations.isEmpty()) {
        for (String location : locations) {
          List<Double> cachedCoords = cache.getIfPresent(location);
          String locUrl = location.replace(" ","%20");
          if (cachedCoords == null) {
            URL requestURL = new URL(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" + locUrl + ".json?proximity=ip&access_token=pk.eyJ1Ijoic3BzYW5kb3YiLCJhIjoiY2xvaG42ZmU0MTR4dzJpcGVvbHFoMjhxYiJ9.PZ_G9Bd7BHljP7QroRCNLg");
            HttpURLConnection clientConnection = connect(requestURL);
            JsonAdapter<FeatureCollection> jsonAdapter = moshi.adapter(FeatureCollection.class);
            FeatureCollection featureCollection = jsonAdapter.fromJson(
                new Buffer().readFrom(clientConnection.getInputStream()));
            if (featureCollection != null && featureCollection.getFeatures() != null
                && !featureCollection.getFeatures()
                .isEmpty()) {
              List<Double> coordinates = featureCollection.getFeatures().get(0).getGeometry()
                  .getCoordinates();
              //add to cache for future reference
              cache.put(location, coordinates);
              coordsData.put(location, coordinates);
            }
          } else {
            coordsData.put(location, cachedCoords);
          }
        }
        //returns the dictionary mapping location name to its coordinates
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
