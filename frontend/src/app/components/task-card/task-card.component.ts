import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task: any;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskUpdated = new EventEmitter<void>(); 

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  //*Marca la tarea como completada y actualiza el estado en la UI sin recargar
   
  completeTask() {
    this.apiService.updateTask(this.task.id, { status_id: 3 }).subscribe(
      (updatedTask) => {
        alert('Tarea completada ');

        if (updatedTask.status) {
          this.task.status = updatedTask.status; 
        } else {
          this.task.status = { id: 3, name: 'Completed' }; 
        }
        this.taskUpdated.emit(); 
        this.cdr.detectChanges(); 
      },
      (error) => {
        console.error('Error al completar la tarea:', error);
      }
    );
  }

// función para eliminar una tarea
  deleteTask(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.apiService.deleteTask(id).subscribe(
        () => {
          alert('Tarea eliminada correctamente ');
          this.taskDeleted.emit(id); //para notifica que una tarea fue eliminada
        },
        (error) => {
          console.error('Error al eliminar la tarea:', error);
        }
      );
    }
  }
}
