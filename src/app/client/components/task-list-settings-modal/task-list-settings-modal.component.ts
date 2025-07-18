import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskList } from '@client/models';
import { TaskListRepository } from '@client/repositories';
import { ModalService } from '@shared/services/';
import { ConfirmModalComponent } from '@shared/components';

@Component({
  selector: 'app-task-list-settings-modal',
  standalone: false,
  templateUrl: './task-list-settings-modal.component.html',
})
export class TaskListSettingsModalComponent {
  @Input() taskList!: TaskList;

  close: () => void = () => { };

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskListRepository: TaskListRepository,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      title: this.taskList.title,
      description: this.taskList.description
    });
  }

  save(): void {
    if (this.form.valid) {
      const updated: TaskList = {
        ...this.taskList,
        ...this.form.value
      };

      this.taskListRepository.update(updated).subscribe(() => {
        this.close();
      });
    }
  }

  async delete(): Promise<void> {
    const confirmed = await this.modalService.open(ConfirmModalComponent, {
      title: `Delete "${this.taskList.title}"`,
      data: {
        title: 'Are you sure?',
        message: `This action will permanently delete  "${this.taskList.title}" from your task list.`
      }
    });

    if (confirmed) {
      this.taskListRepository.delete(this.taskList.id!).subscribe(() => {
        this.router.navigate(['/analytics']);
        this.close();
      });
    }
  }

  cancel(): void {
    this.close();
  }
}