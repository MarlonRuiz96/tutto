import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statuses: any[] = [];
  newStatus = { name: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.apiService.getStatuses().subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error al obtener estados:', error);
      }
    );
  }

  createStatus() {
    if (!this.newStatus.name.trim()) {
      alert('El nombre del estado es obligatorio.');
      return;
    }
  
    this.apiService.createStatus(this.newStatus).subscribe(
      (response) => {
        alert('Estado creado correctamente ✅');
        // Vuelves a cargar todos los estados para ver la lista actualizada
        this.getStatuses();
        // Limpias el campo de texto
        this.newStatus.name = '';
      },
      // Si hay un error, lo muestras por consola
      (error) => {
        console.error('Error al crear estado:', error);
      }
    );
  }
  

  deleteStatus(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este estado?')) {
      this.apiService.deleteStatus(id).subscribe(
        () => {
          alert('Estado eliminado correctamente');
          this.statuses = this.statuses.filter((status) => status.id !== id);
        },
        (error) => {
          console.error('Error al eliminar estado:', error);
        }
      );
    }
  }
}
