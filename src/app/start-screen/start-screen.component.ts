import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router) {

  }

  newGame() {
    this.router.navigateByUrl('/game')
  }
}
