import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';

  animal!: string;
  name!: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      this.game.players.push(name)
    });
  }

  ngOnInit() {
    this.newGame()
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCard.push(this.currentCard)
      }, 1000)
    }
  }
}
