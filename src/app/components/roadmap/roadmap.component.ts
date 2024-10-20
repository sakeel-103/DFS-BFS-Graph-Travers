import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-roadmap-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
})
export class RoadmapPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
