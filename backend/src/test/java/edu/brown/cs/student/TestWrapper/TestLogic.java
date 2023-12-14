package edu.brown.cs.student.TestWrapper;

import edu.brown.cs.student.server.DataSources.DataSourceException;
import edu.brown.cs.student.server.Utils.Wrapper;
import java.util.Arrays;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestLogic {

  /**
   * Tests logic on small sample
   */

  @Test
  public void testSmall() throws DataSourceException {
    Wrapper test = new Wrapper("Sharpe Refectory", Arrays.asList("Salomon Center", "Sharpe Refectory", "Andrews Hall"));
    assertEquals("Sharpe Refectory", test.run().get(0));
    assertEquals("Salomon Center", test.run().get(1));
    assertEquals("Andrews Hall", test.run().get(2));
  }

  /**
   * Tests logic on bigger sample
   */
  @Test
  public void testBig() throws DataSourceException {
    Wrapper test = new Wrapper("Sharpe Refectory", Arrays.asList("Salomon Center", "Sharpe Refectory", "Sayles Hall", "Andrews Hall", "Nelson Fitness Center"));
    assertEquals("Sharpe Refectory", test.run().get(0));
    assertEquals("Sayles Hall", test.run().get(1));
    assertEquals("Salomon Center", test.run().get(2));
    assertEquals("Andrews Hall", test.run().get(3));
    assertEquals("Nelson Fitness Center", test.run().get(4));
  }
}

