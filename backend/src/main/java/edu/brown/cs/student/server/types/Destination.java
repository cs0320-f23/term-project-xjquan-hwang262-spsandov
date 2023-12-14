package edu.brown.cs.student.server.types;

import java.util.List;

/**
 * Class representing the Destination aspect of the fetched response from apu call
 */
public class Destination {

  private double distance;
  private String name;
  private List<Double> location;

  /**
   * Getter method for distance
   * @return
   */
  public double getDistance(){
    return this.distance;
  }

  /**
   * Setter method for distance
   * @param distance
   */
  public void setDistance(double distance){
    this.distance=distance;
  }

  /**
   * Getter methdo for name
   * @return
   */
  public String getName(){
    return this.name;
  }

  /**
   * Setter method for name
   * @param name
   */
  public void setName(String name){
    this.name=name;
  }

  /**
   * Getter methdod for locoation
   * @return
   */
  public List<Double> getLocation(){
    return this.location;
  }

  /**
   * Setter methdof for location
   * @param location
   */
  public void setLocation(List<Double> location){
    this.location=location;
  }
}
