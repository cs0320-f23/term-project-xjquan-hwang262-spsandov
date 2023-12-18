# term-project-xjquan-hwang262-spsandov--


## Project Details


Bruno Maps is a full-stack web application that lets you search for the most efficient route between destinations at Brown given a list of locations and a desired starting location. Maps was built using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/),
[NPM] (https://www.npmjs.com/), [VSCode] (https://code.visualstudio.com/),
[Github] (https://github.com/), [Spark] (http://sparkjava.com/), [Java] (https://www.java.com/),
[IntelliJ IDEA] (https://www.jetbrains.com/idea/), [Fetch API] (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Console.log] (https://developer.mozilla.org/en-US/docs/Web/API/Console/log)


## Install


To install this project, you must clone from [GitHub](https://github.com/cs0320-f23/term-project-xjquan-hwang262-spsandov.git). Run the following commands in your terminal:
```shell
git clone https://github.com/cs0320-f23/maps-jstifel1-xjquan.git
cd term-project-xjquan-hwang262-spsandov
```


## Running Bruno Maps
To run this project on a local server, please cd into the Frontend folder and run the following commands.


```shell
cd frontend
npm install
npm start
```


To run the backend server, please run the server Java file in the “backend” directory. Please navigate to the correct directory via the following command.


```shell
cd backend
```
## Using Maps


### Find


To find the most optimized route, run the `find` command in the command prompt:


```shell
find <List of Locations>
```


where <List of Locations> is a list of destinations that you would like to include, with the first input being your starting location. This should be submitted in the form of a CSV String (i.e. find Sharpe Refectory, Andrews Hall, Blue Room). Please also note that the project works best when locations are limited on Brown University’s campus.


### Mode


By default, the program displays the output of each command. To toggle between the different display modes, run `mode` for a brief output and run `mode` again to switch back to a more verbose output. The command `mode` toggles in between both modes.


## Errors & Bugs


As we know of, there are currently no known errors in the functionality of the program. Given a larger input of destinations alongside a wider range of destinations (expanding outside of Brown’s campus) yield presentation errors, but we believe this is outside of the discussion scope of our project.


## Testing


To install the Playwright testing suite for Maps, run the following commands in your terminal:


```shell
npm install playwright
npx playwright install
```


To run frontend tests, run the following commands in your terminal (integration tests are present here):


```shell
npx playwright test
```


To run backend tests, please open pom.xml with IntelliJ and visit the “test” folder in the backend directory. Fuzz testing and other unit tests can also be found here.


## Handlers


1. Coords Handler handles the /geoCoding endpoint of our program. 
It calls on the ‘getCoords’ method from the ‘CoordsDataSource’ class that takes in a list of locations and returns a hashmap mapping location name to its list of coordinates. The Handler returns a success response with the hashmap or a failure response with an error message if the request resulted in an error. Endpoint mainly meant for developers.
Ex backend call: 
http://localhost:3232/geoCoding?location=Saloman%20Center,%20Sayles%20Hall,%20Sciences%20Library 
Result: {"result":"success","coordinates":{"Saloman Center":[38.335024,40.91431]," Sciences Library":[-71.40017,41.826976]," Sayles Hall":[-71.402564,41.826246]}} 


2. Distance Handler handles the /distance endpoint of our program. It calls on the ‘getDistance’ method from the ‘DistanceDataSource’ class to obtain the list of distances between each inputted location and the source location. The handler returns a success response with a list of distances between the source location and each of the desired destinations or a failure response with an error message. Endpoint mainly meant for developers.
Ex backend call: http://localhost:3232/distance?location=Salomon%20Center,%20Sharpe%20Refectory,%20Sciences%20Library
Result: {"result":"success","distances":[0.0,292.3,311.3]}


3. LoadPath Handler is the main handler used in our project, and it is the one that interacts with our frontend component. By using the locations inputted from the frontend’s command box, this handler calls the Wrapper class (which calls the Dijkstra class), to calculate the most efficient route between the locations. This handler then serializes the results accordingly and serves them back to the frontend. 
Ex backend call: http://localhost:3232/loadpath?location=Sharpe%20Refectory,%20Andrews%20Hall,%20Salomon%20Center
Result: {"result":"success","path":["Sharpe Refectory"," Salomon Center"," Andrews Hall"]} 


4. MockHandler handles the /mock endpoint in which no API calls are made, but rather dijkstra results are mocked. 
Ex backend call: http://localhost:3232/mock?location=Sharpe%20Refectory,%20Sayles%20Hall,%20Salomon%20Center
Result: {"result":"success","path":["Sharpe Refectory"," Sayles Hall"," Salomon Center"]} 
## Design Decisions


1. For organizational purposes, we separated the logic from Dijkstra’s algorithm and the API calls to MapBox. This is shown in the following two classes: Wrapper & Dijkstra. We believe this design decision is best for our project because the separation allows us to test individual components accordingly. This means we can ensure one part is bug-free before developing a subsequent component of the project. Moreover, This allows developers to use Dijkstra's implementation on units other than distance (e.g., time, cost, etc…). 


2. To reduce unnecessary duplicate API calls to the geoCoding API, the ‘getCoords’ method in the ‘CoordsDataSource’ class keeps a cache that expires after every hour. This helps our program be more efficient by reducing the amount of time that is spent on making API calls.


3. The API call logic is separated from its handlers through the ‘CoordsDataSource’ and ‘DistanceDataSource’ classes which allow for the usage of the ‘getCoords’ and ‘getDistances’ methods for testing and Dijkstra purposes without needing to call the handler. 


## Contributors

By **xjquan**, **hwang262**, and **spsandov**
