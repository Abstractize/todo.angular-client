import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskList } from '../../models';

@Component({
  selector: 'app-task-list-modal',
  standalone: false,
  templateUrl: './task-list-modal.component.html'
})
export class TaskListModalComponent implements OnInit {
  @Input() taskList: TaskList = { id: null, title: '', description: '' };

  form!: FormGroup;

  close: (result: TaskList | null) => void = () => { };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.taskList.title, [Validators.required, Validators.minLength(3)]],
      description: [this.taskList.description]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const result: TaskList = {
        ...this.taskList,
        ...this.form.value
      };
      this.close(result);
    }
  }

  onCancel() {
    this.close(null);
  }
}