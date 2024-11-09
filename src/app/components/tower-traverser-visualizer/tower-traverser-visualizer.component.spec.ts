import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerTraverserVisualizerComponent } from './tower-traverser-visualizer.component';

describe('TowerTraverserVisualizerComponent', () => {
  let component: TowerTraverserVisualizerComponent;
  let fixture: ComponentFixture<TowerTraverserVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TowerTraverserVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TowerTraverserVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
