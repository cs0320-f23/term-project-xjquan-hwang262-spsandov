package edu.brown.cs.student.server.types;

import edu.brown.cs.student.server.types.Feature;
import java.util.List;

/**
 * Class representing the FeatureCollection aspect of the fetched response.
 */
public class FeatureCollection {
  private String type;
  private List<Feature> features;

  // Getters and setters

  /**
   * Method that retrieves the type variable
   * @return type instance variable
   */
  public String getType() {
    return type;
  }

  /**
   * Method that sets the value for the type
   * @param type the new value that the type value should be set to
   */
  public void setType(String type) {
    this.type = type;
  }

  /**
   * Retrieval method of the list of features , used in redliningHandler class
   * @return list of features
   */
  public List<Feature> getFeatures() {
    return features;
  }

  /**
   * Sets the value of the list of features to a new value
   * @param features the new list of features to be set to the current list of features
   */
  public void setFeatures(List<Feature> features) {
    this.features = features;
  }

}
