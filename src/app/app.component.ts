import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/aboutUs-page/aboutUs.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainIndexComponent } from './components/main-index/main-index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ForumComponent } from './components/forum/forum.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutUsComponent,
    LoginPageComponent,
    MainIndexComponent,
    NavbarComponent,
    ForumComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected here
})
export class AppComponent {
  title = 'Graph-Traversal';
}
