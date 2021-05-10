// liste des variables
let userScore = 0;
let computerScore = 0;
let userHighScore = 0;
let computerHighScore = 0;
let smallUserWord = "(Joueur)".fontsize(3).sub();
let smallComputerWord = "(Ordinateur)".fontsize(3).sub();
let userScoreDiv = document.getElementById("userScore");
let computerScoreDiv = document.getElementById("computerScore");
let userHighScoreTable = document.getElementById("boardPlayer");
let computerHighScoreTable = document.getElementById("boardIA");
const scoreBoardDiv = document.querySelector(".scoreBoard");
const resultP = document.querySelector(".result > p");
const rockDiv = document.getElementById("rock");
const paperDiv = document.getElementById("paper");
const scissorsDiv = document.getElementById("scissors");

// liste des fonctions

// fonction choix de l'ordinateur : génére un nombre aléatoire entre 0 et 2, qui correspond à l'ordre des éléments du tableau où sont indiqués les 3 choix disponibles (pierre feuille ciseaux)
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

// j'ai tendance a tout mettre en anglais donc, ici pour l'affichage en fr sur la page
function convertToFrench(word) {
  if (word === "rock") return "Pierre";
  if (word === "paper") return "Feuille";
  else return "Ciseaux";
}

// gagner : on incrémente le score pour le joueur, on affiche le résultat via innerHTML, et on ajoute une phrase qui célèbre votre victoire
function win(userChoiceParam, computerChoiceParam) {
  userScore++;
  userScoreDiv.innerHTML = userScore;
  computerScoreDiv.innerHTML = computerScore;
  resultP.innerHTML = `${convertToFrench(
    userChoiceParam
  )}${smallUserWord} gagne contre  ${convertToFrench(
    computerChoiceParam
  )}${smallComputerWord} Vous avez gagné`;
  glow("userWeaponChoice", "green-glow");
  glow("computerWeaponChoice", "red-glow");
  highScoreUser();
}

// la même version défaite
function lost(userChoiceParam, computerChoiceParam) {
  computerScore++;
  computerScoreDiv.innerHTML = computerScore;
  userScoreDiv.innerHTML = userScore;
  resultP.innerHTML = `${convertToFrench(
    userChoiceParam
  )}${smallUserWord} perd contre ${convertToFrench(
    computerChoiceParam
  )}${smallComputerWord} Vous avez perdu`;
  glow("computerWeaponChoice", "green-glow");
  glow("userWeaponChoice", "red-glow");
  highScoreIA();
}

//égalité
function draw() {
  resultP.innerHTML = "égalité";
  glow("computerWeaponChoice", "grey-glow");
  glow("userWeaponChoice", "grey-glow");
}

//fonction ajout changement de couleurs des bordures
function glow(player, color) {
  const choiceDiv = document.getElementById(player);
  choiceDiv.classList.add(color);
  setTimeout(() => choiceDiv.classList.remove(color), 300);
}

//fonction avec event sur clic, avec en paramètre le choix du joueur
//D'abord on affiche les 2 armes choisies à l'écran via le DOM
//Ensuite un switch pour les différents cas (victoire défaite ou égalité) avec 2 paramètres dans le switch qui correspondent au choix joueur et ordinateur

function game(userChoice) {
  const computerChoice = getComputerChoice();
  const userWeaponChoice = document.getElementById("userWeaponChoice");
  const computerWeaponChoice = document.getElementById("computerWeaponChoice");
  const imgRock = document.getElementById(userChoice);
  const imgWeapon = document.getElementById(computerChoice);
  userWeaponChoice.innerHTML = imgRock.innerHTML;
  computerWeaponChoice.innerHTML = imgWeapon.innerHTML;

  switch (userChoice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win(userChoice, computerChoice);
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      lost(userChoice, computerChoice);
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      draw();
  }
}

// Declenche la fonction game lors du clic sur l'icône choisie
function main() {
  rockDiv.addEventListener("click", () => game("rock"));
  paperDiv.addEventListener("click", () => game("paper"));
  scissorsDiv.addEventListener("click", () => game("scissors"));
}
main();

// function test()
// {
//     var newImgChoice = document.createElement("img");
//     newImgChoice.src = 'src/rock.png';
//     newImgChoice.setAttribute("class", "mh-100 mw-100");
//     newImgChoice.setAttribute("alt", "Pierre");
//     var imgChoiceOrigin = document.getElementById("imgRock");
//     var parentDiv = imgChoiceOrigin.parentNode
//     parentDiv.replaceChild(newImgChoice, imgChoiceOrigin)
//     newImgChoice.id = "imgRock";
// }

function highScoreUser() {
  if (userScore % 3 == 0) {
    userHighScore++;
    userHighScoreTable.innerHTML = userHighScore;
  }
}

function highScoreIA() {
  if (computerScore % 3 == 0) {
    computerHighScore++;
    computerHighScoreTable.innerHTML = computerHighScore;
  }
}
