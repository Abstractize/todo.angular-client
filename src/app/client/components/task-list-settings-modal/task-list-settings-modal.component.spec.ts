import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListSettingsModalComponent } from './task-list-settings-modal.component';

describe('TaskListSettingsModalComponent', () => {
  let component: TaskListSettingsModalComponent;
  let fixture: ComponentFixture<TaskListSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListSettingsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
