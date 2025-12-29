// ---------------------------------------------------------
// GLOBAL SCORES (shared)
let humanScore = 0;
let computerScore = 0;

// ---------------------------------------------------------
// 1st Computer choice (shared)
function getComputerChoice() {
  const randomNumber = Math.random();
  if (randomNumber < 0.33) return "rock";
  if (randomNumber < 0.66) return "paper";
  return "scissors";
}

// ---------------------------------------------------------
// 2nd Single round logic (shared)
function playRound(human, computer) {
  if (human === computer) {
    return { winner: "draw", message: `It's a draw! Both chose ${human}` };
  }

  if (
    (human === "rock" && computer === "scissors") ||
    (human === "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper")
  ) {
    humanScore++;
    return { winner: "human", message: `${human} beats ${computer}. You win this round!` };
  } else {
    computerScore++;
    return { winner: "computer", message: `${computer} beats ${human}. You lose this round!` };
  }
}

// -----------------------
// 3rd CONSOLE GAME
function getHumanChoice() {
  let choice;
  while (true) {
    choice = prompt("Enter rock, paper, or scissors:");
    if (!choice) continue;
    choice = choice.toLowerCase();
    if (choice === "rock" || choice === "paper" || choice === "scissors") return choice;
    console.log("Invalid input. Please try again.");
  }
}

function playGameConsole(rounds = 5) {
  humanScore = 0;
  computerScore = 0;

  for (let round = 1; round <= rounds; round++) {
    console.log(`--- Round ${round} ---`);
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);
    console.log(result.message);
    console.log(`Score → Human: ${humanScore}, Computer: ${computerScore}`);
  }

  console.log("--- Final Result ---");
  if (humanScore > computerScore) console.log("You won the game!");
  else if (computerScore > humanScore) console.log("You lost the game.");
  else console.log("The game ended in a tie/draw.");
}

// -----------------------
// 4th DOM / UI GAME
function initDOMGame() {
  humanScore = 0;
  computerScore = 0;

  const buttons = document.querySelectorAll("button[data-choice]");
  const resultsDiv = document.querySelector("#results");
  const scoreDiv = document.querySelector("#score");

  function updateUI(result) {
    resultsDiv.textContent = result.message;
    scoreDiv.textContent = `Human: ${humanScore} | Computer: ${computerScore}`;
    if (humanScore === 5 || computerScore === 5) {
      resultsDiv.textContent += humanScore === 5 ? " — You Finally won the game!" : " — Computer Finally won the game!";
      buttons.forEach(btn => btn.disabled = true);
    }
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const humanChoice = button.dataset.choice;
      const computerChoice = getComputerChoice();
      const result = playRound(humanChoice, computerChoice);
      updateUI(result);
    });
  });
}

// -----------------------
// USAGE TECH:
// 1️⃣ For you to Call console game in terminal:
// playGameConsole();  - i.e. in your index.html file

// 2️⃣ For you to Call DOM/UI game in browser:
// initDOMGame();


