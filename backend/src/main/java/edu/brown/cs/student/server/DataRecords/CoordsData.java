package edu.brown.cs.student.server.DataRecords;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public record CoordsData(Map<String, List<Double>> locationCoordinates) {

}
