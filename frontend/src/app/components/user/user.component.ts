import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  @Output() userDeleted = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Usuarios cargados:', this.users); 
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.apiService.deleteUser(id).subscribe(
        () => {
          alert('Usuario eliminado correctamente ✅');
          this.users = this.users.filter((user) => user.id !== id); 
          this.userDeleted.emit(id); // Disparar el evento para notificar que un usuario fue eliminado
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }
}

