import { Component } from '@angular/core';
import { TaskListRepository } from '@client/repositories';
import { TaskList } from '@client/models';
import { ModalService } from '@shared/services/';
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

  constructor(
    private readonly modalService: ModalService,
    private readonly itemListRepository: TaskListRepository,
    private readonly router: Router
  ) {
    this.loadTaskList();
  }

  private loadTaskList(): void {
    this.itemListRepository.get().subscribe({
      next: (itemLists: TaskList[]) => {
        this.taskList = itemLists;
      },
      error: (error) => {
        console.error('Error loading task list:', error);
      }
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
        error: (error) => {
          console.error('Error adding task list:', error);
        }
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
          error: (error) => {
            console.error('Error deleting task list:', error);
          }
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
        error: (error) => {
          console.error('Error updating task list:', error);
        }
      });
    }
  }

  goToList(taskList: TaskList, event: MouseEvent): void {
    if (event && (event.target as HTMLElement).closest('.dropdown')) {
      return;
    }

    this.router.navigate(['/task-list', taskList.id]);
  }
}
