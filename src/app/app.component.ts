import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular7Movie';


    constructor(
        private router: Router

    ) {

    }

    logout() {

        this.router.navigate(['/']);
    }
}
