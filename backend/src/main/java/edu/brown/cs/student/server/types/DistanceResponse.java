package edu.brown.cs.student.server.types;

import java.util.List;

/**
 * Class representing the Distance Response retrieved from api call to the matrix api
 */
public class DistanceResponse {
  private String code;
  private List<List<Double>> distances;
  private List<Destination> destinations;
  private List<Destination> sources;


  /**
   * Getter method for the code
   * @return
   */
  public String getCode(){
    return code;
  }

  /**
   * Setter method for the code
   * @param code
   */
  public void setCode(String code){
    this.code=code;
  }

  /**
   * Getter method for the distances
   * @return
   */
  public List<List<Double>> getDistances(){
    return this.distances;
  }

  /**
   * Setter method for the distances
   * @param distances
   */
  public void setDistances(List<List<Double>> distances){
    this.distances=distances;
  }

  /**
   * Getter method for the Destinations
   * @return
   */
  public List<Destination> getDestinations(){
    return this.destinations;
  }

  /**
   * Setter method for the Destinations
   * @param destinations
   */
  public void setDestinations(List<Destination> destinations){
    this.destinations=destinations;
  }

  /**
   * Getter method for the sources
   * @return
   */
  public List<Destination> getSources(){
    return this.sources;
  }

  /**
   * Setter method for sources
   * @param sources
   */
  public void setSources(List<Destination> sources){
    this.sources=sources;
  }
}
