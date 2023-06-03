import { offsetPosition as offsetPos } from "../utils/function.js";
import { GameTable } from "./GameTable.js";

export class Card {
  number;
  row;
  col;
  width;
  height;
  isOffset;
  gameTable;

  /**
   * @param {number} number
   * @param {number} row
   * @param {number} col
   * @param {boolean} isOffset
   * @param {GameTable} gameTable
   */
  constructor(number, row, col, isOffset, gameTable) {
    this.number = number;
    this.row = row;
    this.col = col;
    this.width = 100;
    this.height = 100;
    this.isOffset = isOffset;
    this.gameTable = gameTable;
  }

  /**
   * @returns {HTMLElement}
   */
  initializeCard() {
    let response = document.createElement("div");
    response.classList.add("card");
    response.id = `card-${this.number}`;
    response.innerHTML = this.number;
    response.setAttribute("col", this.col);
    response.setAttribute("row", this.row);
    if (this.isOffset) {
      response.setAttribute("offset", this.isOffset);
    }

    return response;
  }

  /**
   * @returns {HTMLElement}
   */
  create() {
    let element = this.initializeCard();
    this.updatePosition(element);
    this.listen(element);

    return element;
  }

  /**
   * @param {HTMLElement} element
   */
  listen(element) {
    element.addEventListener("click", () => {
      if (this.isMovable() && !this.isOffset) {
        this.move();
      }
    });
  }

  /**
   * @return {void}
   */
  render() {
    let element = this.create();
    document.querySelector(".card-container").appendChild(element);
  }

  /**
   * @param {HTMLElement} element
   * @return {void}
   */
  updatePosition(element) {
    element.style.top = `${this.y()}px`;
    element.style.left = `${this.x()}px`;
  }

  /**
   * @return {number}
   */
  distanceFromOffset() {
    let offsetPosition = this.gameTable.offsetCard.position();
    return Math.sqrt(
      Math.pow(this.position().top - offsetPosition.top, 2) +
        Math.pow(this.position().left - offsetPosition.left, 2)
    );
  }

  /**
   * @return {boolean}
   */
  isMovable() {
    return this.distanceFromOffset() == this.width;
  }

  /**
   * @return {number}
   */
  index() {
    for (let i = 0; i < this.gameTable.cards.length; i++) {
      if (this === this.gameTable.cards[i]) return i;
    }
  }

  /**
   * @return {HTMLElement}
   */
  getElement() {
    return document.getElementById(`card-${this.number}`);
  }

  /**
   * @return {void}
   */
  move(isRendering = true, push = true) {
    if (isRendering) {
      if (push) {
        this.gameTable.beginMoves.push(this.position());
        this.gameTable.endMoves.push(offsetPos());
      }
      let oldPosition = this.position();
      let newPosition = offsetPos();
      this.col = newPosition.left / this.width;
      this.row = newPosition.top / this.height;
      this.getElement().style.top = `${newPosition.top}px`;
      this.getElement().style.left = `${newPosition.left}px`;
      this.getElement().setAttribute("row", this.row);
      this.getElement().setAttribute("col", this.col);
      this.gameTable.updateOffsetCard(oldPosition, isRendering);

      this.changeColor();
      return;
    }

    if (push) {
      this.gameTable.beginMoves.push(this.position());
      this.gameTable.endMoves.push(this.gameTable.offsetCard.position());
    }
    let oldPosition = this.position();
    let newPosition = this.gameTable.offsetCard.position();
    this.col = newPosition.left / this.width;
    this.row = newPosition.top / this.height;
    this.gameTable.updateOffsetCard(oldPosition, isRendering);
  }

  /**
   * @return {void}
   */
  changeColor() {
    this.getElement().classList.add("active");
    window.setTimeout(() => {
      this.getElement().classList.remove("active");
    }, 200);
  }

  /**
   * @returns {number}
   */
  x() {
    return this.col * this.width;
  }

  /**
   * @returns {number}
   */
  y() {
    return this.row * this.height;
  }

  /**
   * @typedef {Object} Position
   * @property {number} top
   * @property {number} left
   */
  /**
   * @return {Position}
   */
  position() {
    return {
      top: this.y(),
      left: this.x(),
    };
  }
}
