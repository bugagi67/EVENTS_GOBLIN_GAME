export default class UIManager {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.currentGoblinPosition = null;
    this.board = null;
    this.modal = null;
    this.closeButton = null;
    this.playAgainButton = null;
    this.cells = null;
  }

  createGameBoard(board) {
    const cellsArray = [];
    for (let i = 0; i < this.boardSize; i += 1) {
      const row = document.createElement("tr");
      for (let j = 0; j < this.boardSize; j += 1) {
        const cell = document.createElement("td");
        cell.classList.add("cell_move");
        row.insertAdjacentElement("beforeend", cell);
        cellsArray.push(cell);
      }
      board.insertAdjacentElement("beforeend", row);
    }
    this.cells = cellsArray;
    this.board = board;

    return board;
  }

  showModal(message) {
    const modal = document.querySelector(".modal");
    this.modal = modal;
    modal.style.display = "block";

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal_content");
    modal.insertAdjacentElement("beforeend", modalContent);

    const x = document.createElement("span");
    x.classList.add("close");
    x.innerText = "✕";
    modalContent.insertAdjacentElement("afterbegin", x);

    const modalMessage = document.createElement("p");
    modalMessage.classList.add("modalMessage");
    modalMessage.innerHTML = `<h1>${message}</h1>`;
    x.insertAdjacentElement("afterend", modalMessage);

    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("playAgainButton");
    playAgainButton.innerText = "Попробуй снова";
    modalMessage.insertAdjacentElement("afterend", playAgainButton);

    this.closeButton = x;
    this.playAgainButton = playAgainButton;

    this.closeModal();
    this.playAgain();
  }

  closeModal() {
    this.closeButton.addEventListener("click", (e) => {
      if (e.target === this.closeButton) {
        window.location.reload();
      }
    });

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        window.location.reload();
      }
    });
  }

  playAgain() {
    this.playAgainButton.addEventListener("click", () => {
      window.location.reload();
    });
  }

  setClickCursor = (elem, cursor) => {
    if (elem.tagName === "IMG") {
      elem.addEventListener("mousedown", () => {
        document.body.style.cursor = cursor;
      });

      elem.addEventListener("mouseup", () => {
        setTimeout(() => {
          document.body.style.cursor = "default";
        }, 500);
      });
    }
  };
}
