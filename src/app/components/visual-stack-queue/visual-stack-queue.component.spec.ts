import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualStackQueueComponent } from './visual-stack-queue.component';

describe('VisualStackQueueComponent', () => {
  let component: VisualStackQueueComponent;
  let fixture: ComponentFixture<VisualStackQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualStackQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualStackQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
