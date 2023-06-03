import { GameTable } from "./classes/GameTable.js";
import { mixPossibilities, solve } from "./utils/large.js";

let gameTable = new GameTable();
gameTable.render();

document.getElementById("solve").addEventListener("click", () => {
  if (!gameTable.checkwWin()) {
    let response = solve(gameTable);
    gameTable.solve(response[0]);
  }
});

document.getElementById("mix").addEventListener("click", () => {
  document.querySelector(".card-container").animate([{ opacity: 0 }], {
    duration: 200,
    fill: "forwards",
  });
  window.setTimeout(() => {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      document.querySelector(".card-container").removeChild(card);
    });
    gameTable = new GameTable();
    gameTable.render();
    gameTable.mix();
    document.querySelector(".card-container").animate([{ opacity: 1 }], {
      duration: 200,
      fill: "forwards",
    });
  }, 500);
});
