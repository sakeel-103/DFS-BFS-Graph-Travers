import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfsPageComponent } from './bfs-page.component';

describe('BfsPageComponent', () => {
  let component: BfsPageComponent;
  let fixture: ComponentFixture<BfsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BfsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BfsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
