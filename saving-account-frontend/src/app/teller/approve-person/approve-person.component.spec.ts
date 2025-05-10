import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePersonComponent } from './approve-person.component';

describe('ApprovePersonComponent', () => {
  let component: ApprovePersonComponent;
  let fixture: ComponentFixture<ApprovePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovePersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
