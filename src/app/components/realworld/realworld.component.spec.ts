import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealworldComponent } from './realworld.component';

describe('RealworldComponent', () => {
  let component: RealworldComponent;
  let fixture: ComponentFixture<RealworldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealworldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
