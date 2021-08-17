const { fifaData } = require("./fifa.js");

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter(function (item) {
  return item.Year === 2014 && item.Stage === "Final";
});
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log("Task 1A:", finals2014[0]["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log("Task 1B:", finals2014[0]["Away Team Name"]); // array[index]["key"]
//(c) Home Team goals for 2014 world cup final
console.log("Task 1C:", finals2014[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log("Task 1D:", finals2014[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log("Task 1E:", finals2014[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(dataArray) {
  // Return a filtered array of games (as objects) with a Stage of "Final"
  return dataArray.filter((game) => game.Stage === "Final");
}
// Check to see if the filtered data matches expectations
console.log("Task 2: All Games in Finals", getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(dataArray, getFinalsCB) {
  // Get the Finals Data, then map only the years from the games, and return the new "mapped" array
  return getFinalsCB(dataArray).map((game) => game.Year);
}
// Check to see if getYears() only returns years of games in finals
console.log("Task 3: Years of Finals", getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(dataArray, getFinalsCB) {
  // Initialize an array to store the names of the winning teams
  const finalsWinnersArray = [];
  // Check each game in the winners array
  getFinalsCB(dataArray).forEach((game) => {
    // If the home team scored more than the away team...
    if (game["Home Team Goals"] - game["Away Team Goals"] > 0) {
      // ...add the home team name to the winners array
      finalsWinnersArray.push(game["Home Team Name"]);
    } else if (game["Home Team Goals"] - game["Away Team Goals"] === 0) {
      // ...unless the game was a tie
      finalsWinnersArray.push("Neither team");
    } else {
      // ...otherwise, add the away team name to the winners array
      finalsWinnersArray.push(game["Away Team Name"]);
    }
  });
  // Spit out the winners list
  return finalsWinnersArray;
}
// Check if getWinners() spits out a list of winners
console.log("Task 4: List of Finals Winners", getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(dataArray, getYearsCB, getWinnersCB) {
  // Initialize Empty Array to store the results of the finals
  const yearlyFinalsResultsArray = [];
  // Check each year's results
  for (
    let index = 0;
    index < getYearsCB(dataArray, getFinals).length;
    index++
  ) {
    // Push annual finals outcomes line-by-line to the results array
    yearlyFinalsResultsArray.push(
      `In ${getYearsCB(dataArray, getFinals)[index]}, ${
        getWinnersCB(dataArray, getFinals)[index]
      } won the world cup!`
    );
  }
  // Spit out the results array
  return yearlyFinalsResultsArray;
}
// Log the annual results to check if the function works
console.log(
  "Task 5: List of Annual Outcomes...",
  getWinnersByYear(fifaData, getYears, getWinners)
);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalsCB) {
  // Add up the scores from every finals game (home and away goals, combine)
  const totalGoals = getFinalsCB.reduce((goals, game) => {
    return (goals += game["Home Team Goals"] + game["Away Team Goals"]);
  });
  return totalGoals;
  // Return the average number of goals scored in the finals, rounded to 2nd decimal place
  return parseFloat((totalGoals / getFinalsCB.length).toFixed(2));
}

console.log(
  "Task 6: Average Number of Goals in the Finals =>",
  getAverageGoals(getFinals(fifaData))
);

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {
  /* code here */
}

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
foo();
module.exports = {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};
