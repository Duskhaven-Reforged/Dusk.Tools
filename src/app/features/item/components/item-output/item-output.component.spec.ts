import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOutputComponent } from './item-output.component';

describe('ItemOutputComponent', () => {
  let component: ItemOutputComponent;
  let fixture: ComponentFixture<ItemOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
