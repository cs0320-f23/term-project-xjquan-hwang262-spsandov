package edu.brown.cs.student.server.types;

import java.util.List;

public class DistanceResponse {
  private String code;
  private List<List<Double>> distances;
  private List<Destination> destinations;
  private List<Destination> sources;



  public String getCode(){
    return code;
  }
  public void setCode(String code){
    this.code=code;
  }
  public List<List<Double>> getDistances(){
    return this.distances;
  }
  public void setDistances(List<List<Double>> distances){
    this.distances=distances;
  }
  public List<Destination> getDestinations(){
    return this.destinations;
  }
  public void setDestinations(List<Destination> destinations){
    this.destinations=destinations;
  }
  public List<Destination> getSources(){
    return this.sources;
  }
  public void setSources(List<Destination> sources){
    this.sources=sources;
  }
}
