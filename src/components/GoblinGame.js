import UIManager from "./UIManager";
import hammerImg from "../images/hammer1.png";
import goblinImg from "../images/goblin.png";

export default class GoblinGame {
  constructor() {
    this.UIMANAGER = new UIManager(4);
    this.board = null;
    this.modal = null;
    this.intervalId = null;
    this.hits = 0;
    this.miss = 0;
    this.cursor = `url("${hammerImg}"), auto`;
  }

  gameInit() {
    document.addEventListener("DOMContentLoaded", () => {
      const gameBoard = document.querySelector("#game_container");
      this.UIMANAGER.createGameBoard(gameBoard);
      this.board = this.UIMANAGER.board;
      this.goblinHandleClick(this.UIMANAGER.currentGoblinPosition);
      this.intervalId = setInterval(this.moveGoblin, 1000);
    });
  }

  moveGoblin = () => {
    const randomIndex = Math.floor(Math.random() * this.UIMANAGER.cells.length);
    const randomCell = this.UIMANAGER.cells[randomIndex];
    if (this.goblinImgElement) {
      this.goblinImgElement.remove();
    }
    this.currentGoblinPosition = randomCell;

    const img = document.createElement("img");
    img.src = goblinImg;
    this.goblinImgElement = img;
    this.miss++;
    this.drawScoreGame(this.hits, this.miss);
    randomCell.insertAdjacentElement("beforeend", img);
  };

  goblinHandleClick() {
    this.board.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        const img = e.target;
        this.UIMANAGER.setClickCursor(img);
        requestAnimationFrame(() => {
          img.style.cursor = this.cursor;
        });
        this.hits++;
        this.drawScoreGame(this.hits, this.miss);
      } else {
        this.miss++;
        this.drawScoreGame(this.hits, this.miss);
      }
    });
  }

  drawScoreGame(hits, miss) {
    const innerHits = document.querySelector(".hits");
    const innerMiss = document.querySelector(".miss");
    innerHits.innerText = hits;
    innerMiss.innerText = miss;
    if (this.miss >= 5) {
      this.showEndGame("Ты проиграл!!!");
    } else if (this.hits >= 5) {
      this.showEndGame("Ты победил!!!");
    }
  }

  showEndGame(message) {
    const modal = document.querySelector(".modal");

    if (modal) {
      this.modal = modal;
      this.modal.style.display = "block";
      this.UIMANAGER.showModal(message);

      clearInterval(this.intervalId);
    }
  }
}
