import { Component } from '@angular/core';
import { TaskListRepository } from '../../repositories/task-list.repository';
import { TaskList } from '../../models/task-list';
import { ModalService } from '../../../shared/services/modal.service';
import { ConfirmModalComponent } from '../../../shared/components';

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
    private readonly itemListRepository: TaskListRepository
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

  addTaskList(): void {
    const newTaskList: TaskList = {
      id: null,
      title: 'New Task List',
      description: ''
    };

    this.itemListRepository.add(newTaskList).subscribe({
      next: () => {
        this.loadTaskList();
      },
      error: (error) => {
        console.error('Error adding task list:', error);
      }
    });
  }

  async deleteTaskList(taskList: TaskList): Promise<void> {
    const result = await this.modalService.open('¿Confirmar acción?', 'Esta acción no se puede deshacer.');

    const confirmed: boolean = false;

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

  editTaskList(taskList: TaskList): void {
    if (taskList.id) {
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
}
