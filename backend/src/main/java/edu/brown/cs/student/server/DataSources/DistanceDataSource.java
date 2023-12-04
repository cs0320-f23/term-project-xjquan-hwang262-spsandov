package edu.brown.cs.student.server.DataSources;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.DataSources.CoordsDataSource;
import edu.brown.cs.student.server.types.DistanceResponse;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import okio.Buffer;

/**
 * Class that contains most of the logic for making the distance api call
 */
public class DistanceDataSource {

  public DistanceDataSource() {

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
   * Helper method that rearranges coordinates obtained from coords API call into a string suitable
   * for making an api call to find distance
   * @param locations
   * @return
   * @throws DataSourceException
   */
  public String getCoordsString(List<String> locations) throws DataSourceException {
    try {
      CoordsDataSource source = new CoordsDataSource();
      List<List<Double>> coordsList = new ArrayList<>();
      for (String loc : locations) {
        coordsList.add(source.getCoords(locations).get(loc));
      }
      StringBuilder result = new StringBuilder();
      for (List<Double> coords : coordsList) {
        if (result.length() > 0) {
          result.append(";");
        }
        for (Double value : coords) {
          result.append(value).append(",");
        }
        if (result.length() > 0) {
          result.deleteCharAt(result.length() - 1);
        }

      }
      return result.toString();
    } catch (Exception e) {
      e.printStackTrace();
      throw new DataSourceException(e.getMessage());
    }
  }

  /**
   * Makes the api call using the coordinates found from the coordsAPI call and obtains
   * list of distances from the source location (0th input) to the other inputted locations
   * @param locations
   * @return list of distances
   * @throws DataSourceException
   */
  public List<Double> getDistances(List<String> locations) throws DataSourceException {
    try {
      String coordsUrl = getCoordsString(locations);
      String accessToken = System.getenv("ACCESS_TOKEN");
      Moshi moshi = new Moshi.Builder().build();
      URL requestURL = new URL(
          "https://api.mapbox.com/directions-matrix/v1/mapbox/walking/" + coordsUrl
              + "?sources=0&annotations=distance&access_token=" + accessToken);
      HttpURLConnection clientConnection = connect(requestURL);
      JsonAdapter<DistanceResponse> jsonAdapter = moshi.adapter(DistanceResponse.class);
      DistanceResponse distanceResponse = jsonAdapter.fromJson(
          new Buffer().readFrom(clientConnection.getInputStream()));
      if (distanceResponse != null && distanceResponse.getDistances().get(0) != null
          && !distanceResponse.getDistances().get(0).isEmpty()) {
        List<Double> distances = distanceResponse.getDistances().get(0);
        System.out.println("distances : "+ distances);

        return distances;
      }
      return new ArrayList<>();
    } catch (Exception e) {
      throw new DataSourceException(e.getMessage());
    }
  }
}
