package edu.brown.cs.student.server.types;

/**
 * Class representing the Feature aspect of the fetched response from the api call
 */
public class Feature {
  private String type;
  private Geometry geometry;
  private String placeName;

  /**
   * Method that retrieves the type of the feature
   * @return type value
   */
  // Getters and setters
  public String getType() {
    return type;
  }

  /**
   * Method that sets the value of the type of the feature to a new type (passed in)
   * @param type value that will be the new value of the type
   */
  public void setType(String type) {
    this.type = type;
  }

  /**
   * Retrieval method for the coordinates of the feature
   * @return geometry class instance
   */
  public Geometry getGeometry() {
    return geometry;
  }

  /**
   * Method that sets the current geometry instance to a new value
   * @param geometry geometry value to take the place of the current geometry
   *                 value for the feature.
   */
  public void setGeometry(Geometry geometry) {
    this.geometry = geometry;
  }
  public String getPlaceName(){
    return placeName;
  }
  public void setPlaceName(String placeName){
    this.placeName= placeName;
  }
}
