import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent {
  pickCardAnimation = false
  
  takeCard() {
    this.pickCardAnimation = true;
  }
}
