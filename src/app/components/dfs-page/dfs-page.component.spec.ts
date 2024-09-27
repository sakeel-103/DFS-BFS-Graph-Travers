import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfsPageComponent } from './dfs-page.component';

describe('DfsPageComponent', () => {
  let component: DfsPageComponent;
  let fixture: ComponentFixture<DfsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
