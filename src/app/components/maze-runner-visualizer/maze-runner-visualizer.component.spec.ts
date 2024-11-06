import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeRunnerVisualizerComponent } from './maze-runner-visualizer.component';

describe('MazeRunnerVisualizerComponent', () => {
  let component: MazeRunnerVisualizerComponent;
  let fixture: ComponentFixture<MazeRunnerVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeRunnerVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeRunnerVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
