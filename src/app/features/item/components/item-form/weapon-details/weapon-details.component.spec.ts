import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponDetailsComponent } from './weapon-details.component';

describe('WeaponDetailsComponent', () => {
  let component: WeaponDetailsComponent;
  let fixture: ComponentFixture<WeaponDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
