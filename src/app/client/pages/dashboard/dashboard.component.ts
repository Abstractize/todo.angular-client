import { Component } from '@angular/core';
import { RecommendationsRepository, TaskListRepository } from '@client/repositories';
import { TaskList, TaskSuggestion } from '@client/models';
import { ModalService, ToastService } from '@shared/services/';
import { ConfirmModalComponent } from '@shared/components';
import { TaskListModalComponent } from '@client/components';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  taskList: TaskList[] = [];

  recommendations: TaskList[] = [];

  constructor(
    private readonly modalService: ModalService,
    private readonly itemListRepository: TaskListRepository,
    private readonly recommendationsRepository: RecommendationsRepository,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {
    this.loadTaskList();

    this.authService.userId$.subscribe({
      next: (userId: string) => {
        if (userId) {
          this.recommendationsRepository.get(userId).subscribe({
            next: (suggestions: TaskSuggestion[]) => {
              this.recommendations = suggestions.sort((a, b) => a.priority - b.priority).map(s => ({
                id: null,
                title: s.title,
                description: s.description
              }));
            }
          });
        }
      },
      error: (error) => this.toast.error(error, 'Failed to load user recommendations.')
    });

  }

  private loadTaskList(): void {
    this.itemListRepository.get().subscribe({
      next: (itemLists: TaskList[]) => {
        this.taskList = itemLists;
      },
      error: (error) => this.toast.error(error, 'Failed to load task lists.')
    });
  }

  async addTaskList(): Promise<void> {
    const newTaskList: TaskList | null = await this.modalService.open(TaskListModalComponent, {
      title: 'Add New Task List',
      data: {
        taskList: { id: null, title: '', description: '' }
      }
    });

    if (newTaskList) {
      this.itemListRepository.add(newTaskList).subscribe({
        next: () => {
          this.loadTaskList();
        },
        error: (error) => this.toast.error(error, 'Failed to add new task list.')
      });
    }
  }

  async deleteTaskList(taskList: TaskList, event: MouseEvent): Promise<void> {
    event.stopPropagation();

    const confirmed = await this.modalService.open(ConfirmModalComponent, {
      title: `Delete "${taskList.title}"`,
      data: {
        title: 'Are you sure?',
        message: `This action will permanently delete  "${taskList.title}" from your task list.`
      }
    });

    if (confirmed) {
      if (taskList.id) {
        this.itemListRepository.delete(taskList.id).subscribe({
          next: () => {
            this.loadTaskList();
          },
          error: (error) => this.toast.error(error, 'Failed to delete task list.')
        });
      }
    }
  }

  async editTaskList(existing: TaskList, event: MouseEvent): Promise<void> {
    event.stopPropagation();

    const taskList: TaskList | null = await this.modalService.open(TaskListModalComponent, {
      title: 'Edit Task List',
      data: {
        title: 'Edit Task List',
        taskList: { ...existing }
      }
    });

    if (taskList) {
      this.itemListRepository.update(taskList).subscribe({
        next: () => {
          this.loadTaskList();
        },
        error: (error) => this.toast.error(error, 'Failed to update task list.')
      });
    }
  }

  goToList(taskList: TaskList, event: MouseEvent): void {
    if (event && (event.target as HTMLElement).closest('.dropdown')) {
      return;
    }

    this.router.navigate(['/task-list', taskList.id]);
  }

  addRecommendedList(rec: TaskList): void {
    const exists = this.taskList.some(t => t.title === rec.title);
    if (!exists) {
      this.itemListRepository.add(rec).subscribe({
        next: () => {
          this.loadTaskList();
        },
        error: (error) => this.toast.error(error, 'Failed to add new task list.')
      });
    }
  }
}
