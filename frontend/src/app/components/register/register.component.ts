import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { user: '', password: '', confirmPassword: '' };
  mensaje = '';

  constructor(private apiService: ApiService, private router: Router) {}

  // Función para validar en vivo las contraseñas
  validatePassword() {
    if (this.user.confirmPassword && this.user.password !== this.user.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
    } else {
      this.mensaje = '';
    }
  }
  registerUser() {
    // Validación final al enviar el formulario
    if (this.user.password !== this.user.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }
    this.apiService.login(this.user).subscribe(
      (response) => {
        this.mensaje = 'Login exitoso';
        console.log('Usuario logueado:', response.user);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Mensaje actualizado cuando el login falla
        this.mensaje = 'Error en el login: Por favor, verifica tu contraseña';
        console.error('Error en login:', error);
      }
    );
  }
  
}
