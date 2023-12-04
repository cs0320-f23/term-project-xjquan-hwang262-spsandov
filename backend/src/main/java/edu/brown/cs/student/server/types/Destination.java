package edu.brown.cs.student.server.types;

import java.util.List;

public class Destination {

  private double distance;
  private String name;
  private List<Double> location;

  public double getDistance(){
    return this.distance;
  }
  public void setDistance(double distance){
    this.distance=distance;
  }
  public String getName(){
    return this.name;
  }
  public void setName(String name){
    this.name=name;
  }
  public List<Double> getLocation(){
    return this.location;
  }
  public void setLocation(List<Double> location){
    this.location=location;
  }
}
