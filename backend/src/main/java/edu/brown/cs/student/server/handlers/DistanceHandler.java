package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.DataRecords.DistanceData;
import edu.brown.cs.student.server.DataSources.DistanceDataSource;
import java.util.Arrays;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Class that handles the /distance endpoint that retrieves the distances between the source
 * location and other inputted location. Contains an instance of DistanceDataSource to obtain
 * distance values
 */
public class DistanceHandler implements Route {

  /**
   * Handle method that converts the inputted locations into a list of strings and uses them to find
   * coordinates and distances. If distances are found successfully, a success message will be
   * returned with the distances (list of doubles). Otherwise, a failure response will returned with
   * an error message
   *
   * @param request  The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return success or failure message
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      DistanceDataSource distanceDataSource = new DistanceDataSource();
      if (request.queryParams("location") == null || request.queryParams("location").isEmpty()) {
        return new DistanceFailureResponse("error_bad_request",
            "Location values are required. Please enter locations to search.").serialize();
      }
      List<String> locations = Arrays.stream(request.queryParams("location").split(",")).toList();

      List<Double> distances = distanceDataSource.getDistances(locations);
      DistanceData data = new DistanceData(distances);
      return new DistanceSuccessResponse(data.distances()).serialize();
    } catch (Exception e) {
      return new DistanceFailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }

  /**
   * Failure Response record that will be returned in the case of a bad request or encountering of
   * exception
   *
   * @param result
   * @param error_message
   */
  public record DistanceFailureResponse(String result, String error_message) {

    /**
     * This method serializes a failure response object.
     *
     * @return this failure response object, serialized as Json
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(DistanceHandler.DistanceFailureResponse.class).toJson(this);
    }
  }

  /**
   * A record representing a successful call to the /distance handler, containing a result of
   * success, as well as the coordinates for the inputted location
   */
  public record DistanceSuccessResponse(
      String result,
      List<Double> distances

  ) {

    public DistanceSuccessResponse(
        List<Double> distances) {
      this("success", distances);
    }

    /**
     * This method serializes a success response object.
     *
     * @return this success response object, serialized as Json
     */
    public String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(DistanceHandler.DistanceSuccessResponse.class).toJson(this);
    }
  }
}
