import { Card } from "../classes/Card.js";
import { GameTable } from "../classes/GameTable.js";

/**
 * @return {number[][]}
 */
export function mixPossibilities() {
  let response = [[6], [8]];
  let count = 1;
  while (count < 20) {
    let tableau = response.filter((element) => element.length == count);
    tableau.forEach((moves) => {
      let gameTable = new GameTable();
      gameMoveArray(gameTable, moves);
      let movables = cardsMovable(gameTable, moves);
      movables.forEach((movable) => {
        let newArray = [...moves];
        newArray.push(movable);
        response.push(newArray);
      });
    });

    count++;
  }
  return response;
}

/**
 * @param {GameTable} gameTable
 * @return {number[][]}
 */
export function solve(gameTable) {
  let response = [];
  let moves = mixPossibilities();
  moves.forEach((move) => {
    let gt = cloneGameTable(gameTable);
    let count = 0;
    for (let i = move.length - 1; i >= 0; i--) {
      if (!gt.cards[move[i] - 1].isMovable()) {
        break;
      }
      gt.cards[move[i] - 1].move(false, false);
      count++;
    }
    if (count == move.length) {
      if (gt.checkwWin()) {
        response.push(move);
      }
    }
    // * A commenter si on veut voir toutes les solutions
    if (response.length == 1) {
      return response;
    }
  });
  return response;
}

/**
 * @param {GameTable} gameTable
 * @return {GameTable}
 */
function cloneGameTable(gameTable) {
  let response = new GameTable();
  let cards = [];
  gameTable.cards.forEach((card) => {
    cards.push(new Card(card.number, card.row, card.col, false, response));
  });
  response.offsetCard = new Card(
    gameTable.offsetCard.number,
    gameTable.offsetCard.row,
    gameTable.offsetCard.col,
    true,
    response
  );
  response.cards = cards;

  return response;
}

/**
 * @param {GameTable} gameTable
 * @param {number[]} moves
 * @return {number[]}
 */
function cardsMovable(gameTable, moves) {
  let avoid = moves[moves.length - 1];
  let movables = gameTable.cardsMovable();
  movables = movables.filter((movable) => movable.number != avoid);
  let response = [];
  movables.forEach((movable) => response.push(movable.number));
  return response;
}

/**
 * @param {GameTable} gameTable
 * @param {number[]} moves
 * @return {void}
 */
function gameMoveArray(gameTable, moves) {
  moves.forEach((move) => {
    let moveindex = move - 1;
    gameTable.cards[moveindex].move(false, false);
  });
}
