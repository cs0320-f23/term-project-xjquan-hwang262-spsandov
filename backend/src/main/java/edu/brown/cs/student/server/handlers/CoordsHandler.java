package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.DataRecords.CoordsData;
import edu.brown.cs.student.server.DataSources.CoordsDataSource;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler that handles the /geoCoding endpoint. Contains instance of CoordsDataSource to get
 * Coordinates for the user inputted locations.
 */

public class CoordsHandler implements Route {

  private CoordsDataSource source;

  public CoordsHandler() {
    this.source = new CoordsDataSource();
  }

  /**
   * Handle method for the geoCoding endpoint, returning either a failure response with error error
   * message or success response with locations mapping to their coordinates
   *
   * @param request  The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return response in form of json depending on the success or failure of request
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      if (request.queryParams("location") == null || request.queryParams("location").isEmpty()) {
        return new CoordsFailureResponse("error_bad_request",
            "Location values are required. Please enter locations to search.").serialize();
      }

      List<String> locations = Arrays.stream(request.queryParams("location").split(",")).toList();
      Map<String, List<Double>> coordsData = source.getCoords(locations);
      CoordsData data = new CoordsData(coordsData);
      return new CoordsSuccessResponse(data.locationCoordinates()).serialize();
    } catch (Exception e) {
      return new CoordsFailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }

  /**
   * Failure Response record that will be returned in the case of a bad request or encountering of
   * exception
   *
   * @param result
   * @param error_message
   */
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
   * A record representing a successful call to the /geoCoding handler, containing a result of
   * success, as well as the coordinates for the inputted location
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
