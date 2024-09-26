import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorDetailsComponent } from './armor-details.component';

describe('ArmorDetailsComponent', () => {
  let component: ArmorDetailsComponent;
  let fixture: ComponentFixture<ArmorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
