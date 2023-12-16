package edu.brown.cs.student.server.handlers;


import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.DataSources.DataSourceException;
import edu.brown.cs.student.server.Utils.Wrapper;
import java.util.Arrays;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;


/**
 * A class that loads CSV data from a filepath parameter provided from the loadcsv endpoint.
 */
public class LoadPathHandler implements Route {


  /**
   * This method handles (i.e., executes specific actions) when the loadpath endpoint is accessed.
   *
   * @param request  - the request object providing information about the HTTP request
   * @param response - the response object providing functionality for modifying the response
   * @return an Object to be depicted on the user's end when the endpoint is accessed
   * @throws Exception if any Exception is thrown in the process
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      if (request.queryParams("location") == null || request.queryParams("location").isEmpty()) {
        return new FailureResponse("error_bad_request",
            "Location parameter is required. Please enter list of locations to search").serialize();
      }

      String[] locArray = request.queryParams("location").split(",");
      List<String> locations = Arrays.asList(locArray);

      //crashes when there is only two locations
      if (locations.size() <= 2) {
        return new SuccessResponse(locations).serialize();
      }

      Wrapper wrapper = new Wrapper(locations.get(0), locations);

      List<String> path = wrapper.run();

      return new SuccessResponse(path).serialize();

    } catch (DataSourceException e) {
      return new FailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }

  /**
   * Failure Response record that will be returned in the case of a bad request or encountering of
   * exception
   *
   * @param result
   * @param error_message
   */
  public record FailureResponse(String result, String error_message) {


    /**
     * This method serializes a failure response object.
     *
     * @return this failure response object, serialized as Json
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(LoadPathHandler.FailureResponse.class).toJson(this);
    }
  }


  /**
   * A record representing a successful call to the handler, containing a result of success, as well
   * as the path for the inputted locations
   */
  public record SuccessResponse(
      String result,
      List<String> path

  ) {


    public SuccessResponse(
        List<String> path) {
      this("success", path);
    }


    /**
     * This method serializes a success response object.
     *
     * @return this success response object, serialized as Json
     */
    public String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(LoadPathHandler.SuccessResponse.class).toJson(this);
    }
  }


}

