import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDialogComponent } from './models-dialog.component';

describe('ModelsDialogComponent', () => {
  let component: ModelsDialogComponent;
  let fixture: ComponentFixture<ModelsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
