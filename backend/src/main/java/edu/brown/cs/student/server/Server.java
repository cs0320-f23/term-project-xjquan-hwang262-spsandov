package edu.brown.cs.student.server;

import edu.brown.cs.student.server.handlers.CoordsHandler;
import edu.brown.cs.student.server.handlers.DistanceHandler;
import edu.brown.cs.student.server.handlers.LoadPathHandler;
import spark.Spark;

import static spark.Spark.after;

/**
 * Top-level class that contains the main() method which starts Spark and runs the various handlers
 * through a Server instance.
 */
public class Server {

  /**
   * Constructor for the Server class.
   *
   */
  public Server() {
    int port = 3232;

    Spark.port(port);
    after(
      (request, response) -> {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "*");
      });
    Spark.get("loadpath", new LoadPathHandler());
    Spark.get("geoCoding",new CoordsHandler());
    Spark.get("distance", new DistanceHandler());
    Spark.init();
    Spark.awaitInitialization();

    // This print statement was kept for easy access to the URL
    System.out.println("Server started at http://localhost:" + port);
  }

  /**
   * The initial method called when execution begins.
   *
   * @param args - an array of program arguments.
   */
  public static void main(String[] args) {
    new Server();
  }
}
