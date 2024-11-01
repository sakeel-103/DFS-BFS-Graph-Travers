import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeminibotComponent } from './geminibot.component';

describe('GeminibotComponent', () => {
  let component: GeminibotComponent;
  let fixture: ComponentFixture<GeminibotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeminibotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeminibotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
