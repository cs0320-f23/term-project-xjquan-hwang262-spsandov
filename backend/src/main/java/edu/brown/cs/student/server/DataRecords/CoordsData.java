package edu.brown.cs.student.server.DataRecords;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Record containing a hashmap that maps a location to its coordinates
 * @param locationCoordinates
 */
public record CoordsData(Map<String, List<Double>> locationCoordinates) {

}
