const startButton = document.querySelector(".startButton");
const welcomeMessage = document.querySelector(".welcomeMessage");
const nameInputContainer = document.querySelector(".nameInputContainer");
const nameInput = document.querySelector("#nameInputField");
const ruleList = document.querySelector(".ruleList");
const playMessage = document.querySelector(".playMessage");
const levelMessage = document.querySelector(".levelMessage");
const playerContainer = document.querySelector(".playerContainer");
const buttonContainer = document.querySelector(".buttonContainer");
const leftBtn = document.querySelector(".leftButton");
const forwardBtn = document.querySelector(".forwardButton");
const rightBtn = document.querySelector(".rightButton");
const hideBtn = document.querySelector(".hideButton");
const runBtn = document.querySelector(".runButton");
const fightBtn = document.querySelector(".fightButton");
const continueBtn = document.querySelector(".continueButton");
const restartBtn = document.querySelector(".restartButton");
const combatButtonContainer = document.querySelector(".combatButtonContainer");
const healthAmount = document.createElement("p");

let screenCount = 0;

const player = {
  name: "",
  health: 100,
  isBeingChased: false,
  monster: "",
};

const descriptions = [
  {
    description: "The room is covered in fine dust and has a strange smell",
  },
  {
    description:
      "The room is saturated in a thick mist, it is difficult to breathe",
  },
  {
    description:
      "The room is almost entirely devoid of light. After fumbling a bit you gain your bearings",
  },
  {
    description:
      "The lighting of the room casts a deep shadow into the corners. You are unable to make anything out...but you don't feel alone",
  },
  {
    description:
      "There is a loud clang as you enter the room, in a hurry you look around. No one is there",
  },
  {
    description:
      "The room is half full of a slimy muck. You find it difficult to walk in",
  },
  {
    description:
      "As you walk into the room a peculiar stench fills the air. You feel youreslf begin to panic",
  },
];

let monsters = [
  {
    name: "Basilisk",
    health: 1000,
    image:
      "https://images.unsplash.com/photo-1570741066052-817c6de995c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1886&q=80",
  },
  {
    name: "Wild Hog",
    health: 250,
  },
  {
    name: "Zombie",
    health: 25,
  },
  {
    name: "Mutant Rat",
    health: 20,
  },
  {
    name: "Vengeful Spirit",
    health: 200,
  },
  {
    name: "Centaur",
    health: 600,
  },
  {
    name: "Ogre",
    health: 900,
  },
  {
    name: "Hydra",
    health: 5000,
  },
  {
    name: "Frederick The Forsaken",
    health: 500,
  },
];

startButton.addEventListener("click", () => {
  console.log("Game started.");
  restartBtn.classList.add("hide");
  startGame();
});

const startGame = () => {
  if (nameInput.value) {
    welcomeMessage.classList.add("hide");
    playMessage.textContent = `Okay ${nameInput.value}, I hope you're ready. The rules of the game are simple:`;
    ruleList.classList.remove("hide");
    nameInputContainer.classList.add("hide");
    startButton.innerHTML = "";
    player.name = nameInput.value;
    healthAmount.textContent = `Health: ${player.health}`;
    setTimeout(() => {
      ruleList.classList.add("hide"),
        buttonContainer.classList.remove("hide"),
        playerContainer.append(healthAmount),
        (playMessage.textContent = ""),
        (levelMessage.textContent = `You awake in a dimly lit room, 
    the light seems to come from all around, and yet from nowhere all at once. You can't remember much beyond your name, you must find out where you are. What do you wish to do?`);
    }, 6000);
  } else if (!nameInput.value) {
    welcomeMessage.textContent = `You must enter a name!`;
  }
  localStorage.setItem("playerName", player.name);
};

let rememberedName = localStorage.getItem("playerName");
nameInput.value = rememberedName;

let choice = "";

leftBtn.addEventListener("click", () => {
  choice = "left";
  let chance = Math.floor(Math.random() * 100);
  nextScreen(player.health, choice, chance);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

forwardBtn.addEventListener("click", () => {
  choice = "forward";
  let chance = Math.floor(Math.random() * 100);
  nextScreen(player.health, choice, chance);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

rightBtn.addEventListener("click", () => {
  choice = "right";
  let chance = Math.floor(Math.random() * 100);
  nextScreen(player.health, choice, chance);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

const nextScreen = (health, choice, chance) => {
  const monster = monsters[Math.floor(Math.random() * monsters.length)];
  const description =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  if (health > 0) {
    console.log(`Your health is ${health}, and you chose to go ${choice}`);

    if (chance >= 66) {
      console.log("Chance is great than 66");
      levelMessage.textContent = `You advance into the next room. ${description.description}, again you're faced with three ways to go. Which will you choose?`;
      if (player.isBeingChased) {
        levelMessage.textContent = `You advance into the next room. It is eerily similar to the other rooms, again you're faced with three ways to go. Which will you choose?`;
        player.isBeingChased = false;
      }
      leftBtn.textContent = "Go Left";
      forwardBtn.textContent = "Go Forward";
      rightBtn.textContent = "Go Right";
    } else if (chance >= 25) {
      levelMessage.textContent = `You advance into the next room... it is eerily similar to the other rooms, and yet different. ${description.description}, you can't quite place why but you feel extremely sick. You lose some of your life force (-5).`;
      player.health = player.health - 5;
      healthAmount.textContent = `Health: ${player.health}`;
      leftBtn.textContent = "Go Left";
      forwardBtn.textContent = "Go Forward";
      rightBtn.textContent = "Go Right";
    } else if (chance >= 0) {
      console.log("Chance is 0");
      console.log(monster);
      if (monster.health <= 0) {
        levelMessage.textContent = `You've made your choice to move on, in the next room you stumble upon the remains of the ${monster.name} you fought earlier, you should keep going.`;
      } else if (monster.health >= 1) {
        levelMessage.textContent = `You've made your choice to move on, you now come face to face with a ${monster.name}! What will you do?`;
        player.isBeingChased = true;
        player.monster = monster;
        buttonContainer.classList.add("hide");
        combatButtonContainer.classList.remove("hide");
      }
    }
  } else {
    levelMessage.textContent = `You perish alone in the darkness.`;
    buttonContainer.classList.add("hide");
  }
};

const combatChoice = (choice, monster, player) => {
  const playerDamage = Math.floor(Math.random() * monster.health + 1);
  const monsterDamage = Math.floor(Math.random() * 10);
  let chance = Math.floor(Math.random() * 100);
  healthAmount.textContent = `Health: ${player.health}`;
  if (choice === "Hide") {
    if (chance >= 50) {
      levelMessage.textContent = `You chose to hide from the ${monster.name}... you were successful!`;
      continueBtn.classList.remove("hide");
      combatButtonContainer.classList.add("hide");
    } else if (chance <= 50) {
      levelMessage.textContent = `You chose to hide from the ${monster.name}... you were unsuccessful! The ${monster.name} attacks you! It deals ${monsterDamage} point(s) of damage! What do you want to do?`;
      player.health = player.health - monsterDamage;
      healthAmount.textContent = `Health: ${player.health}`;
    }
  } else if (choice === "Run") {
    if (chance >= 50) {
      levelMessage.textContent = `You chose to run from the ${monster.name}. You were successful...for now`;
      continueBtn.classList.remove("hide");
      combatButtonContainer.classList.add("hide");
    } else if (chance <= 50) {
      levelMessage.textContent = `You chose to run from the ${monster.name}. You were unsuccesful! The ${monster.name} attacks you! It deals ${monsterDamage} point(s) of damage! What do you wish to do?`;
      player.health = player.health - monsterDamage;
      healthAmount.textContent = `Health: ${player.health}`;
    }
  } else if (choice === "Fight") {
    player.health = player.health - monsterDamage;
    monster.health = monster.health - playerDamage;
    levelMessage.textContent = `You choose to fight the ${monster.name}! You attack and do ${playerDamage} point(s) damage! The ${monster.name} hits back, dealing ${monsterDamage} point(s) of damage! The ${monster.name} has ${monster.health} point(s) left. What do you wish to do?`;
    healthAmount.textContent = `My Health: ${player.health}`;
  }
  if (monster.health <= 0) {
    levelMessage.textContent = `You managed to slay the ${monster.name}!`;
    continueBtn.classList.remove("hide");
    combatButtonContainer.classList.add("hide");
    player.isBeingChased = false;
  }
};

hideBtn.addEventListener("click", () => {
  choice = "Hide";
  combatChoice(choice, player.monster, player);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

runBtn.addEventListener("click", () => {
  choice = "Run";
  combatChoice(choice, player.monster, player);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

fightBtn.addEventListener("click", () => {
  choice = "Fight";
  combatChoice(choice, player.monster, player);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

continueBtn.addEventListener("click", () => {
  choice = "";
  let chance = Math.floor(Math.random() * 100);
  buttonContainer.classList.remove("hide");
  continueBtn.classList.add("hide");
  nextScreen(player.health, choice, chance);
  screenCount = screenCount + 1;
  isPlayerAlive(player.health);
});

const isPlayerAlive = (health) => {
  if (health <= 0) {
    levelMessage.textContent = `You perish alone in the darkness.`;
    buttonContainer.classList.add("hide");
    combatButtonContainer.classList.add("hide");
    continueBtn.classList.add("hide");
    restartBtn.classList.remove("hide");
    healthAmount.classList.add("hide");
    playMessage.textContent = `You made it ${screenCount} screens.`;
  }
};

restartBtn.addEventListener("click", () => {
  location.reload();
});

const restartGame = () => {
  player.health = 100;
  levelMessage.textContent = "";
  playMessage.textContent = "";
  continueBtn.classList.add("hide");
  restartBtn.classList.add("hide");
  startGame();
};

const resetGame = () => {
  if (nameInput.value) {
    startGame();
  }
};

resetGame();

localStorage.clear();
