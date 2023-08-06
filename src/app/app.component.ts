import { Component, inject } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { initializeApp } from '@firebase/app';
import { collection, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'games')
    this.items$ = collectionData(aCollection);
    this.items$.subscribe((games) => {
      console.log(games)
    })
  }
}
