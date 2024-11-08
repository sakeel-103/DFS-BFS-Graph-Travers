import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotComponent } from './robot.component';

describe('RobotComponent', () => {
  let component: RobotComponent;
  let fixture: ComponentFixture<RobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
