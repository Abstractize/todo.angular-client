import { Component } from '@angular/core';
import { RecommendationsRepository, TaskListRepository } from '@client/repositories';
import { TaskList, TaskSuggestion } from '@client/models';
import { ModalService, ToastService } from '@shared/services/';
import { ConfirmModalComponent } from '@shared/components';
import { TaskListModalComponent } from '@client/components';
import { Router } from '@angular/router';

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
    private readonly router: Router,
    private readonly toast: ToastService
  ) {
    this.loadTaskList();
    this.loadRecommendations();
  }

  private loadRecommendations(): void {
    this.recommendationsRepository.get().subscribe({
      next: (suggestions: TaskSuggestion[]) => {
        this.recommendations = suggestions.sort((a, b) => a.priority - b.priority).map(s => ({
          id: s.id,
          title: s.title,
          description: s.description
        }));
      }
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
          this.recommendationsRepository.patch(rec.id!, true).subscribe({
            next: () => {
              this.loadTaskList();
              this.loadRecommendations();
            },
            error: (error) => this.toast.error(error, 'Failed to mark recommendation as used.')
          });
        },
        error: (error) => this.toast.error(error, 'Failed to add new task list.')
      });
    }
  }

  removeRecommendation(rec: TaskList): void {
    this.recommendationsRepository.patch(rec.id!, false).subscribe({
      next: () => {
        this.loadRecommendations();
      },
      error: (error) => this.toast.error(error, 'Failed to remove recommendation.')
    });
  }
}
