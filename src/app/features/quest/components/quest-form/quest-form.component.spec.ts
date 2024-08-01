import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestFormComponent } from './quest-form.component';

describe('QuestFormComponent', () => {
  let component: QuestFormComponent;
  let fixture: ComponentFixture<QuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
