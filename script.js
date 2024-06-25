
// Based on Data from patch 6.40
// List of total Exp required to reach each Level.
const pvpLvl = [
    0, 0, 2000, 4000, 6000, 8000, 11000, 14000, 17000, 20000, 23000, 27000, 
    31000, 35000, 39000, 43000, 48500, 54000, 59500, 65000, 70500, 78000, 85500, 
    93000, 100500, 108000, 118000, 128000, 138000, 148000, 158000, 178000, 198000, 
    218000, 238000, 258000, 278000, 298000, 318000, 338000, 358000
];

// Values for specific events and outcomes.
const frontlineWin_Exp = 1500;
const frontlineLose2_Exp = 1250;
const frontlineLose_Exp = 1000;
const frontlineDailyWin_Exp = 3000;
const frontlineDailyLose2_Exp = 2750;
const frontlineDailyLose_Exp = 2500;
const CrystalineWin_Exp = 900;
const CrystalineLose_Exp = 700;
const rivalwingsWin_Exp = 1250;
const rivalwingsLose_Exp = 750;

// Function to load input data from localStorage
function loadInputData() {
    const inputData = JSON.parse(localStorage.getItem("MalmstoneXPCalculator")) || {};
    for (const inputId in inputData) {
        if (inputData.hasOwnProperty(inputId)) {
            document.getElementById(inputId).value = inputData[inputId];
        }
    }
}

// Function to save input data to localStorage
function saveInputData() {
    const inputData = {
        "currentLevel": document.getElementById("currentLevel").value,
        "goalLevel": document.getElementById("goalLevel").value,
        "currentProgress": document.getElementById("currentProgress").value
    };
    localStorage.setItem("MalmstoneXPCalculator", JSON.stringify(inputData));
}
const element_currentLevel = document.getElementById("currentLevel");
const element_goalLevel = document.getElementById("goalLevel");
const element_currentProgress = document.getElementById("currentProgress");

// Use change listeners on the input elements to adjust minimum and maximum values
// Current level cannot be higher than goal level. Goal level cannot be lower than current level.
// Current progress cannot be higher than the difference between current level and goal level, when referring to the total exp required to reach the goal level.

function eventHandler_currentLevel(value) {
    if(value > element_goalLevel.value) {
        element_goalLevel.value = value;
    }
}


// Function to calculate XP
function calculateXP() {
    // Retrieve input values from DOM elements
    const current_level = parseInt(element_currentLevel.value);
    const goal_level = parseInt(element_goalLevel.value);
    const current_progress = parseInt(element_goalLevel.value);

    const outputDiv = document.getElementById("output");

    // Validate input values
    if (isNaN(current_level) || isNaN(goal_level) || isNaN(current_progress)) {
        outputDiv.innerHTML = "<p>Please set your Current Level, Goal Level, and Current XP Towards Next Level, and then click CALCULATE to generate your results!</p>";
        return;
    }
    

    // Rest of the code remains the same
    const current_level_memory = pvpLvl[current_level];
    const goal_level_memory = pvpLvl[goal_level];
    const exp = goal_level_memory - current_level_memory - current_progress;

    // Calculate the number of activities required for each outcome
    const cctotal_Win = Math.floor(exp / CrystalineWin_Exp) + (exp % CrystalineWin_Exp > 0 ? 1 : 0);
    const cctotal_Lose = Math.floor(exp / CrystalineLose_Exp) + (exp % CrystalineLose_Exp > 0 ? 1 : 0);
    const fltotal_Win = Math.floor(exp / frontlineWin_Exp) + (exp % frontlineWin_Exp > 0 ? 1 : 0);
    const fltotal_Lose = Math.floor(exp / frontlineLose_Exp) + (exp % frontlineLose_Exp > 0 ? 1 : 0);
    const fltotal_Lose2 = Math.floor(exp / frontlineLose2_Exp) + (exp % frontlineLose2_Exp > 0 ? 1 : 0);
    const fltotal_DailyWin = Math.floor(exp / frontlineDailyWin_Exp) + (exp % frontlineDailyWin_Exp > 0 ? 1 : 0);
    const fltotal_DailyLose = Math.floor(exp / frontlineDailyLose_Exp) + (exp % frontlineDailyLose_Exp > 0 ? 1 : 0);
    const fltotal_DailyLose2 = Math.floor(exp / frontlineDailyLose2_Exp) + (exp % frontlineDailyLose2_Exp > 0 ? 1 : 0);
    const rwtotal_Win = Math.floor(exp / rivalwingsWin_Exp) + (exp % rivalwingsWin_Exp > 0 ? 1 : 0);
    const rwtotal_Lose = Math.floor(exp / rivalwingsLose_Exp) + (exp % rivalwingsLose_Exp > 0 ? 1 : 0);

    // Display the results in the "output" div

    outputDiv.innerHTML = `
        <p>You have <label class="emphasis">${exp}</label> remaining XP to reach level <label class="emphasis">${goal_level}</label>!</p>    
        <p>You can reach your goal by doing any combination of the following activities:
        <ul>
            <li>Win <label class="emphasis">${cctotal_Win}</label> matches of Crystaline Conflict</li>
            <li>Lose <label class="emphasis">${cctotal_Lose}</label> matches of Crystaline Conflict</li>
            <li>Take 1st Place in <label class="emphasis">${fltotal_Win}</label> Frontlines</li>
            <li>Take 2nd Place in <label class="emphasis">${fltotal_Lose2}</label> Frontlines</li>
            <li>Take 3rd Place in <label class="emphasis">${fltotal_Lose}</label> Frontlines</li>
            <li>Take 1st Place in <label class="emphasis">${fltotal_DailyWin}</label> Daily Frontlines </li>
            <li>Take 2nd Place in <label class="emphasis">${fltotal_DailyLose2}</label> Daily Frontlines</li>
            <li>Take 3rd Place in <label class="emphasis">${fltotal_DailyLose}</label> Daily Frontlines</li>
            <li>Winning in <label class="emphasis">${rwtotal_Win}</label> Rival Wings matches</li>
            <li>Losing in <label class="emphasis">${rwtotal_Lose}</label> Rival Wings matches</li>
        </ul>
    `;

    // Save input data to localStorage
    saveInputData();
}

// Load input data from localStorage on page load
loadInputData();

// Call calculateXP() on the first load
calculateXP();
