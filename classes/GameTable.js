import { getOffsetCard, offsetPosition } from "../utils/function.js";
import { Card } from "./Card.js";

export class GameTable {
  cards;
  beginMoves;
  endMoves;
  offsetCard;

  init() {
    this.cards = [];
    this.cards.push(new Card(1, 0, 0, false, this));
    this.cards.push(new Card(2, 0, 1, false, this));
    this.cards.push(new Card(3, 0, 2, false, this));
    this.cards.push(new Card(4, 1, 0, false, this));
    this.cards.push(new Card(5, 1, 1, false, this));
    this.cards.push(new Card(6, 1, 2, false, this));
    this.cards.push(new Card(7, 2, 0, false, this));
    this.cards.push(new Card(8, 2, 1, false, this));
    this.beginMoves = [];
    this.endMoves = [];
    this.offsetCard = new Card("", 2, 2, true);
  }

  constructor() {
    this.init();
  }

  render() {
    this.cards.forEach((card) => {
      card.render();
    });
    this.offsetCard.render();
  }

  /**
   * @typedef {Object} Position
   * @property {number} top
   * @property {number} left
   */
  /**
   * @param {Position} position
   * @return {void}
   */
  updateOffsetCard(position, isRendering) {
    if (isRendering) {
      document.querySelector(".card-container").removeChild(getOffsetCard());
    }
    let col = position.left / 100;
    let row = position.top / 100;
    this.offsetCard = new Card("", row, col, true);
    if (isRendering) {
      this.offsetCard.render();
    }
  }

  /**
   * @return {Card[]}
   */
  cardsMovable() {
    let response = [];
    this.cards.forEach((card) => {
      if (card.isMovable()) {
        response.push(card);
      }
    });
    return response;
  }

  /**
   * @return {number[]}
   */
  cardsMovableNumber() {
    let response = [];
    this.cardsMovable().forEach((movable) => {
      response.push(movable.number);
    });
    return response;
  }

  /**
   * @param {number[]} moves
   * @return {void}
   */
  solve(moves) {
    console.log(moves);
    let count = moves.length - 1;
    window.setInterval(() => {
      if (count < 0) {
        return;
      }
      this.cards[moves[count] - 1].move();
      count--;
    }, 50);
  }

  /**
   * @typedef {Object} Position
   * @property {number} top
   * @property {number} left
   */
  /**
   * @param {Position} position
   * @return {Card}
   */
  find(position) {
    let response = null;
    this.cards.forEach((card) => {
      if (
        position.top == card.position().top &&
        position.left == card.position().left
      ) {
        response = card;
      }
    });
    return response;
  }

  /**
   * @return {void}
   */
  mix() {
    let index = 0;
    let count = 0;
    while (count < 20) {
      let movables = this.cardsMovable();
      movables = movables.filter((card) => card != this.cards[index]);

      let cardMoveIndex = 0;
      if (movables.length == 2) {
        cardMoveIndex = anime.random(0, 1);
      } else if (movables.length == 3) {
        cardMoveIndex = anime.random(0, 2);
      }
      let tempCard = movables[cardMoveIndex];
      let newIndex = tempCard.index();
      let moveCard = this.cards[newIndex];
      moveCard.move();
      index = newIndex;

      count++;
    }
  }

  checkwWin() {
    return (
      this.cards[0].col == 0 &&
      this.cards[0].row == 0 &&
      this.cards[1].col == 1 &&
      this.cards[1].row == 0 &&
      this.cards[2].col == 2 &&
      this.cards[2].row == 0 &&
      this.cards[3].col == 0 &&
      this.cards[3].row == 1 &&
      this.cards[4].col == 1 &&
      this.cards[4].row == 1 &&
      this.cards[5].col == 2 &&
      this.cards[5].row == 1 &&
      this.cards[6].col == 0 &&
      this.cards[6].row == 2 &&
      this.cards[7].col == 1 &&
      this.cards[7].row == 2
    );
  }
}
