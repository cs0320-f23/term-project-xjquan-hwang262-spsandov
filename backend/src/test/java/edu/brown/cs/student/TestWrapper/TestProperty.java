package edu.brown.cs.student.TestWrapper;

import edu.brown.cs.student.server.DataSources.DataSourceException;
import edu.brown.cs.student.server.Utils.Wrapper;
import java.util.Arrays;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestProperty {

  /**
   * Tests property correctness of our Wrapper Class
   */

  @Test
  public void testProperty() throws DataSourceException {
    Wrapper test = new Wrapper("Sharpe Refectory", Arrays.asList("Salomon Center", "Sharpe Refectory", "Andrews Hall"));
    // Start Field Correct
    assertEquals("Sharpe Refectory", test.start);

    // Locations Field Correct
    assertEquals("Salomon Center", test.locations.get(0));
    assertEquals("Sharpe Refectory", test.locations.get(1));
    assertEquals("Andrews Hall", test.locations.get(2));

    // Output Size Correct
    assertEquals(test.run().size(), 3);

    // Output Fields Correct (Manual Check)
    System.out.println(test.run());
  }
}
