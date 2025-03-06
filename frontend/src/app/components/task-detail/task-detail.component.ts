import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any = { title: '', description: '', status_id: null, user_id: null }; 
  isEditing: boolean = false;
  users: any[] = [];
  status: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
 // si el id es diferente de new, entonces se esta editando
    if (taskId && taskId !== 'new') {
      this.isEditing = true;
      this.getTaskDetails(taskId);
    }
 // esto me trae los usuarios y los estados
    this.getUsers(); 
    this.getstatus();
  }

  getTaskDetails(id: string) {
    this.apiService.getTaskById(id).subscribe(
      (response) => {
        this.task = response;
      },
      (error) => {
        console.error('Error al obtener la tarea:', error);
      }
    );
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  getstatus() {
    this.apiService.getstatus().subscribe(
      (response) => {
        this.status = response;
      },
      (error) => {
        console.error('Error al obtener los estados:', error);
      }
    );
  }

  saveTask() {
    if (this.isEditing) {
      this.apiService.updateTask(this.task.id, this.task).subscribe(
        () => {
          alert('Tarea actualizada correctamente');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    } else {
      this.apiService.createTask(this.task).subscribe(
        () => {
          alert('Tarea creada correctamente');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    }
  }
}
