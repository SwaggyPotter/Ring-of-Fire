import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, doc, getDoc, setDoc, onSnapshot, addDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { DocumentSnapshot, FirestoreDataConverter } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  constructor(private router: Router) {

  }

  async newGame() {
    let game = new Game();
    const docRef = await addDoc(collection(this.firestore, 'games'), { name: game.toJson() });
    this.router.navigateByUrl('/game/' + docRef.id);
  }
}
