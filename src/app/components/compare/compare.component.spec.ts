import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgocompareComponent } from './compare.component';

describe('AlgocompareComponent', () => {
  let component: AlgocompareComponent;
  let fixture: ComponentFixture<AlgocompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgocompareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgocompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
