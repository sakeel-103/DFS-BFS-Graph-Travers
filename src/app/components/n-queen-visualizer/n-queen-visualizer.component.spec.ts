import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NQueenVisualizerComponent } from './n-queen-visualizer.component';

describe('NQueenVisualizerComponent', () => {
  let component: NQueenVisualizerComponent;
  let fixture: ComponentFixture<NQueenVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NQueenVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NQueenVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
