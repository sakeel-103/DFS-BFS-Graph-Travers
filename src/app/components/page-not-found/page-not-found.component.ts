import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Optional: You can log or perform actions when the page is initialized
    console.log('404 Page Not Found');
  }

}
