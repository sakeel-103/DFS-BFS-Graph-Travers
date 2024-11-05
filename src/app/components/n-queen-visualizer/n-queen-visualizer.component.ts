import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-n-queen-visualizer',
  templateUrl: './n-queen-visualizer.component.html',
  styleUrls: ['./n-queen-visualizer.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [NavbarComponent],
  standalone: true,
})
export class NQueenVisualizerComponent implements OnInit {
  isMainContainerVisible: boolean = false;
  n: number = 0;
  speed: number = 40;
  tempSpeed: number = 40;
  Board: number = 0;
  queenSymbol: string = '<i class="fas fa-chess-queen" style="color:#000"></i>';
  array: number[] = [0, 2, 1, 1, 3, 11, 5, 41, 93];
  positions: any = {};
  uuid: string[] = [];

  ngOnInit(): void {
    this.toggleVisibility();
  }

  toggleVisibility(): void {
    const landingPage = document.querySelector('.landing-div');
    const mainContainer = document.querySelector('.n-queen');

    if (this.isMainContainerVisible) {
      if (landingPage) landingPage.setAttribute('style', 'display: none');
      if (mainContainer) mainContainer.setAttribute('style', 'display: flex');
    } else {
      if (landingPage) landingPage.setAttribute('style', 'display: block');
      if (mainContainer) mainContainer.setAttribute('style', 'display: none');
    }
  }

  startButtonClick(): void {
    this.isMainContainerVisible = true;
    this.toggleVisibility();
  }

  onSliderChange(event: any): void {
    const slider = event.target;
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    progressBar.style.width = slider.value + '%';
    const sliderValue = parseInt(slider.value, 10);

    if (sliderValue <= 25) {
      progressBar.style.backgroundColor = 'green';
      slider.className = 'slider green';
    } else if (sliderValue > 25 && sliderValue <= 75) {
      progressBar.style.backgroundColor = '#ffd200';
      slider.className = 'slider yellow';
    } else {
      progressBar.style.backgroundColor = 'red';
      slider.className = 'slider red';
    }

    this.speed = (100 - sliderValue) * 10;
  }

  async isValid(
    board: number,
    r: number,
    col: number,
    n: number
  ): Promise<boolean> {
    const table = document.getElementById(
      `table-${this.uuid[board]}`
    ) as HTMLTableElement;
    if (!table) return false;

    const currentRow = table.rows[r];
    if (!currentRow) return false;

    const currentColumn = currentRow.cells[col];
    currentColumn.innerHTML = this.queenSymbol;
    await this.delay();

    // Check column
    for (let i = r - 1; i >= 0; --i) {
      const row = table.rows[i];
      const column = row.cells[col];
      const value = column.innerHTML;

      if (value === this.queenSymbol) {
        column.style.backgroundColor = '#ff0000';
        currentColumn.innerHTML = '-';
        return false;
      }
      column.style.backgroundColor = '#ddff00';
      await this.delay();
    }

    // Check upper left diagonal
    for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
      const row = table.rows[i];
      const column = row.cells[j];
      const value = column.innerHTML;

      if (value === this.queenSymbol) {
        column.style.backgroundColor = '#fb5607';
        currentColumn.innerHTML = '-';
        return false;
      }
      column.style.backgroundColor = '#ffca3a';
      await this.delay();
    }

    // Check upper right diagonal
    for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
      const row = table.rows[i];
      const column = row.cells[j];
      const value = column.innerHTML;

      if (value === this.queenSymbol) {
        column.style.backgroundColor = '#FB5607';
        currentColumn.innerHTML = '-';
        return false;
      }
      column.style.backgroundColor = '#ffca3a';
      await this.delay();
    }

    return true;
  }

  async clearColor(board: number): Promise<void> {
    const table = document.getElementById(
      `table-${this.uuid[board]}`
    ) as HTMLTableElement;
    if (!table) return;

    for (let j = 0; j < this.n; ++j) {
      const row = table.rows[j];
      for (let k = 0; k < this.n; ++k) {
        const cell = row.cells[k];
        cell.style.backgroundColor = (j + k) & 1 ? '#FF9F1C' : '#FCCD90';
      }
    }
  }

  delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.speed));
  }

  async solveQueen(
    board: number,
    r: number,
    n: number
  ): Promise<boolean | void> {
    if (r === n) {
      ++this.Board;
      const table = document.getElementById(
        `table-${this.uuid[this.Board]}`
      ) as HTMLTableElement;
      if (!table) return;

      for (let k = 0; k < n; ++k) {
        const row = table.rows[k];
        row.cells[this.positions[board][k]].innerHTML = this.queenSymbol;
      }
      this.positions[this.Board] = this.positions[board];
      return;
    }

    for (let i = 0; i < n; ++i) {
      await this.delay();
      await this.clearColor(board);

      if (await this.isValid(board, r, i, n)) {
        await this.delay();
        await this.clearColor(board);

        const table = document.getElementById(
          `table-${this.uuid[board]}`
        ) as HTMLTableElement;
        if (!table) continue;

        const row = table.rows[r];
        row.cells[i].innerHTML = this.queenSymbol;

        this.positions[board][r] = i;

        if (await this.solveQueen(board, r + 1, n)) {
          await this.clearColor(board);
        }

        await this.delay();
        board = this.Board;

        const newTable = document.getElementById(
          `table-${this.uuid[board]}`
        ) as HTMLTableElement;
        if (!newTable) continue;

        const newRow = newTable.rows[r];
        newRow.cells[i].innerHTML = '-';

        delete this.positions[board][r];
      }
    }
  }

  async nQueen(): Promise<void> {
    this.Board = 0;
    this.positions[this.Board] = {};
    const numberbox = document.getElementById('numberbox') as HTMLInputElement;
    if (numberbox) {
      numberbox.disabled = true;
      await this.solveQueen(this.Board, 0, this.n);
      await this.clearColor(this.Board);
      numberbox.disabled = false;
    }
  }

  async visualize(): Promise<void> {
    const chessBoard = document.getElementById('n-queen-board');
    const arrangement = document.getElementById('queen-arrangement');
    const numberbox = document.getElementById('numberbox') as HTMLInputElement;

    if (!chessBoard || !arrangement || !numberbox) return;

    this.n = parseInt(numberbox.value);

    if (this.n > 8) {
      numberbox.value = '';
      alert('Queen value is too large');
      return;
    } else if (this.n < 1) {
      numberbox.value = '';
      alert('Queen value is too small');
      return;
    }

    // Clear previous boards
    while (chessBoard.hasChildNodes()) {
      chessBoard.removeChild(chessBoard.firstChild as Node);
    }
    while (arrangement.lastChild) {
      arrangement.removeChild(arrangement.lastChild);
    }

    // Add info paragraph
    const para = document.createElement('p');
    para.setAttribute('class', 'queen-info');
    para.innerHTML = `For ${this.n}x${this.n} board, ${
      this.array[this.n] - 1
    } arrangements are possible.`;
    arrangement.appendChild(para);

    // Create boards
    if (chessBoard.childElementCount === 0) {
      for (let i = 0; i < this.array[this.n]; ++i) {
        this.uuid.push(Math.random().toString());
        const div = document.createElement('div');
        const table = document.createElement('table');
        const header = document.createElement('h4');

        header.innerHTML = `Board ${i + 1}`;
        table.setAttribute('id', `table-${this.uuid[i]}`);
        header.setAttribute('id', `paragraph-${i}`);

        chessBoard.appendChild(div);
        div.appendChild(header);
        div.appendChild(table);
      }
    }

    // Initialize boards
    for (let k = 0; k < this.array[this.n]; ++k) {
      const table = document.getElementById(
        `table-${this.uuid[k]}`
      ) as HTMLTableElement;
      if (!table) continue;

      for (let i = 0; i < this.n; ++i) {
        const row = table.insertRow(i);
        row.setAttribute('id', `Row${i}`);

        for (let j = 0; j < this.n; ++j) {
          const col = row.insertCell(j);
          col.style.backgroundColor = (i + j) & 1 ? '#FF9F1C' : '#FCCD90';
          col.innerHTML = '-';
          col.style.border = '0.3px solid #373f51';
        }
      }
    }
    await this.nQueen();
  }
}
