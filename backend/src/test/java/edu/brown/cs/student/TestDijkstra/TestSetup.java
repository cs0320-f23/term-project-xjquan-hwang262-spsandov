package edu.brown.cs.student.TestDijkstra;

import edu.brown.cs.student.server.Utils.Dijkstra;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestSetup {
  /**
   * Tests a small setup of our Dijkstra's algorithm
   */
  @Test
  public void testSetUpSmall() {
    Dijkstra test = new Dijkstra("Boston", new ArrayList<>(Arrays.asList("Boston")), Collections.singletonList(new ArrayList<>(
        new ArrayList<>(Arrays.asList("One", "Two", 3)))));
    assertEquals("Boston", test.start);

    assertEquals("Boston", test.places.get(0));

    assertEquals("One", test.edges.get(0).get(0));
    assertEquals("Two", test.edges.get(0).get(1));
    assertEquals(3, test.edges.get(0).get(2));
  }

  /**
   * Tests a big setup of our Dijkstra's algorithm
   */
  @Test
  public void testSetUpBig() {
    ArrayList<List<Object>> list = new ArrayList<>();
    list.add(Arrays.asList("One", "Two", 3));
    list.add(Arrays.asList("Three", "Four", 15));

    Dijkstra test = new Dijkstra("Boston", new ArrayList<>(Arrays.asList("Boston", "New York", "Providence")), list);
    assertEquals("Boston", test.start);

    assertEquals("Boston", test.places.get(0));
    assertEquals("New York", test.places.get(1));
    assertEquals("Providence", test.places.get(2));

    assertEquals("One", test.edges.get(0).get(0));
    assertEquals("Two", test.edges.get(0).get(1));
    assertEquals(3, test.edges.get(0).get(2));
    assertEquals("Three", test.edges.get(1).get(0));
    assertEquals("Four", test.edges.get(1).get(1));
    assertEquals(15, test.edges.get(1).get(2));
  }
}
