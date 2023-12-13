package edu.brown.cs.student;

import edu.brown.cs.student.server.Utils.Dijkstra;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestDijkstra {
  @Test
  public void testSetUp() {
    Dijkstra test = new Dijkstra("Boston", new ArrayList<>(Arrays.asList("Boston")), Collections.singletonList(new ArrayList<>(
        new ArrayList<>(Arrays.asList("One", "Two", 3)))));
    assertEquals("Boston", test.start);
    assertEquals("Boston", test.places.get(0));
    assertEquals("One", test.edges.get(0).get(0));
    assertEquals("Two", test.edges.get(0).get(1));
    assertEquals(3, test.edges.get(0).get(2));
  }

  @Test
  public void testSmall() {
    ArrayList<Object> L1 = new ArrayList<>(Arrays.asList("T", "Z", 60));
    ArrayList<Object> L2 = new ArrayList<>(Arrays.asList("T", "H", 65));
    ArrayList<Object> L3 = new ArrayList<>(Arrays.asList("H", "Z", 5));
    ArrayList<String> correct = new ArrayList<>(Arrays.asList("H", "Z", "T"));
    Dijkstra test = new Dijkstra("H", new ArrayList<>(Arrays.asList("T", "Z", "H")), Collections.singletonList(new ArrayList<>(
    Arrays.asList(L1, L2, L3))));
    assertEquals(correct, test.run());
  }
}
