package edu.brown.cs.student.server.Utils;

import com.beust.ah.A;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Dijkstra {
  public String start;
  public List<List<Object>> edges;
  // List<Object> looks like ["Location 1", "Location 2", Distance] = [String, String, int]
  public ArrayList<String> places;

  public Dijkstra(String start, ArrayList<String> places, List<List<Object>> edges) {
    this.start = start;
    this.edges = edges;
    this.places = places;
  }

  public List<String> run(){
    // Initializing
    HashMap<String, Integer> dijkstra = new HashMap<>();
    ArrayList<String> unvisited = new ArrayList<>();
    ArrayList<String> visited = new ArrayList<>();
    for(String place: this.places) {
      dijkstra.put(place, 40075); //40075 km is Earth's Circumference
      unvisited.add(place);
    }
    dijkstra.put(this.start, 0);
    unvisited.remove(this.start);
    visited.add(start);
    String currentNode = start;

    // Looping
    while(!unvisited.isEmpty()) {
      // Find Relevant Edges
      for(int i = 0; i < this.edges.size(); i++) {
        if(currentNode.equals(this.edges.get(i).get(0))) {
          dijkstra.put((String)this.edges.get(i).get(1), dijkstra.get(currentNode) + (int)this.edges.get(i).get(2));
        }
        else if(currentNode.equals(this.edges.get(i).get(1))) {
          dijkstra.put((String)this.edges.get(i).get(0), dijkstra.get(currentNode) + (int)this.edges.get(i).get(2));
        }
      }

      // Delete Seen Edges
      for(List<Object> edge: this.edges){
        if(currentNode.equals(edge.get(0)) || currentNode.equals(edge.get(1))){
          this.edges.remove(edge);
        }
      }

      // Find Next Node
      int min = 40075;
      for (Map.Entry<String, Integer> entry : dijkstra.entrySet()) {
        String key = entry.getKey();
        int value = entry.getValue();
        if(unvisited.contains(key) && value < min) {
          min = value;
        }
      }
      for (Map.Entry<String, Integer> entry : dijkstra.entrySet()) {
        String key = entry.getKey();
        int value = entry.getValue();
        if(unvisited.contains(key) && value == min) {
          currentNode = key;
        }
      }

      // Update
      unvisited.remove(currentNode);
      visited.add(currentNode);
    }

    // Returning
    return visited;
  }

}
