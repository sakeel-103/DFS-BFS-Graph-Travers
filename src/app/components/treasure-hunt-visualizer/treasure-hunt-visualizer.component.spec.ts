import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureHuntVisualizerComponent } from './treasure-hunt-visualizer.component';

describe('TreasureHuntVisualizerComponent', () => {
  let component: TreasureHuntVisualizerComponent;
  let fixture: ComponentFixture<TreasureHuntVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasureHuntVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureHuntVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
