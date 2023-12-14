package edu.brown.cs.student.TestDijkstra;

import edu.brown.cs.student.server.DataSources.DataSourceException;
import edu.brown.cs.student.server.Utils.Dijkstra;
import edu.brown.cs.student.server.Utils.Wrapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.Test;
import java.util.Random;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFuzz {
  /**
   * Fuzz Tests with random distances of 3 nodes
   */
  @Test
  public void testSmall() {
    // https://www.geeksforgeeks.org/generating-random-numbers-in-java/
    // Random Citation
    Random rand = new Random();
    for(int i = 0; i < 100; i++) {
      double dist1 = rand.nextDouble() * 100;
//      System.out.println(dist1);
      double dist2 = rand.nextDouble() * 100;
//      System.out.println(dist2);
      double dist3 = rand.nextDouble() * 100;
//      System.out.println(dist3);

      ArrayList<Object> L1 = new ArrayList<>(Arrays.asList("T", "Z", dist1));
      ArrayList<Object> L2 = new ArrayList<>(Arrays.asList("T", "H", dist2));
      ArrayList<Object> L3 = new ArrayList<>(Arrays.asList("H", "Z", dist3));
      ArrayList<List<Object>> list = new ArrayList<>();
      list.add(L1);
      list.add(L2);
      list.add(L3);
      Dijkstra test = new Dijkstra("H", new ArrayList<>(Arrays.asList("T", "Z", "H")), list);
      Dijkstra test2 = new Dijkstra("H", new ArrayList<>(Arrays.asList("T", "Z", "H")), list);

      // Property: Size
      assertEquals(test.run().size(), 3);
      assertEquals(test2.run().size(), 3);

      // Property: Consistent
      assertEquals(test.run(), test2.run());

    }

  }
}