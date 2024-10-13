import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-aboutUs-page',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css'],
})
export class AboutUsComponent {}
