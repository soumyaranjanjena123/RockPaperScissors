const PC = document.querySelector(".PC");
const player = document.querySelector(".player");
const keys = document.querySelectorAll(".icons-playing");
const game_starts = document.querySelector(".game-starts");
const competition = document.querySelector(".competition");
const won_text = document.querySelector("#won-text");
const lose_text = document.querySelector("#lose-text");
const draw_text = document.querySelector("#draw-text");
const subtitle_text = document.querySelector(".subtitle_text");
const click_play = document.querySelector(".click_play");
const reclick_play = document.querySelector(".reclick_play");
const player_rock = document.querySelector("#player-rock");
const pcRock = document.querySelector("#pc-rock");
const player_paper = document.querySelector("#player-paper");
const pcPaper = document.querySelector("#pc-paper");
const player_scissors = document.querySelector("#player-scissor");
const pcScissor = document.querySelector("#pc-scissor");
const player_pick_icon = document.querySelector(".player-pick-icon");
const pcIcon = document.querySelector(".pc-pick-icon");
const nextBtn = document.querySelector(".nextBtn");
const rulesBtn = document.querySelector(".rulesBtn");
const container = document.querySelector(".container");
const display_winner = document.querySelector(".display_winner");
const winner_click_play = document.querySelector(".winner_click_play");
const rules_displayed = document.querySelector(".how_to_play");
const backBtn = document.querySelector(".back");
const keysArray = Array.from(keys);

function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  PC.innerText = updatedScores.computer;
  player.innerText = updatedScores.user;
}
updateScoreDisplay();

console.log(keysArray);

const valueOfKey = (name) => {
  console.log(name);
  let keyVal = 0;
  if (name === "rock") {
    keyVal = 1;
  } else if (name === "paper") {
    keyVal = 2;
  } else if (name === "scissor") {
    keyVal = 3;
  }
  return keyVal;
};

const getRandomNumber = () => {
  const randomDecimal = Math.random();

  const randomNumber = Math.floor(randomDecimal * 3) + 1;

  return randomNumber;
};

const playRockPaperScissors = (playerchoice, pcchoice) => {
  if (playerchoice === pcchoice) {
    return "tie";
  } else if (
    (playerchoice === 1 && pcchoice === 3) ||
    (playerchoice === 2 && pcchoice === 1) ||
    (playerchoice === 3 && pcchoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

const updateScores = (result) => {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  localStorage.setItem("scores", JSON.stringify(scores));

  updateScoreDisplay();
};

const updateResultSides = (playerchoice, pcchoice) => {
  if (playerchoice === 1) {
    player_rock.style.display = "flex";
    player_paper.style.display = "none";
    player_scissors.style.display = "none";
  } else if (playerchoice === 2) {
    player_rock.style.display = "none";
    player_paper.style.display = "flex";
    player_scissors.style.display = "none";
  } else if (playerchoice === 3) {
    player_rock.style.display = "none";
    player_paper.style.display = "none";
    player_scissors.style.display = "flex";
  }

  if (pcchoice === 1) {
    pcRock.style.display = "flex";
    pcPaper.style.display = "none";
    pcScissor.style.display = "none";
  } else if (pcchoice === 2) {
    pcRock.style.display = "none";
    pcPaper.style.display = "flex";
    pcScissor.style.display = "none";
  } else if (pcchoice === 3) {
    pcRock.style.display = "none";
    pcPaper.style.display = "none";
    pcScissor.style.display = "flex";
  }
};

const updatecompetition = (result, playerchoice, pcchoice) => {
  game_starts.style.display = "none";
  competition.style.display = "flex";

  if (result === "tie") {
    won_text.style.display = "none";
    lose_text.style.display = "none";
    subtitle_text.style.display = "none";
    click_play.style.display = "none";
    nextBtn.style.display = "none";

    draw_text.style.display = "block";
    reclick_play.style.display = "block";

    updateResultSides(playerchoice, pcchoice);
    player_pick_icon.classList.remove("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "user") {
    lose_text.style.display = "none";
    draw_text.style.display = "none";
    reclick_play.style.display = "none";

    won_text.style.display = "block";
    subtitle_text.style.display = "block";
    click_play.style.display = "block";
    nextBtn.style.display = "inline";

    updateResultSides(playerchoice, pcchoice);

    player_pick_icon.classList.add("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "comp") {
    won_text.style.display = "none";
    draw_text.style.display = "none";
    reclick_play.style.display = "none";
    nextBtn.style.display = "none";

    lose_text.style.display = "block";
    subtitle_text.style.display = "block";
    click_play.style.display = "block";

    updateResultSides(playerchoice, pcchoice);

    player_pick_icon.classList.remove("green-background");
    pcIcon.classList.add("green-background");
  }
};

const keyClickHander = (event) => {
  const target = event.target;
  const parentDiv = target.closest(".icons-playing"); 

  if (parentDiv) {
    const keyClicked = parentDiv.id; 
    console.log("keyClicked:", keyClicked);
    const playerchoice = valueOfKey(keyClicked);
    console.log("playerchoice:", playerchoice);

    const pcchoice = getRandomNumber();
    console.log("pcchoice:", pcchoice);

    const result = playRockPaperScissors(playerchoice, pcchoice);
    console.log("Result: ", result);

    updateScores(result);

    updatecompetition(result, playerchoice, pcchoice);
  }
};

const playAgainHandler = (event) => {
  game_starts.style.display = "flex";
  competition.style.display = "none";
  container.style.display = "block";
  display_winner.style.display = "none";
};

const nextPageHandler = () => {
  container.style.display = "none";
  display_winner.style.display = "flex";
  nextBtn.style.display = "none";
};

const showRulesHandler = () => {
  console.log("inisde showRulesHandler ");
  backBtn.style.display = "flex";
  rules_displayed.style.display = "flex";
};

const removeRulesHandler = () => {
  backBtn.style.display = "none";
  rules_displayed.style.display = "none";
};

keysArray.forEach((key) => key.addEventListener("click", keyClickHander));
reclick_play.addEventListener("click", playAgainHandler);
click_play.addEventListener("click", playAgainHandler);
nextBtn.addEventListener("click", nextPageHandler);
winner_click_play.addEventListener("click", playAgainHandler);
rulesBtn.addEventListener("click", showRulesHandler);
backBtn.addEventListener("click", removeRulesHandler);