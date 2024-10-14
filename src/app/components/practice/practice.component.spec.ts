import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeComponent } from './practice.component';

describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
