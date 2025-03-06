import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any = { user: '', password: '', confirmPassword: '' };
  mensaje = '';
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId && userId !== 'new') {
      this.isEditing = true;
      this.getUserDetails(userId);
    }
  }

  getUserDetails(id: string) {
    this.apiService.getUserById(id).subscribe(
      (response) => {
        this.user = {
          ...response,
          password: '',
          confirmPassword: ''
        };
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  validatePassword() {
    if (this.user.password && this.user.confirmPassword && this.user.password !== this.user.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }
    // Ejemplo de validación: mínimo 8 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial
    // Uso de expresiones regulares
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (this.user.password && !regex.test(this.user.password)) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un carácter especial';
      return;
    }
    this.mensaje = '';
  }

  saveUser() {
    // Si no es modo edición, valida las contraseñas antes de enviar
    if (!this.isEditing) {
      this.validatePassword();
      if (this.mensaje) {
        return;
      }
    }

    if (this.isEditing) {
      this.apiService.updateUser(this.user.id, this.user).subscribe(
        () => {
          alert('Usuario actualizado correctamente ');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    } else {
      this.apiService.createUsers(this.user).subscribe(
        () => {
          alert('Usuario creado correctamente');
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
        }
      );
    }
  }
}
