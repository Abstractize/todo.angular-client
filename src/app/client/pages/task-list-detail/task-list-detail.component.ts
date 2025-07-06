import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskItem, TaskList } from '@client/models';
import { TaskItemRepository, TaskListRepository } from '@client/repositories';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@shared/services/';
import { ConfirmModalComponent } from '@shared/components';
import { EditTaskModalComponent, TaskListSettingsModalComponent } from '@client/components';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list-detail.component.html',
})
export class TaskListDetailComponent implements OnInit {
  form!: FormGroup;

  tasks: TaskItem[] = [];
  taskList?: TaskList;

  isLoading = true;
  taskListId!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskListRepository: TaskListRepository,
    private readonly taskItemRepository: TaskItemRepository,
    private readonly modalService: ModalService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskListId = params.get('id')!;
      this.loadTasks();

      this.taskListRepository.find(this.taskListId).subscribe({
        next: (taskList: TaskList) => {
          this.taskList = taskList;
        },
        error: (err) => {
          console.error(err);
        }
      });
    });

    this.form = this.fb.group({
      title: ['', Validators.required]
    });
  }

  loadTasks(): void {
    this.taskItemRepository.getByTaskListId(this.taskListId).subscribe({
      next: (tasks: TaskItem[]) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  addTask(): void {
    const newTask: TaskItem = {
      id: null,
      title: this.form.value.title,
      isCompleted: false,
      taskListId: this.taskListId
    };

    this.taskItemRepository.add(newTask).subscribe(() => {
      this.form.reset();
      this.loadTasks();
    });
  }

  toggleTask(task: TaskItem): void {
    task.isCompleted = !task.isCompleted;
    this.taskItemRepository.update(task).subscribe(
      () => this.loadTasks()
    );
  }

  async editTask(task: TaskItem): Promise<void> {
    const newTitle = await this.modalService.open(EditTaskModalComponent, {
      title: `Edit Task: ${task.title}`,
      data: {
        title: task.title
      }
    });

    if (newTitle?.trim()) {
      task.title = newTitle.trim();
      this.taskItemRepository.update(task).subscribe(() => this.loadTasks());
    }
  }

  async deleteTask(task: TaskItem): Promise<void> {
    const confirmed = await this.modalService.open(ConfirmModalComponent, {
      title: `Delete "${task.title}"`,
      data: {
        title: 'Are you sure?',
        message: `This action will permanently delete  "${task.title}" from your task list.`
      }
    });

    if (confirmed) {
      this.taskItemRepository.delete(task.id!).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      });
    }
  }

  async openSettings(): Promise<void> {
    await this.modalService.open(TaskListSettingsModalComponent, {
      title: `Settings for "${this.taskList?.title}"`,
      data: {
        taskList: this.taskList
      }
    });
  }
}