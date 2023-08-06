import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { DocumentSnapshot, FirestoreDataConverter } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { getDatabase, ref, child, push, update } from "firebase/database";
import { set } from '@angular/fire/database';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  game!: Game;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  gameId;
  docRef;
  animal!: string;
  name!: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.game = new Game()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name.length > 0) {
        this.game.players.push(name)
        this.saveGame()
      }
    });
  }

  ngOnInit(): void {
    this.newGame()
    this.route.params.subscribe((params) => {
      this.docRef = onSnapshot(doc(this.firestore, "games", `${params['id']}`), (doc) => {
        this.gameId = params['id'];
        let theArray = doc.data();
        this.game.currentPlayer = theArray['name']['currentPlayer'];
        this.game.playedCard = theArray['name']['playedCards'];
        this.game.players = theArray['name']['players'];
        this.game.stack = theArray['name']['stack'];
        this.game.pickCardAnimation = theArray['name']['pickCardAnimation'];
        this.game.currentCard = theArray['name']['currentCard'];
      })
    })
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame()
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCard.push(this.game.currentCard)
        this.saveGame()
      }, 1000)
    }
  }

  saveGame() {
    let db = this.firestore
    setDoc(doc(db, "games", this.gameId), { name: this.game.toJson() })
  }

}
