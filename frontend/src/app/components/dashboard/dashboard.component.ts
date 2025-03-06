import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // ✅ Importar RouterModule

import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule en el Dashboard también

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, RouterModule], // ✅ Importamos TaskCardComponent y CommonModule
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  //Variables para el dashboard
  totalTasks: number = 0; 
  pendingTasks: number = 0; 
  completedTasks: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}
  //Esto es lo que se ejecuta al cargar el componente
  ngOnInit() {
    this.getTasks();
    this.getTotalTasks();
    this.getPendingTasks();
    this.getCompletedTasks();



  }

  getTasks() {
    this.apiService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  onTaskDeleted(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id); // filtro 
  
    // para llamar a la api
    this.getTotalTasks();
    this.getPendingTasks();
    this.getCompletedTasks();
  }
  


  getTotalTasks() {
    this.apiService.getTotalTasks().subscribe(
      (response) => {
        this.totalTasks = response.total_tasks;
      },
      (error) => {
        console.error('Error al obtener el total de tareas:', error);
      }
    );
  }

  getPendingTasks() {
    this.apiService.getPendingTasksCount().subscribe(
      (response) => {
        this.pendingTasks = response.pending_tasks;
      },
      (error) => {
        console.error('Error al obtener las tareas pendientes:', error);
      }
    );
  }
  
  getCompletedTasks() {
    this.apiService.getCompletedTasksCount().subscribe(
      (response) => {
        this.completedTasks = response.completed_tasks;
      },
      (error) => {
        console.error('Error al obtener las tareas completadas:', error);
      }
    );
  }

  updatePendingTasks() {
    this.getPendingTasks(); // llamar a la api para actualizar el contador de pendientes
    this.getCompletedTasks(); // llamar a la api para actualizar el contador de completadas

  }

}
