package edu.brown.cs.student.TestDijkstra;

import edu.brown.cs.student.server.Utils.Dijkstra;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestFunctionality {

  /**
   * Tests a small example of our Dijkstra's algorithm (manually checked logic)
   */
  @Test
  public void testSmall() {
    ArrayList<Object> L1 = new ArrayList<>(Arrays.asList("T", "Z", 1));
    ArrayList<Object> L2 = new ArrayList<>(Arrays.asList("T", "H", 1));
    ArrayList<Object> L3 = new ArrayList<>(Arrays.asList("H", "Z", 1000));
    ArrayList<String> correct = new ArrayList<>(Arrays.asList("H", "Z", "T"));
    Dijkstra test = new Dijkstra("H", new ArrayList<>(Arrays.asList("T", "Z", "H")), Collections.singletonList(new ArrayList<>(
        Arrays.asList(L1, L2, L3))));
    assertEquals(correct, test.run());
  }

  /**
   * Tests a bigger example of our Dijkstra's algorithm (manually checked logic)
   */
  @Test
  public void testBig() {
    ArrayList<Object> L1 = new ArrayList<>(Arrays.asList("T", "Z", 60.0));
    ArrayList<Object> L2 = new ArrayList<>(Arrays.asList("T", "H", 65.0));
    ArrayList<Object> L3 = new ArrayList<>(Arrays.asList("H", "Z", 5.0));
    ArrayList<Object> L4 = new ArrayList<>(Arrays.asList("A", "T", 100.0));
    ArrayList<Object> L5 = new ArrayList<>(Arrays.asList("A", "H", 20.0));
    ArrayList<Object> L6 = new ArrayList<>(Arrays.asList("A", "Z", 3.0));
    ArrayList<List<Object>> list = new ArrayList<>();
    list.add(L1);
    list.add(L2);
    list.add(L3);
    list.add(L4);
    list.add(L5);
    list.add(L6);
    ArrayList<String> correct = new ArrayList<>(Arrays.asList("H", "Z", "A", "T"));
    Dijkstra test = new Dijkstra("H", correct, list);
    assertEquals(correct, test.run());
  }
}
