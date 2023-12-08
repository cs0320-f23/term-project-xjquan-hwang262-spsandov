package edu.brown.cs.student;

import edu.brown.cs.student.server.DataSources.DataSourceException;
import edu.brown.cs.student.server.Utils.Dijkstra;
import edu.brown.cs.student.server.Utils.Wrapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestWrapper {
  @Test
  public void testSetUp() throws DataSourceException {
    Wrapper test = new Wrapper("Salomon Center", Arrays.asList("Salomon Center", "Sharpe Refectory", "Andrews Hall"));
    System.out.println(test.run());
  }
}
