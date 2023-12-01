package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
    Set<String> params = request.queryParams();
    List<String> locations = new java.util.ArrayList<>(
        List.of(request.queryParamsValues("location")));
    Map<String, Object> results = new HashMap<>();

    // Error Case : Incorrect Parameters
    for(String param: params) {
      if (!param.equals("location")) {
        results.put("result", "error");
        results.put("error_msg", "Incorrect Parameters");

        // Empty Locations (Privacy Purposes)
        locations.clear();

        return serialize(results);
      }
    }

    // Successful Case
    for(String location : locations) {
      // For Debugging Purposes
      System.out.println(location);
    }

    results.put("result", "success");
    // Defensive Programming
    results.put("path", new ArrayList<>(locations));

    // Empty Locations (Privacy Purposes)
    locations.clear();

    return serialize(results);
  }

  /**
   * Serializes an inputted Map into json format.
   *
   * @param results - the Map to be serialized
   * @return a String json representation of the results Map.
   */
  public static String serialize(Map<String, Object> results) {
    Moshi moshi = new Moshi.Builder().build();
    return moshi.adapter(Map.class).toJson(results);
  }
}
