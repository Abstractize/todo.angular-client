import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDetailComponent } from './task-list-detail.component';

describe('TaskListDetailComponent', () => {
  let component: TaskListDetailComponent;
  let fixture: ComponentFixture<TaskListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
