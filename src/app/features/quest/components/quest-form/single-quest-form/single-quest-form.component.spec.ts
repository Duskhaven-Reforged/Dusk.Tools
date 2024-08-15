import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuestFormComponent } from './single-quest-form.component';

describe('SingleQuestFormComponent', () => {
  let component: SingleQuestFormComponent;
  let fixture: ComponentFixture<SingleQuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleQuestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleQuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
