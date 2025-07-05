import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task-modal',
  standalone: false,
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent {
  @Input() title: string = '';

  form: FormGroup;

  close: (result: string | null) => void = () => { };



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [this.title, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({ title: this.title });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.close(this.form.value.title);
    }
  }

  cancel(): void {
    this.close(null);
  }
}