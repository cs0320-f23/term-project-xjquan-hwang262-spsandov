package edu.brown.cs.student.server.Utils;

import edu.brown.cs.student.server.DataRecords.DistanceData;
import edu.brown.cs.student.server.DataSources.DataSourceException;
import edu.brown.cs.student.server.DataSources.DistanceDataSource;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Wrapper {
  String start;
  List<String> locations;
  public Wrapper(String start, List<String> locations) {
    this.start = start;
    this.locations = locations;
  }

  public List<String> run() throws DataSourceException {
    // Create a list of edges
    List<List<Object>> edges = new ArrayList<>();
    for(int i = 0; i < this.locations.size(); i++) {
      for(int j = 0; j < this.locations.size(); j++) {
        if (j < i) {
          edges.add(Arrays.asList(locations.get(i), locations.get(j)));
        }
      }
    }
    System.out.println(edges);

    // Adding Distance
    DistanceDataSource handler = new DistanceDataSource();

    int i = 0;
    for(List<Object> edge : edges){
      List<Double> distance = handler.getDistances(Arrays.asList((String) edge.get(0), (String) edge.get(1)));
      System.out.println(distance.get(1));
      edges.set(i, Arrays.asList(edge.get(0), edge.get(1), distance.get(1)));
      System.out.println(edge);
      i++;
    }

    System.out.println(edges);

    // Calling Dijkstra
    ArrayList<String> list = new ArrayList<>();
    list.addAll(this.locations);
    Dijkstra algo = new Dijkstra(this.start, list, edges);
    System.out.println("before dijkstra run");
    List<String> dijkstraOutput = algo.run();
    System.out.println("dijkstra output: "+ dijkstraOutput);
    return dijkstraOutput;
  }
}
