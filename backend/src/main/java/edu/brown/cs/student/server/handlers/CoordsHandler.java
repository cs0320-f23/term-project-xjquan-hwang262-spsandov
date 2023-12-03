package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.CoordsData;
import edu.brown.cs.student.server.CoordsDataSource;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class CoordsHandler implements Route {

  private CoordsDataSource source;

  public CoordsHandler() {
    this.source = new CoordsDataSource();
  }


  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {

      List<String> locations = Arrays.stream(request.queryParams("location").split(",")).toList();
      if (locations.isEmpty()) {
        return new CoordsFailureResponse("error_bad_request",
            "Location values are required. Please enter locations to search.").serialize();
      }
      Map<String, List<Double>> coordsData = source.getCoords(locations);
      CoordsData data = new CoordsData(coordsData);
      return new CoordsSuccessResponse(data.locationCoordinates()).serialize();
    } catch (Exception e) {
      return new CoordsFailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }

  public record CoordsFailureResponse(String result, String error_message) {

    /**
     * This method serializes a failure response object.
     *
     * @return this failure response object, serialized as Json
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(CoordsHandler.CoordsFailureResponse.class).toJson(this);
    }
  }

  /**
   * A record representing a successful call to the /coords handler, containing a result of success,
   * as well as the coordinates for the inputted location
   */
  public record CoordsSuccessResponse(
      String result,
      Map<String, List<Double>> coordinates

  ) {

    public CoordsSuccessResponse(
        Map<String, List<Double>> coordinates) {
      this("success", coordinates);
    }

    /**
     * This method serializes a success response object.
     *
     * @return this success response object, serialized as Json
     */
    public String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(CoordsHandler.CoordsSuccessResponse.class).toJson(this);
    }
  }
}
