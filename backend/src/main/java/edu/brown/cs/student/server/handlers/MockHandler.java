package edu.brown.cs.student.server.handlers;

import edu.brown.cs.student.server.handlers.LoadPathHandler.FailureResponse;
import edu.brown.cs.student.server.handlers.LoadPathHandler.SuccessResponse;
import java.util.Arrays;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class that handles the /mock endpoint
 */
public class MockHandler implements Route {

  /**
   * mocks path results by returning the same list of locations
   * @param request  The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return list of locations
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      if (request.queryParams("location") == null || request.queryParams("location").isEmpty()) {
        return new FailureResponse("error_bad_request",
            "Location parameter is required. Please enter locations to search").serialize();
      }
      String[] locArray = request.queryParams("location").split(",");
      List<String> locations = Arrays.asList(locArray);
      return new SuccessResponse(locations).serialize();
    } catch (Exception e) {
      return new FailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }
}
