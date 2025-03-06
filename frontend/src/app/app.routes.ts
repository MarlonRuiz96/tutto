import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { UserComponent } from './components/user/user.component'; 
import {UserDetailComponent} from './components/user-detail/user-detail.component'; 
import { StatusComponent } from './components/status/status.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, //ruta para Dashboard
  { path: 'task/:id', component: TaskDetailComponent}, //ruta para TaskDetail
  { path: 'task/new', component: TaskDetailComponent }, //para CREAR una tarea
  { path: 'user/new', component: UserDetailComponent }, //para CREAR un usuario
  { path: 'user/:id', component: UserDetailComponent}, //Nueva ruta para UserDetails
  { path: 'users', component: UserComponent }, // ✅ Ruta para EDITAR una tarea
  { path: 'status', component: StatusComponent }, // ✅ Ruta para Status'}
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', redirectTo: '/register' },
];
