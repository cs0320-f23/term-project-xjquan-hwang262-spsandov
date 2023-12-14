package edu.brown.cs.student.server.types;

import java.util.List;

/**
 * Geometry class representing the Geometry aspect of the retrieved response from the api call.
 */
public class Geometry {
  private String type;
  private List<Double> coordinates;

  // Getters and setters

  /**
   * Method that returns the type variable
   * @return type instance
   */
  public String getType() {
    return type;
  }

  /**
   * Method that sets the type to a new value passed in.
   * @param type new type value for the current type value to be set to
   */
  public void setType(String type) {
    this.type = type;
  }

  /**
   * Method that gets the corrdinates of a given area
   * @return coordinate variable
   */
  public List<Double> getCoordinates() {
    return coordinates;
  }

  /**
   * Method that sets the coordinate value to a new passed in value
   * @param coordinates new coordinate value for the current coordinate value to be set to.
   */
  public void setCoordinates(List<Double> coordinates) {
    this.coordinates = coordinates;
  }
}
