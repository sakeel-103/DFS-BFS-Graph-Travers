import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoSearchComponent } from './algo-search.component';

describe('AlgoSearchComponent', () => {
  let component: AlgoSearchComponent;
  let fixture: ComponentFixture<AlgoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
