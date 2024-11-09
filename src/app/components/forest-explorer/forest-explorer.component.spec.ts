import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestExplorerComponent } from './forest-explorer.component';

describe('ForestExplorerComponent', () => {
  let component: ForestExplorerComponent;
  let fixture: ComponentFixture<ForestExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForestExplorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForestExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
